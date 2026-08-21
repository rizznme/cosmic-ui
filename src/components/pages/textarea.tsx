import { Textarea } from "@/components/ui/textarea";
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

function TextareaPage() {
  return (
    <>
      <Wrapper>
        <div className="flex flex-col gap-20">
          <div>
            <Title>Textarea</Title>
            <Subtitle>
              Displays a form textarea or a component that looks like a
              textarea.
            </Subtitle>
            <Preview>
              {() => ({
                preview: (
                  <>
                    <Textarea placeholder="Type your message here..." />
                  </>
                ),
                code: (
                  <PreviewCode>
                    {`
<Textarea placeholder="Type your message here..." />
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
            <PreviewCode title="components/ui/textarea.tsx">
              {`
import { Frame } from "@/components/ui/frame";
import { twMerge } from "tailwind-merge";

function Textarea({
  className,
  children,
  variant = "lifted",
  ...props
}: React.ComponentProps<"textarea"> & {
  variant?: "flat" | "lifted" | "simple";
}) {
  return (
    <div
      className={twMerge([
        "relative",
        "[--color-frame-1-stroke:var(--color-primary)]/70",
        "[--color-frame-1-fill:var(--color-primary)]/10",
        "[--color-frame-2-stroke:transparent]",
        "[--color-frame-2-fill:transparent]",
      ])}
    >
      <div className="absolute inset-0 -mb-2 [&>svg]:drop-shadow-[0_0px_20px_var(--color-primary)]">
        <Frame
          paths={JSON.parse(
            '[{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-1-stroke)","fill":"var(--color-frame-1-fill)"},"path":[["M","17","0"],["L","100% - 7","0"],["L","100% + 0","0% + 9.5"],["L","100% - 18","100% - 6"],["L","4","100% - 6"],["L","0","100% - 15"],["L","17","0"]]},{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-2-stroke)","fill":"var(--color-frame-2-fill)"},"path":[["M","9","100% - 6"],["L","100% - 22","100% - 6"],["L","100% - 25","100% + 0"],["L","12","100% + 0"],["L","9","100% - 6"]]}]'
          )}
        />
      </div>
      <textarea
        className="outline-none px-8 py-2 relative field-sizing-content min-h-16 w-full placeholder:text-foreground/70"
        {...props}
      />
    </div>
  );
}

export { Textarea };
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
import { Textarea } from "@/components/ui/textarea";
              `}
            </PreviewCode>
            <PreviewCode>
              {`
<Textarea placeholder="Type your message here..." />
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

export { TextareaPage };
