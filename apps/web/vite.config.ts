import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

console.log(__dirname, path.resolve(__dirname, "./src/*"));
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@web": path.resolve(__dirname, "./src"),
      "@server": path.resolve(__dirname, "../server/src"),
    },
  },
});
