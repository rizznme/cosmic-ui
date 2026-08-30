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
    plugins: [
      tailwindcss(),
      // @vitejs/plugin-react switches on oxc's React Fast Refresh transform for
      // the whole dev server. Vue SFC script blocks reach oxc under ids ending
      // in `lang.ts`, so they get instrumented too, and any `use*` call in them
      // comes back wrapped in `$RefreshSig$` — a helper that only exists in
      // React modules. It is undefined during SSR, so every Vue component built
      // on @zag-js/vue's useMachine 500s the page it is on.
      //
      // The React plugin's own include/exclude does not gate this, and neither
      // does oxc.jsx.refresh (both leave the SSR transform untouched), so give
      // those modules the identity function that Fast Refresh itself falls back
      // to when a module defines no React components. Replacing the call in
      // place keeps line numbers intact, and production never gets here because
      // the transform only runs while serving.
      {
        name: "cosmic:neutralize-react-refresh-in-vue",
        apply: "serve",
        enforce: "post",
        transform(code, id) {
          if (!id.includes(".vue") || !code.includes("$RefreshSig$()")) return;
          return { code: code.replaceAll("$RefreshSig$()", "((type) => type)"), map: null };
        },
      },
    ],
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