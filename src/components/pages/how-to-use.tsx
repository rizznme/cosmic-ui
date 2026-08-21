import {
  Wrapper,
  Title,
  Subtitle,
  Menu,
  SectionTitle,
  SectionContent,
  InstallPackage,
  PreviewCode,
} from "@/components/docs";

function HowToUse() {
  return (
    <>
      <Wrapper>
        <div className="flex flex-col gap-5">
          <div>
            <Title>How to Use</Title>
            <Subtitle>
              Install and configure{" "}
              <a href="https://www.cosmic-ui.com" className="font-medium">
                Cosmic UI
              </a>{" "}
              for Vite.
            </Subtitle>
          </div>
          <div className="mt-5" id="create-project">
            <SectionTitle>Create project</SectionTitle>
            <SectionContent>
              Start by creating a new React project using vite. Select the React
              + TypeScript template:
            </SectionContent>
            <InstallPackage>create vite@latest</InstallPackage>
          </div>
          <div id="add-tailwindcss">
            <SectionTitle>Add Tailwind CSS</SectionTitle>
            <InstallPackage>add tailwindcss @tailwindcss/vite</InstallPackage>
            <SectionContent>
              Replace everything in{" "}
              <span className="bg-foreground/15 px-1.5 py-px rounded-md">
                src/index.css
              </span>{" "}
              with the following:
            </SectionContent>
            <PreviewCode title="src/index.css">
              {`
@import "tailwindcss";
              `}
            </PreviewCode>
          </div>
          <div id="edit-tsconfig">
            <SectionTitle>Edit tsconfig.json file</SectionTitle>
            <SectionContent>
              The current version of Vite splits TypeScript configuration into
              three files, two of which need to be edited. Add the{" "}
              <span className="bg-foreground/15 px-1.5 py-px rounded-md">
                baseUrl
              </span>{" "}
              and
              <span className="bg-foreground/15 px-1.5 py-px rounded-md">
                paths
              </span>{" "}
              properties to the{" "}
              <span className="bg-foreground/15 px-1.5 py-px rounded-md">
                compilerOptions
              </span>{" "}
              section of the{" "}
              <span className="bg-foreground/15 px-1.5 py-px rounded-md">
                tsconfig.json
              </span>{" "}
              and{" "}
              <span className="bg-foreground/15 px-1.5 py-px rounded-md">
                tsconfig.app.json
              </span>{" "}
              files:
            </SectionContent>
            <PreviewCode title="tsconfig.json">
              {`
{
  "files": [],
  "references": [
    {
      "path": "./tsconfig.app.json"
    },
    {
      "path": "./tsconfig.node.json"
    }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
              `}
            </PreviewCode>
          </div>
          <div id="edit-tsconfig-app">
            <SectionTitle>Edit tsconfig.app.json file</SectionTitle>
            <SectionContent>
              Add the following code to the{" "}
              <span className="bg-foreground/15 px-1.5 py-px rounded-md">
                tsconfig.app.json
              </span>{" "}
              file to resolve paths, for your IDE:
            </SectionContent>
            <PreviewCode title="tsconfig.app.json">
              {`
{
  "compilerOptions": {
    // ...
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    }
    // ...
  }
}
              `}
            </PreviewCode>
          </div>
          <div id="update-vite-config">
            <SectionTitle>Update vite.config.ts</SectionTitle>
            <SectionContent>
              Add the following code to the vite.config.ts so your app can
              resolve paths without error:
            </SectionContent>
            <InstallPackage>add -D @types/node</InstallPackage>
            <PreviewCode title="vite.config.ts">
              {`
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
              `}
            </PreviewCode>
          </div>
          <div id="add-components">
            <SectionTitle>Add Components</SectionTitle>
            <SectionContent>
              You can now start adding components to your project.
            </SectionContent>
            <PreviewCode title="src/App.tsx">
              {`
import { Button } from "@/components/ui/button";

function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Button variant="success">Button</Button>
    </div>
  )
}

export default App
              `}
            </PreviewCode>
          </div>
        </div>
      </Wrapper>
      <Menu>
        <a className="hover:text-foreground py-1" href="#create-project">
          Create project
        </a>
        <a className="hover:text-foreground py-1" href="#add-tailwindcss">
          Add Tailwind CSS
        </a>
        <a className="hover:text-foreground py-1" href="#edit-tsconfig">
          Edit tsconfig.json file
        </a>
        <a className="hover:text-foreground py-1" href="#edit-tsconfig-app">
          Edit tsconfig.app.json file
        </a>
        <a className="hover:text-foreground py-1" href="#update-vite-config">
          Update vite.config.ts
        </a>
        <a className="hover:text-foreground py-1" href="#add-components">
          Add Components
        </a>
      </Menu>
    </>
  );
}

export { HowToUse };
