#!/usr/bin/env node
/**
 * Cosmic UI CLI.
 *
 * Zero dependencies on purpose: this runs through `npx` in someone else's
 * project, often driven by an AI agent, so install time and supply-chain
 * surface both matter more than the convenience of an argument parser.
 */
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { spawn } from "node:child_process";
import { createInterface } from "node:readline/promises";

const REGISTRY = process.env.COSMIC_UI_REGISTRY ?? "https://cosmic-ui.com/r";
const CONFIG_FILE = "cosmic.json";

const c = {
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
};

function fail(message, hint) {
  console.error(`${c.red("error")} ${message}`);
  if (hint) console.error(c.dim(hint));
  process.exit(1);
}

async function getJson(url) {
  let res;
  try {
    res = await fetch(url);
  } catch (cause) {
    fail(`could not reach ${url}`, cause?.message);
  }
  if (res.status === 404) return null;
  if (!res.ok) fail(`${url} responded ${res.status}`);
  return res.json();
}

// ---------------------------------------------------------------- config

async function readConfig(cwd) {
  const path = join(cwd, CONFIG_FILE);
  if (!existsSync(path)) return null;
  try {
    return JSON.parse(await readFile(path, "utf8"));
  } catch (cause) {
    fail(`${CONFIG_FILE} is not valid JSON`, cause?.message);
  }
}

async function requireConfig(cwd) {
  const config = await readConfig(cwd);
  if (!config) {
    fail(
      `no ${CONFIG_FILE} found in ${cwd}`,
      "Run `npx @cosmic-ui/cli init` first.",
    );
  }
  return config;
}

/** Guess the framework from what the project already depends on. */
async function detectFramework(cwd) {
  const pkgPath = join(cwd, "package.json");
  if (!existsSync(pkgPath)) return null;
  try {
    const pkg = JSON.parse(await readFile(pkgPath, "utf8"));
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };
    if (deps.vue) return "vue";
    if (deps.react) return "react";
  } catch {
    // A malformed package.json is the user's problem, not a reason to crash.
  }
  return null;
}

