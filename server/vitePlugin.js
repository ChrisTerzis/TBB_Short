import { loadEnv } from "vite";
import { createCheckoutSession } from "./createCheckoutSession.js";

const CHECKOUT_PATH = "/api/create-checkout-session";

function applyEnv(mode, envDir) {
  const env = loadEnv(mode, envDir, "");
  for (const [key, value] of Object.entries(env)) {
    if (process.env[key] === undefined) process.env[key] = value;
  }
}

function checkoutMiddleware(req, res, next) {
  const path = req.url?.split("?")[0];
  if (path !== CHECKOUT_PATH) {
    next();
    return;
  }

  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Allow", "POST");
    res.end("Method not allowed");
    return;
  }

  createCheckoutSession(req, res).catch((error) => {
    console.error(error);
    if (!res.headersSent) {
      res.statusCode = 500;
      res.end("Unable to start checkout.");
    }
  });
}

export function stripeCheckoutPlugin() {
  return {
    name: "stripe-checkout",
    config(_, { mode }) {
      applyEnv(mode, process.cwd());
    },
    configureServer(server) {
      server.middlewares.use(checkoutMiddleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(checkoutMiddleware);
    },
  };
}
