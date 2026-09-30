import { createStripeCheckoutUrl } from "./stripeCheckout.js";

function originFromRequest(req) {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, "");

  const proto = req.headers["x-forwarded-proto"] || "http";
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  return `${proto}://${host}`;
}

function json(res, status, payload) {
  const body = JSON.stringify(payload);
  if (typeof res.status === "function") {
    res.status(status).type("json").send(body);
    return;
  }

  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(body);
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

export async function createCheckoutSession(req, res) {
  try {
    const form = await readForm(req);
    const url = await createStripeCheckoutUrl({
      env: process.env,
      plan: form.plan || "strength-monthly",
      origin: originFromRequest(req),
    });
    json(res, 200, { url });
  } catch (error) {
    json(res, error.status || 500, {
      error: error.message || "Unable to start checkout.",
    });
  }
}
