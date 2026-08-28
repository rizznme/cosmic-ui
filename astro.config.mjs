import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vue from "@astrojs/vue";
import tailwindcss from "@tailwindcss/vite";
import pagefind from "astro-pagefind";

export default defineConfig({
  site: "https://cosmic-ui.com",
  integrations: [react(), vue(), pagefind()],
  redirects: {
    "/docs/frame": "/docs/react/frame",
    "/docs/menu": "/docs/react/menu",
    "/docs/alert": "/docs/react/alert",
    "/docs/accordion": "/docs/react/accordion",
    "/docs/dialog": "/docs/react/dialog",
    "/docs/tabs": "/docs/react/tabs",
    "/docs/toast": "/docs/react/toast",
    "/docs/button": "/docs/react/button",
    "/docs/input": "/docs/react/input",
    "/docs/switch": "/docs/react/switch",
    "/docs/textarea": "/docs/react/textarea",
    "/docs/radio-group": "/docs/react/radio-group",
    "/docs/checkbox": "/docs/react/checkbox",
    "/docs/chart": "/docs/react/chart",
    "/docs/combobox": "/docs/react/combobox",
    "/docs/select": "/docs/react/select",
    "/docs/how-to-use": "/docs/react/how-to-use",
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    ssr: {
      noExternal: ["lucide-react", "class-variance-authority", "tailwind-merge"],
    },
  },
});