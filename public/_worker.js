const PLAN_PRICE_ENV = {
  "strength-monthly": "STRIPE_PRICE_STRENGTH_MONTHLY",
  "strength-annual": "STRIPE_PRICE_STRENGTH_ANNUAL",
  "performance-monthly": "STRIPE_PRICE_PERFORMANCE_MONTHLY",
  "performance-annual": "STRIPE_PRICE_PERFORMANCE_ANNUAL",
};

async function createCheckoutUrl(env, plan, origin) {
  const priceEnv = PLAN_PRICE_ENV[plan];
  if (!priceEnv) {
    return { status: 400, error: "Unknown checkout plan." };
  }

  const secretKey = env.STRIPE_SECRET_KEY;
  const priceId = env[priceEnv];

  if (!secretKey || !priceId) {
    return {
      status: 500,
      error: `Checkout is not configured. Set STRIPE_SECRET_KEY and ${priceEnv} in Cloudflare Pages environment variables.`,
    };
  }

  const site = (env.SITE_URL || origin || "").replace(/\/$/, "");
  const body = new URLSearchParams({
    mode: "subscription",
    ui_mode: "hosted_page",
    success_url: env.STRIPE_SUCCESS_URL || `${site}/?checkout=success`,
    cancel_url: env.STRIPE_CANCEL_URL || `${site}/#pricing`,
    "line_items[0][price]": priceId,
    "line_items[0][quantity]": "1",
    billing_address_collection: "auto",
    allow_promotion_codes: "false",
    origin_context: "web",
  });

  const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
      "Stripe-Version": "2026-03-25.dahlia",
    },
    body,
  });

  const session = await response.json();
  if (!response.ok || !session.url) {
    return {
      status: 500,
      error: session.error?.message || "Unable to start checkout.",
    };
  }

  return { status: 200, url: session.url };
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname !== "/api/create-checkout-session") {
      return env.ASSETS
        ? env.ASSETS.fetch(request)
        : new Response("Not found", { status: 404 });
    }

    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: {
          Allow: "POST",
          "Content-Type": "application/json",
        },
      });
    }

    const params = new URLSearchParams(await request.text());
    const result = await createCheckoutUrl(
      env,
      params.get("plan") || "strength-monthly",
      url.origin,
    );

    return new Response(JSON.stringify(result.url ? { url: result.url } : { error: result.error }), {
      status: result.status,
      headers: { "Content-Type": "application/json" },
    });
  },
};
