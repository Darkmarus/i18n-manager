import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), svelte()],
  build: {
    rollupOptions: {
      output: {
        dir: "../i18n-manager/media",
        entryFileNames: "[name].js", // Nombres de los archivos de entrada
        chunkFileNames: "[name].js", // Nombres de los chunks
        assetFileNames: "[name][extname]", // Nombres de los assets
      },
    },
  },
});
