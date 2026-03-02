import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  // Default production deploy is root domain. Override with VITE_BASE_PATH (e.g. /Roldan/).
  const rawBase = mode === "production" ? env.VITE_BASE_PATH || "/" : "/";
  const prefixedBase = rawBase.startsWith("/") ? rawBase : `/${rawBase}`;
  const base = prefixedBase.endsWith("/") ? prefixedBase : `${prefixedBase}/`;

  return {
    base,
    server: {
      host: true,
      port: 8080,
      allowedHosts: true,
      hmr: { overlay: false },
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
