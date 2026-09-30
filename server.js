import { existsSync, createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadEnv } from "vite";
import { createCheckoutSession } from "./server/createCheckoutSession.js";

const env = loadEnv(process.env.NODE_ENV || "production", process.cwd(), "");
for (const [key, value] of Object.entries(env)) {
  if (process.env[key] === undefined) process.env[key] = value;
}

const root = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(root, "dist");
const MIME = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
};

async function serveStatic(req, res) {
  if (!existsSync(dist)) {
    res.statusCode = 404;
    res.end("Build the site first with npm run build.");
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const requested = path.normalize(path.join(dist, url.pathname));
  if (!requested.startsWith(dist)) {
    res.statusCode = 403;
    res.end("Forbidden");
    return;
  }

  let file = requested;
  try {
    const info = await stat(file);
    if (info.isDirectory()) file = path.join(file, "index.html");
  } catch {
    file = path.join(dist, "index.html");
  }

  if (!existsSync(file)) {
    res.statusCode = 404;
    res.end("Not found");
    return;
  }

  res.setHeader("Content-Type", MIME[path.extname(file)] || "application/octet-stream");
  createReadStream(file).pipe(res);
}

const server = http.createServer(async (req, res) => {
  const pathname = req.url?.split("?")[0];

  if (pathname === "/api/create-checkout-session") {
    if (req.method !== "POST") {
      res.statusCode = 405;
      res.setHeader("Allow", "POST");
      res.end("Method not allowed");
      return;
    }

    try {
      await createCheckoutSession(req, res);
    } catch (error) {
      console.error(error);
      if (!res.headersSent) {
        res.statusCode = 500;
        res.end("Unable to start checkout.");
      }
    }
    return;
  }

  await serveStatic(req, res);
});

const port = Number(process.env.PORT) || 3000;
server.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
