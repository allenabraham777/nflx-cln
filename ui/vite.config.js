import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3001",
      },
    },
  },
  resolve: {
    alias: {
      config: path.resolve(__dirname, "./config"),
    },
  },
  plugins: [react()],
});
