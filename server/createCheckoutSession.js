function originFromRequest(req) {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, "");

  const proto = req.headers["x-forwarded-proto"] || "http";
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  return `${proto}://${host}`;
}

function redirect(res, url) {
  if (typeof res.redirect === "function") {
    res.redirect(303, url);
    return;
  }

  res.statusCode = 303;
  res.setHeader("Location", url);
  res.end();
}

function fail(res, status, message) {
  if (typeof res.status === "function") {
    res.status(status).send(message);
    return;
  }

  res.statusCode = status;
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.end(message);
}

function readForm(req) {
  if (req.body && typeof req.body === "object" && !Buffer.isBuffer(req.body)) {
    return Promise.resolve(req.body);
  }

  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => {
      const raw = Buffer.concat(chunks).toString("utf8");
      resolve(Object.fromEntries(new URLSearchParams(raw)));
    });
    req.on("error", reject);
  });
}

const PLAN_PRICE_ENV = {
  "strength-monthly": "STRIPE_PRICE_STRENGTH_MONTHLY",
  "strength-annual": "STRIPE_PRICE_STRENGTH_ANNUAL",
  "performance-monthly": "STRIPE_PRICE_PERFORMANCE_MONTHLY",
  "performance-annual": "STRIPE_PRICE_PERFORMANCE_ANNUAL",
};

export async function createCheckoutSession(req, res) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const form = await readForm(req);
  const plan = form.plan || "strength-monthly";
  const priceEnv = PLAN_PRICE_ENV[plan];

  if (!priceEnv) {
    fail(res, 400, "Unknown checkout plan.");
    return;
  }

  const priceId = process.env[priceEnv];

  if (!secretKey || !priceId) {
    fail(
      res,
      500,
      `Checkout is not configured. Set STRIPE_SECRET_KEY and ${priceEnv}.`,
    );
    return;
  }

  const origin = originFromRequest(req);
  const body = new URLSearchParams({
    mode: "subscription",
    ui_mode: "hosted_page",
    success_url: process.env.STRIPE_SUCCESS_URL || `${origin}/?checkout=success`,
    cancel_url: process.env.STRIPE_CANCEL_URL || `${origin}/#pricing`,
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
    console.error(session.error || session);
    fail(res, 500, session.error?.message || "Unable to start checkout.");
    return;
  }

  redirect(res, session.url);
}
