import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// O proxy evita erro de CORS ao chamar a API Java durante o desenvolvimento
const proxy = {
  "/api": {
    target: "https://challenge-java-sustent-game.onrender.com",
    changeOrigin: true,
    rewrite: (path: string) => path.replace(/^\/api/, ""),
  },
};

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { proxy },
  preview: { proxy },
});
