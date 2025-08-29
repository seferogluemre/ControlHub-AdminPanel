import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: {
    exclude: ["@onlyjs/api", "#prisma/client", "@prisma/client"],
  },
  worker: {
    format: "es",
  },
  root: __dirname,
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "#*": path.resolve(__dirname, "./src"),

      // fix loading all icon chunks in dev mode
      // https://github.com/tabler/tabler-icons/issues/1233
      "@tabler/icons-react": "@tabler/icons-react/dist/esm/icons/index.mjs",
      "@onlyjs/api": path.resolve(__dirname, "../api/src/"),
    },
  },
  build: {
    outDir: "../../dist/apps/web",
    emptyOutDir: true,
  },
});
