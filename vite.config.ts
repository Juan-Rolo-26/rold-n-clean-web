import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => {
  // DonWeb/Ferozo serves this build from /public_html/Roldan.
  const base = mode === "production" ? "/Roldan/" : "/";

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
