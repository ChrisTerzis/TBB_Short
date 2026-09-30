import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { stripeCheckoutPlugin } from "./server/vitePlugin.js";

export default defineConfig({
  plugins: [react(), tailwindcss(), stripeCheckoutPlugin()],
  server: {
    port: 5173,
    host: true,
  },
});
