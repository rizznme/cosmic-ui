// The component registry, built by reading the real component source at build
// time rather than by maintaining a second copy of it.
//
// The docs pages currently embed each component's source as a hand-typed
// template literal, which is why several of them had already drifted from the
// files the site actually runs. Anything generated here cannot drift: it is
// the same file the site imports.

export type RegistryFile = {
  /** Path relative to the user's components dir, e.g. "ui/dialog/context.ts". */
  path: string;
  content: string;
};

export type RegistryItem = {
  name: string;
  framework: "react" | "vue";
  description: string;
  files: RegistryFile[];
  /** npm packages to install. */
  dependencies: string[];
  /** Other registry items that must be installed first. */
  registryDependencies: string[];
};

type RawModules = Record<string, string>;

// eager + query:"?raw" gives the file text at build time, no runtime fs access,
// which keeps this working on a fully static build.
const reactFiles = import.meta.glob("../components/ui/**/*.{ts,tsx}", {
  eager: true,
  query: "?raw",
  import: "default",
}) as RawModules;

const vueFiles = import.meta.glob("../components/ui-vue/**/*.{ts,vue}", {
  eager: true,
  query: "?raw",
  import: "default",
}) as RawModules;

const DESCRIPTIONS: Record<string, string> = {
  accordion: "A vertically stacked set of interactive headings.",
  alert: "Displays a callout for user attention.",
  "alert-dialog":
    "A modal dialog that interrupts the user with important content and expects a response.",
  avatar: "An image element with a fallback for representing a user.",
  breadcrumb: "Displays the path to the current page.",
  button: "Displays a button or a component that looks like a button.",
  "button-group": "Groups a set of related buttons together with a shared border.",
  chart: "Renders a Chart.js chart themed to match Cosmic UI.",
  checkbox: "A control that toggles between checked and unchecked.",
  combobox: "An input with an autocomplete list of options.",
  "date-picker":
    "A day grid for picking a date, single or range, inline or in a popover - powers the Calendar, Datepicker, and Daterangepicker pages.",
  dialog: "A window overlaid on the page, rendering content beneath it inert.",
  frame: "The primitive every other component draws its sci-fi border with.",
  input: "A single-line text field.",
  menu: "A list of actions shown from a trigger.",
  "number-input": "A control for entering a number, with increment/decrement buttons.",
  pagination: "Splits a long list of data into pages.",
  portal: "Renders children into a different part of the DOM tree.",
  presence: "Keeps an element mounted while it animates out.",
  "radio-group": "A set of controls where only one may be selected.",
  select: "A control for picking one option from a list.",
  sheet: "A panel that slides in from an edge of the screen.",
  switch: "A control that toggles between on and off.",
  table: "A responsive table for displaying tabular data.",
  tabs: "Layered sections of content shown one at a time.",
  textarea: "A multi-line text field.",
  toast: "A brief, non-blocking notification.",
};

/**
 * Group flat file paths into components.
 *
 * A component is either a single file (`ui/button.tsx`) or a directory
 * (`ui-vue/dialog/*`), so the component name is the first path segment after
 * the ui root, minus any extension.
 */
function groupByComponent(modules: RawModules, root: string) {
  const groups = new Map<string, { file: string; content: string }[]>();

  for (const [absPath, content] of Object.entries(modules)) {
    const rel = absPath.slice(absPath.indexOf(root) + root.length + 1);
    const name = rel.split("/")[0].replace(/\.(tsx?|vue)$/, "");
    const list = groups.get(name) ?? [];
    list.push({ file: rel, content });
    groups.set(name, list);
  }

  return groups;
}

/**
 * Rewrite the source's own import aliases onto the path the consumer will use.
 *
 * Vue components live in `ui-vue/` here so React and Vue can coexist in one
 * site, but a consumer installs them as plain `ui/`. Without this rewrite every
 * Vue component would ship importing a directory the user does not have.
 */
function rewriteImports(content: string, alias: string) {
  return content
    .replaceAll("@/components/ui-vue/", `${alias}/ui/`)
    .replaceAll("@/components/ui/", `${alias}/ui/`);
}

function externalDeps(content: string) {
  const found = new Set<string>();
  for (const m of content.matchAll(/from\s+"([^"]+)"/g)) {
    const spec = m[1];
    if (spec.startsWith("@/") || spec.startsWith(".")) continue;
    // react/vue themselves are already in any project using this.
    if (spec === "react" || spec === "vue" || spec === "react-dom") continue;
    // Keep the package name, drop deep paths ("chart.js/auto" -> "chart.js").
    const parts = spec.split("/");
    found.add(spec.startsWith("@") ? parts.slice(0, 2).join("/") : parts[0]);
  }
  return [...found].sort();
}

function internalDeps(content: string, self: string) {
  const found = new Set<string>();
  for (const m of content.matchAll(
    /from\s+"@\/components\/ui(?:-vue)?\/([^"]+)"/g,
  )) {
    const dep = m[1].split("/")[0].replace(/\.(tsx?|vue)$/, "");
    if (dep !== self) found.add(dep);
  }
  return [...found].sort();
}

function build(
  modules: RawModules,
  root: string,
  framework: "react" | "vue",
  alias: string,
): RegistryItem[] {
  const groups = groupByComponent(modules, root);
  const items: RegistryItem[] = [];

  for (const [name, files] of groups) {
    const deps = new Set<string>();
    const regDeps = new Set<string>();

    const outFiles = files
      .map(({ file, content }) => {
        externalDeps(content).forEach((d) => deps.add(d));
        internalDeps(content, name).forEach((d) => regDeps.add(d));
        return { path: `ui/${file}`, content: rewriteImports(content, alias) };
      })
      .sort((a, b) => a.path.localeCompare(b.path));

    items.push({
      name,
      framework,
      description: DESCRIPTIONS[name] ?? `The ${name} component.`,
      files: outFiles,
      dependencies: [...deps].sort(),
      registryDependencies: [...regDeps].sort(),
    });
  }

  return items.sort((a, b) => a.name.localeCompare(b.name));
}

export function getRegistry(alias = "@/components"): RegistryItem[] {
  return [
    ...build(reactFiles, "components/ui", "react", alias),
    ...build(vueFiles, "components/ui-vue", "vue", alias),
  ];
}

export function getItem(framework: string, name: string, alias?: string) {
  return getRegistry(alias).find(
    (i) => i.framework === framework && i.name === name,
  );
}
