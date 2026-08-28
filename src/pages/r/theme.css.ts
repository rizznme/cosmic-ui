import type { APIRoute } from "astro";
import globalCss from "@/styles/global.css?raw";

// The design tokens every component reads (--color-primary, the frame stroke
// colours, the type scale). Without these a copied component renders, but with
// none of its colours - so `init` installs this before anything else.
//
// Sliced out of the site's own global.css rather than kept as a second copy,
// for the same reason the component registry reads real source files.
function extractTheme(css: string) {
  const start = css.indexOf("@theme {");
  if (start === -1) return null;

  // Walk braces rather than regex: the block contains nested parens and
  // functions, and a lazy match would stop at the first "}" inside color-mix.
  let depth = 0;
  for (let i = start; i < css.length; i++) {
    if (css[i] === "{") depth++;
    else if (css[i] === "}") {
      depth--;
      if (depth === 0) return css.slice(start, i + 1);
    }
  }
  return null;
}

export const GET: APIRoute = () => {
  const block = extractTheme(globalCss);

  if (!block) {
    return new Response("/* theme block not found */", {
      status: 500,
      headers: { "Content-Type": "text/css; charset=utf-8" },
    });
  }

  // The two background-image tokens point at image assets that only exist in
  // this site's repo, so they would 404 in a consumer's project.
  const cleaned = block
    .split("\n")
    .filter((line) => !line.includes("--background-image-"))
    .join("\n");

  const body = `/* Cosmic UI design tokens - https://cosmic-ui.com
   Paste into the same CSS file that has @import "tailwindcss". */

${cleaned}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/css; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
};
