import type { APIRoute } from "astro";
import { getRegistry } from "@/lib/registry";

// The index an agent or the CLI reads first: what exists, and where to fetch
// each one. Deliberately without file contents so it stays small enough to
// hand to a model in full.
export const GET: APIRoute = () => {
  const items = getRegistry().map((item) => ({
    name: item.name,
    framework: item.framework,
    description: item.description,
    dependencies: item.dependencies,
    registryDependencies: item.registryDependencies,
    url: `https://cosmic-ui.com/r/${item.framework}/${item.name}.json`,
  }));

  return new Response(
    JSON.stringify(
      {
        name: "cosmic-ui",
        homepage: "https://cosmic-ui.com",
        frameworks: ["react", "vue"],
        items,
      },
      null,
      2,
    ),
    {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      },
    },
  );
};
