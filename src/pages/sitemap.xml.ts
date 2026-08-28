import type { APIRoute } from "astro";

// Built from the page files themselves so a new component page shows up in the
// sitemap automatically. Redirect-only paths (the old /docs/<name> URLs in
// astro.config.mjs) are deliberately left out - they are not canonical.
const pages = import.meta.glob("./**/*.astro");

const SITE = "https://cosmic-ui.com";

// Trailing slash on purpose: that is what Astro's built pages resolve to, so
// the sitemap and the <link rel="canonical"> on each page agree exactly.
function toRoute(file: string) {
  const path = file
    .replace(/^\.\//, "/")
    .replace(/\.astro$/, "")
    .replace(/\/index$/, "");
  return path === "" ? "/" : `${path}/`;
}

export const GET: APIRoute = () => {
  const routes = Object.keys(pages)
    // A dynamic route's filename is a template, not a URL - emitting it
    // verbatim would publish a literal "/[...slug]/" to Google. Any such route
    // has to contribute its own concrete URLs instead.
    .filter((file) => !/[[\]]/.test(file))
    .map(toRoute)
    .sort((a, b) => a.localeCompare(b));

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) =>
      `  <url>\n    <loc>${SITE}${route}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${route === "/" ? "1.0" : "0.8"}</priority>\n  </url>`,
  )
  .join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
