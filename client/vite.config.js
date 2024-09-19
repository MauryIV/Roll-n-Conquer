import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
require('dotenv').config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    strictPort: true,
    port: 3000,
    proxy: {
      "/graphql": {
        target: process.env.GRAPHQL_URI || "http://localhost:3001",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
