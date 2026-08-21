import { Button } from "@/components/ui/button";
import {
  Wrapper,
  Title,
  Subtitle,
  Menu,
  Preview,
  SectionTitle,
  SectionContent,
  PreviewCode,
} from "@/components/docs";
import { CheckCircle, LoaderCircle, Trash } from "lucide-react";

function ButtonPage() {
  return (
    <>
      <Wrapper>
        <div className="flex flex-col gap-20">
          <div>
            <Title>Button</Title>
            <Subtitle>
              Displays a button or a component that looks like a button.
            </Subtitle>
            <Preview>
              {() => ({
                preview: (
                  <>
                    <div className="flex flex-col md:flex-row gap-3">
                      <Button variant="destructive" shape="flat">
                        <Trash className="size-4 me-2.5" /> Remove
                      </Button>
                      <Button variant="success">
                        <CheckCircle className="size-4 me-2.5" /> Accept
                      </Button>
                      <Button shape="simple">
                        <LoaderCircle className="animate-spin size-4 me-2.5" />{" "}
                        Logging in...
                      </Button>
                    </div>
                  </>
                ),
                code: (
                  <PreviewCode>
                    {`
<Button variant="destructive" shape="flat">
  <Trash className="size-4 me-2.5" /> Remove
</Button>
<Button variant="success">
  <CheckCircle className="size-4 me-2.5" /> Accept
</Button>
<Button shape="simple">
  <LoaderCircle className="animate-spin size-4 me-2.5" />{" "}
  Logging in...
</Button>
                `}
                  </PreviewCode>
                ),
              })}
            </Preview>
          </div>
          <div id="installation">
            <SectionTitle>Installation</SectionTitle>
            <SectionContent>
              Copy and paste the following code into your project.
            </SectionContent>
            <PreviewCode title="components/ui/button.tsx">
              {`
import { Frame } from "@/components/ui/frame";
import { twMerge } from "tailwind-merge";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  [
    "group font-bold mb-2 relative px-8 py-2 cursor-pointer transition-all [&:hover_svg]:drop-shadow-xl outline-none",
    "[&>span]:relative [&>span]:flex [&>span]:items-center [&>span]:justify-center [&>span]:group-hover:text-shadow-lg",
  ],
  {
    variants: {
      variant: {
        default:
          "[--color-frame-1-stroke:var(--color-primary)] [--color-frame-1-fill:var(--color-primary)]/22 [--color-frame-2-stroke:var(--color-primary)] [--color-frame-2-fill:var(--color-primary)]/10 text-primary-foreground [&:hover_svg]:drop-shadow-primary/50 [&>span]:group-hover:text-shadow-primary/50",
        accent:
          "[--color-frame-1-stroke:var(--color-accent)] [--color-frame-1-fill:var(--color-accent)]/40 [--color-frame-2-stroke:var(--color-accent)] [--color-frame-2-fill:var(--color-accent)]/20 text-accent-foreground [&:hover_svg]:drop-shadow-accent/50 [&>span]:group-hover:text-shadow-accent/50",
        destructive:
          "[--color-frame-1-stroke:var(--color-destructive)] [--color-frame-1-fill:var(--color-destructive)]/22 [--color-frame-2-stroke:var(--color-destructive)] [--color-frame-2-fill:var(--color-destructive)]/10 text-destructive-foreground [&:hover_svg]:drop-shadow-destructive/50 [&>span]:group-hover:text-shadow-destructive/50",
        secondary:
          "[--color-frame-1-stroke:var(--color-secondary)] [--color-frame-1-fill:var(--color-secondary)]/15 [--color-frame-2-stroke:var(--color-secondary)] [--color-frame-2-fill:var(--color-secondary)]/10 text-secondary-foreground [&:hover_svg]:drop-shadow-secondary/50 [&>span]:group-hover:text-shadow-secondary/50",
        success:
          "[--color-frame-1-stroke:var(--color-success)] [--color-frame-1-fill:var(--color-success)]/22 [--color-frame-2-stroke:var(--color-success)] [--color-frame-2-fill:var(--color-success)]/10 text-success-foreground [&:hover_svg]:drop-shadow-success/50 [&>span]:group-hover:text-shadow-success/50",
      },
      shape: {
        default: "",
        flat: "[--color-frame-2-stroke:transparent] [--color-frame-2-fill:transparent]",
        simple: "ps-8 pe-6",
        "tab-left": "",
        "tab-center": "",
        "tab-right": "",
      },
    },
    defaultVariants: {
      variant: "default",
      shape: "default",
    },
  }
);

function Button({
  className,
  children,
  variant = "default",
  shape = "default",
  customPaths,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    customPaths?: string[];
  }) {
  return (
    <button
      {...props}
      className={twMerge(buttonVariants({ variant, shape, className }))}
    >
      <div className="absolute inset-0 -mb-2">
        {!customPaths && (shape == "default" || shape == "flat") && (
          <Frame
            paths={JSON.parse(
              '[{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-1-stroke)","fill":"var(--color-frame-1-fill)"},"path":[["M","17","0"],["L","100% - 7","0"],["L","100% + 0","0% + 9.5"],["L","100% - 18","100% - 6"],["L","4","100% - 6"],["L","0","100% - 15"],["L","17","0"]]},{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-2-stroke)","fill":"var(--color-frame-2-fill)"},"path":[["M","9","100% - 6"],["L","100% - 22","100% - 6"],["L","100% - 25","100% + 0"],["L","12","100% + 0"],["L","9","100% - 6"]]}]'
            )}
          />
        )}
        {!customPaths && shape == "simple" && (
          <Frame
            paths={JSON.parse(
              '[{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-1-stroke)","fill":"var(--color-frame-1-fill)"},"path":[["M","17","0"],["L","100% - 0","0"],["L","100% - 0","100% - 6"],["L","0% + 3","100% - 6"],["L","0% - 0","100% - 16"],["L","17","0"]]},{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-2-stroke)","fill":"var(--color-frame-2-fill)"},"path":[["M","8","100% - 6"],["L","100% - 5","100% - 6"],["L","100% - 7","100% - 0"],["L","10","100% - 0"],["L","8","100% - 6"]]}]'
            )}
          />
        )}
        {customPaths?.map((customPath, customPathKey) => {
          return <Frame key={customPathKey} paths={JSON.parse(customPath)} />;
        })}
      </div>
      <span>{children}</span>
    </button>
  );
}

export { Button };
                `}
            </PreviewCode>
            <SectionContent>
              Update the import paths to match your project setup.
            </SectionContent>
          </div>
          <div id="usage">
            <SectionTitle>Usage</SectionTitle>
            <PreviewCode>
              {`
import { Button } from "@/components/ui/button";
              `}
            </PreviewCode>
            <PreviewCode>
              {`
<Button variant="destructive" shape="flat">
  Button
</Button>
<Button variant="success">Button</Button>
<Button shape="simple">Button</Button>
              `}
            </PreviewCode>
          </div>
        </div>
      </Wrapper>
      <Menu>
        <a className="hover:text-foreground py-1" href="#installation">
          Installation
        </a>
        <a className="hover:text-foreground py-1" href="#usage">
          Usage
        </a>
      </Menu>
    </>
  );
}

export { ButtonPage };
