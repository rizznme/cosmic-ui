# @cosmic-ui/cli

Add [Cosmic UI](https://cosmic-ui.com) sci-fi components to a React or Vue
project. Zero dependencies.

```bash
npx @cosmic-ui/cli@latest init
npx @cosmic-ui/cli@latest add dialog
```

`add dialog` writes `dialog` **and** the components it imports (`button`,
`frame`, `portal`, `presence`), then installs the npm packages they need.
Resolving that by hand is the main thing people get wrong when copying
components out of the docs.

## Commands

| | |
|---|---|
| `init` | Create `cosmic.json` and write the design tokens to `cosmic-ui.css` |
| `add <component...>` | Add components plus their dependencies |
| `add --all` | Add every component for the configured framework |
| `list` | Show every available component |

## Options

| | |
|---|---|
| `--framework <react\|vue>` | Override the framework (`init` detects it from your `package.json`) |
| `--dir <path>` | Components directory. Default `src/components` |
| `--alias <path>` | Import alias written into the files. Default `@/components` |
| `--overwrite` | Replace files that already exist. Without it they are skipped |
| `--no-install` | Print the install command instead of running it |
| `-y, --yes` | Never prompt |
| `--json` | `list` only: machine-readable output |
| `--force` | `init` only: overwrite an existing `cosmic.json` |

## cosmic.json

```json
{
  "framework": "react",
  "componentsDir": "src/components",
  "alias": "@/components"
}
```

## For AI agents

Non-interactive by default: when stdin is not a TTY, prompts resolve to "no"
rather than hanging, so use `--yes` to install dependencies unattended.

The registry can also be read directly, without the CLI:

- `https://cosmic-ui.com/r/index.json` - all components with their dependencies
- `https://cosmic-ui.com/r/{framework}/{name}.json` - one component, all file contents
- `https://cosmic-ui.com/r/theme.css` - the design tokens
- `https://cosmic-ui.com/llms.txt` - the short version of all of this

## Notes

Components need Tailwind CSS v4 and the design tokens in the same CSS file as
`@import "tailwindcss"`. `init` writes `cosmic-ui.css` next to your components
directory; import it yourself:

```css
@import "tailwindcss";
@import "./cosmic-ui.css";
```

Point `COSMIC_UI_REGISTRY` at another origin to test against a local build of
the docs site.
