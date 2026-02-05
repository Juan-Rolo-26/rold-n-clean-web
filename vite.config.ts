import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => {
  const repoName = "rold-n-clean-web";
  return {
    base: mode === "production" ? `/${repoName}/` : "/",
    server: {
      host: true,
      port: 8080,
      // 👇 workaround TS-friendly para túneles
      allowedHosts: true,
      hmr: {
        overlay: false,
      },
    },
    plugins: [
      react(),
      mode === "development" && componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
