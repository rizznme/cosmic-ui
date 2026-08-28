import type { APIRoute, GetStaticPaths } from "astro";
import { getRegistry, getItem } from "@/lib/registry";

export const getStaticPaths: GetStaticPaths = () =>
  getRegistry().map((item) => ({
    params: { framework: item.framework, name: item.name },
  }));

// Everything needed to install one component: every file with its contents,
// the npm packages to add, and the other registry items to pull in first.
// CORS is open because this is public source that anything should be able to
// fetch - a browser-based agent or playground included.
export const GET: APIRoute = ({ params }) => {
  const item = getItem(params.framework!, params.name!);

  if (!item) {
    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });
  }

  return new Response(JSON.stringify(item, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
};