function detectPackageManager(cwd) {
  if (existsSync(join(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (existsSync(join(cwd, "yarn.lock"))) return "yarn";
  if (existsSync(join(cwd, "bun.lockb"))) return "bun";
  return "npm";
}

function installArgs(pm, packages) {
  if (pm === "yarn") return ["add", ...packages];
  if (pm === "bun") return ["add", ...packages];
  return ["install", ...packages];
}

function run(cmd, args, cwd) {
  return new Promise((done) => {
    const child = spawn(cmd, args, { cwd, stdio: "inherit", shell: false });
    child.on("close", (code) => done(code === 0));
    child.on("error", () => done(false));
  });
}

// ---------------------------------------------------------------- resolve

/**
 * Walk registryDependencies so asking for one component brings everything it
 * imports. Without this, `add dialog` writes a file that imports four modules
 * the project does not have, and the build breaks with no clue why.
 */
async function resolve_(framework, names, seen = new Map()) {
  for (const name of names) {
    if (seen.has(name)) continue;
    const item = await getJson(`${REGISTRY}/${framework}/${name}.json`);
    if (!item) {
      fail(
        `unknown component "${name}" for ${framework}`,
        "Run `npx @cosmic-ui/cli list` to see what exists.",
      );
    }
    seen.set(name, item);
    await resolve_(framework, item.registryDependencies ?? [], seen);
  }
  return seen;
}

// ---------------------------------------------------------------- commands

async function cmdInit(cwd, flags) {
  const existing = await readConfig(cwd);
  if (existing && !flags.force) {
    fail(
      `${CONFIG_FILE} already exists`,
      "Pass --force to overwrite it.",
    );
  }

  const framework =
    flags.framework ?? (await detectFramework(cwd)) ?? "react";
  if (!["react", "vue"].includes(framework)) {
    fail(`unsupported framework "${framework}"`, "Use react or vue.");
  }

  const config = {
    framework,
    componentsDir: flags.dir ?? "src/components",
    alias: flags.alias ?? "@/components",
  };

  await writeFile(
    join(cwd, CONFIG_FILE),
    JSON.stringify(config, null, 2) + "\n",
  );
  console.log(`${c.green("created")} ${CONFIG_FILE} ${c.dim(`(${framework})`)}`);

  // The tokens are what make components look like Cosmic UI rather than
  // unstyled boxes, so write them out as part of init instead of leaving it
  // to a docs step people skip.
  const themeRes = await fetch(`${REGISTRY}/theme.css`);
  if (themeRes.ok) {
    const themePath = join(cwd, config.componentsDir, "..", "cosmic-ui.css");
    await mkdir(dirname(themePath), { recursive: true });
    await writeFile(themePath, await themeRes.text());
    console.log(
      `${c.green("created")} ${relative(cwd, themePath)} ${c.dim("(design tokens)")}`,
    );
    console.log(
      c.dim(
        `\nImport it from the CSS file that has @import "tailwindcss":\n  @import "./cosmic-ui.css";`,
      ),
    );
  }

  console.log(
    c.dim(`\nNext: npx @cosmic-ui/cli add button`),
  );
}

function relative(cwd, path) {
  return path.startsWith(cwd) ? path.slice(cwd.length + 1) : path;
}

async function cmdAdd(cwd, names, flags) {
  const config = await requireConfig(cwd);
  const framework = flags.framework ?? config.framework ?? "react";

  if (names.length === 0 && !flags.all) {
    fail("nothing to add", "Usage: cosmic-ui add <component...>  (or --all)");
  }

  if (flags.all) {
    const index = await getJson(`${REGISTRY}/index.json`);
    names = index.items
      .filter((i) => i.framework === framework)
      .map((i) => i.name);
  }

  const items = await resolve_(framework, names);
  const requested = new Set(names);
  const componentsDir = resolve(cwd, config.componentsDir);
  const alias = config.alias ?? "@/components";

  const npmDeps = new Set();
  let written = 0;
  let skipped = 0;

  for (const item of items.values()) {
    for (const file of item.files) {
      const target = join(componentsDir, file.path);

      if (existsSync(target) && !flags.overwrite) {
        console.log(`${c.dim("skip   ")} ${relative(cwd, target)} ${c.dim("(exists)")}`);
        skipped++;
        continue;
      }

      // The registry serves the default alias; rewrite if this project uses
      // another one.
      const content =
        alias === "@/components"
          ? file.content
          : file.content.replaceAll("@/components/", `${alias}/`);

      await mkdir(dirname(target), { recursive: true });
      await writeFile(target, content);
      console.log(
        `${c.green("write  ")} ${relative(cwd, target)}` +
          (requested.has(item.name) ? "" : c.dim(`  (needed by another component)`)),
      );
      written++;
    }
    for (const dep of item.dependencies ?? []) npmDeps.add(dep);
  }

  console.log(
    `\n${written} file(s) written` + (skipped ? `, ${skipped} skipped` : ""),
  );
  if (skipped && !flags.overwrite) {
    console.log(c.dim("Pass --overwrite to replace existing files."));
  }

  if (npmDeps.size === 0) return;

  const packages = [...npmDeps].sort();
  const pm = detectPackageManager(cwd);

  if (flags.noInstall) {
    console.log(`\nInstall these yourself:\n  ${pm} ${installArgs(pm, packages).join(" ")}`);
    return;
  }

  const proceed =
    flags.yes || (await confirm(`\nInstall ${packages.length} package(s) with ${pm}?`));

  if (!proceed) {
    console.log(`\nSkipped. Run it later:\n  ${pm} ${installArgs(pm, packages).join(" ")}`);
    return;
  }

  console.log(c.dim(`\n${pm} ${installArgs(pm, packages).join(" ")}\n`));
  const ok = await run(pm, installArgs(pm, packages), cwd);
  if (!ok) {
    fail(
      "dependency install failed",
      `Run it yourself: ${pm} ${installArgs(pm, packages).join(" ")}`,
    );
  }
}

async function confirm(question) {
  // Non-interactive callers (CI, an agent) get the safe answer rather than a
  // process that hangs forever waiting on stdin.
  if (!process.stdin.isTTY) return false;
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const answer = await rl.question(`${question} ${c.dim("[Y/n]")} `);
  rl.close();
  return answer.trim() === "" || /^y(es)?$/i.test(answer.trim());
}

async function cmdList(cwd, flags) {
  const config = await readConfig(cwd);
  const index = await getJson(`${REGISTRY}/index.json`);
  const framework =
    flags.framework ?? config?.framework ?? (await detectFramework(cwd)) ?? "react";

  const items = index.items.filter((i) => i.framework === framework);

  if (flags.json) {
    console.log(JSON.stringify(items, null, 2));
    return;
  }

  console.log(c.bold(`\nCosmic UI components (${framework})\n`));
  const width = Math.max(...items.map((i) => i.name.length));
  for (const item of items) {
    console.log(`  ${item.name.padEnd(width)}  ${c.dim(item.description)}`);
  }
  console.log(c.dim(`\n${items.length} components. Add one: cosmic-ui add <name>`));
}

// ---------------------------------------------------------------- entry

function parseArgs(argv) {
  const flags = {};
  const positional = [];

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (!arg.startsWith("-")) {
      positional.push(arg);
      continue;
    }
    switch (arg) {
      case "-y":
      case "--yes":
        flags.yes = true;
        break;
      case "--all":
        flags.all = true;
        break;
      case "--overwrite":
        flags.overwrite = true;
        break;
      case "--force":
        flags.force = true;
        break;
      case "--no-install":
        flags.noInstall = true;
        break;
      case "--json":
        flags.json = true;
        break;
      case "--framework":
        flags.framework = argv[++i];
        break;
      case "--dir":
        flags.dir = argv[++i];
        break;
      case "--alias":
        flags.alias = argv[++i];
        break;
      case "-h":
      case "--help":
        flags.help = true;
        break;
      case "-v":
      case "--version":
        flags.version = true;
        break;
      default:
        fail(`unknown option ${arg}`, "Run `cosmic-ui --help`.");
    }
  }

  return { command: positional[0], names: positional.slice(1), flags };
}

const HELP = `
${c.bold("cosmic-ui")} - sci-fi components for React and Vue

  ${c.bold("init")}                 Create cosmic.json and write the design tokens
  ${c.bold("add")} <component...>   Add components, with their dependencies
  ${c.bold("list")}                 Show every available component

Options
  --framework <react|vue>   Override the framework
  --dir <path>              Components directory      (default src/components)
  --alias <path>            Import alias              (default @/components)
  --all                     With add: every component
  --overwrite               Replace files that exist
  --no-install              Print the install command instead of running it
  -y, --yes                 Assume yes, never prompt
  --json                    With list: machine-readable output
  --force                   With init: overwrite cosmic.json

Examples
  npx @cosmic-ui/cli init
  npx @cosmic-ui/cli add button dialog
  npx @cosmic-ui/cli add --all --yes
  npx @cosmic-ui/cli list --json
`;

async function main() {
  const { command, names, flags } = parseArgs(process.argv.slice(2));
  const cwd = process.cwd();

  if (flags.version) {
    const pkg = JSON.parse(
      await readFile(new URL("../package.json", import.meta.url), "utf8"),
    );
    console.log(pkg.version);
    return;
  }

  if (flags.help || !command) {
    console.log(HELP);
    return;
  }

  switch (command) {
    case "init":
      return cmdInit(cwd, flags);
    case "add":
      return cmdAdd(cwd, names, flags);
    case "list":
      return cmdList(cwd, flags);
    default:
      fail(`unknown command "${command}"`, "Run `cosmic-ui --help`.");
  }
}

main().catch((error) => {
  fail(error?.message ?? String(error));
});
