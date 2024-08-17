import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      // Pass compilerOptions here only if necessary
      // Example: setting custom elements handling
      compilerOptions: {
        // Example compiler option
        isCustomElement: (tag) => tag.startsWith('custom-'),
      },
    })
  ],
  build: {
    viteVuePluginOptions: {
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('my-')
        }
      }
    }
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});