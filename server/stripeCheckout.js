export const PLAN_PRICE_ENV = {
  "strength-monthly": "STRIPE_PRICE_STRENGTH_MONTHLY",
  "strength-annual": "STRIPE_PRICE_STRENGTH_ANNUAL",
  "performance-monthly": "STRIPE_PRICE_PERFORMANCE_MONTHLY",
  "performance-annual": "STRIPE_PRICE_PERFORMANCE_ANNUAL",
};

export async function createStripeCheckoutUrl({ env, plan, origin }) {
  const priceEnv = PLAN_PRICE_ENV[plan];
  if (!priceEnv) {
    const error = new Error("Unknown checkout plan.");
    error.status = 400;
    throw error;
  }

  const secretKey = env.STRIPE_SECRET_KEY;
  const priceId = env[priceEnv];

  if (!secretKey || !priceId) {
    const error = new Error(
      `Checkout is not configured. Set STRIPE_SECRET_KEY and ${priceEnv}.`,
    );
    error.status = 500;
    throw error;
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
    const error = new Error(
      session.error?.message || "Unable to start checkout.",
    );
    error.status = 500;
    throw error;
  }

  return session.url;
}
