import {
  AlertRoot,
  AlertTitle,
  AlertDescription,
  AlertCloseTrigger,
} from "@/components/ui/alert";
import { SquareCheck } from "lucide-react";
import {
  Wrapper,
  Title,
  Subtitle,
  Menu,
  Preview,
  SectionTitle,
  SectionContent,
  InstallPackage,
  PreviewCode,
} from "@/components/docs";

function AlertPage() {
  return (
    <>
      <Wrapper>
        <div className="flex flex-col gap-20">
          <div>
            <Title>Alert</Title>
            <Subtitle>Displays a callout for user attention.</Subtitle>
            <Preview>
              {() => ({
                preview: (
                  <>
                    <AlertRoot>
                      <AlertTitle>
                        <SquareCheck className="flex-none size-4.5 me-2.5" />{" "}
                        Success! Your changes have been saved
                      </AlertTitle>
                      <AlertDescription>
                        This is an alert with icon, title and description.
                      </AlertDescription>
                      <AlertCloseTrigger />
                    </AlertRoot>
                  </>
                ),
                code: (
                  <PreviewCode>
                    {`
<AlertRoot>
  <AlertTitle>
    <SquareCheck className="size-4.5 me-2.5" /> Success! Your
    changes have been saved
  </AlertTitle>
  <AlertDescription>
    This is an alert with icon, title and description.
  </AlertDescription>
  <AlertCloseTrigger />
</AlertRoot>
                `}
                  </PreviewCode>
                ),
              })}
            </Preview>
          </div>
          <div id="installation">
            <SectionTitle>Installation</SectionTitle>
            <SectionContent>Install the following dependencies:</SectionContent>
            <InstallPackage>add @zag-js/presence @zag-js/react</InstallPackage>
            <SectionContent>
              This uses the shared{" "}
              <span className="bg-foreground/15 px-1.5 py-px rounded-md">
                usePresence
              </span>{" "}
              hook (see the{" "}
              <a href="/docs/menu" className="font-medium">
                Menu
              </a>{" "}
              page's Installation section for{" "}
              <span className="bg-foreground/15 px-1.5 py-px rounded-md">
                components/ui/presence.ts
              </span>
              ) to keep the alert mounted through its exit animation instead
              of vanishing the instant it's dismissed. Copy and paste the
              following code into your project.
            </SectionContent>
            <PreviewCode title="components/ui/alert.tsx">
              {`
import { Button } from "@/components/ui/button";
import { Frame } from "@/components/ui/frame";
import { X } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { useState, useContext, createContext } from "react";
import { usePresence } from "@/components/ui/presence";

const PresentContext = createContext<{
  present: boolean;
  setPresent: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

function AlertRoot({
  className,
  children,
  ...rest
}: React.ComponentProps<"div">) {
  const [present, setPresent] = useState(true);
  const { present: mounted, ref } = usePresence(present);

  return (
    <PresentContext.Provider
      value={{
        present,
        setPresent,
      }}
    >
      <div
        ref={ref}
        hidden={!mounted}
        data-state={present ? "open" : "closed"}
        className={twMerge([
          "relative px-10 pt-8 pb-6.5 w-full [&>svg]:drop-shadow-[0_0px_20px_var(--color-primary)]",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:duration-200",
          "[--color-frame-1-stroke:var(--color-primary)]",
          "[--color-frame-1-fill:var(--color-primary)]/20",
          "[--color-frame-2-stroke:var(--color-primary)]",
          "[--color-frame-2-fill:transparent]",
          "[--color-frame-3-stroke:var(--color-accent)]",
          "[--color-frame-3-fill:var(--color-accent)]/50",
          className,
        ])}
        {...rest}
      >
        <Frame
          paths={JSON.parse(
            '[{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-1-stroke)","fill":"var(--color-frame-1-fill)"},"path":[["M","0% + 34","7"],["L","0% + 79.5","7"],["L","0% + 96.5","13"],["L","100% - 21.5","13"],["L","100% + 0","34"],["L","100% - 13","100% - 15"],["L","100% - 26","100% - 6"],["L","0% + 11.5","100% - 6"],["L","0","100% - 18"],["L","13","0% + 28"],["L","34","7"]]},{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-2-stroke)","fill":"var(--color-frame-2-fill)"},"path":[["M","18","100% - 6"],["L","100% - 33.5","100% - 6"],["L","100% - 39.5","100% - 0"],["L","24","100% + 0"],["L","18","100% - 6"]]},{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-3-stroke)","fill":"var(--color-frame-3-fill)"},"path":[["M","17","7"],["L","0% + 26.5","7"],["L","0% + 12.5","0% + 20"],["L","13","0% + 11"],["L","17","7"]]}]'
          )}
        />
        {children}
      </div>
    </PresentContext.Provider>
  );
}

function AlertTitle({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={twMerge([
        "flex items-center text-shadow-lg text-shadow-primary font-bold w-full relative",
        className,
      ])}
      {...props}
    >
      {children}
    </div>
  );
}

function AlertDescription({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={twMerge(["relative pt-2 opacity-80", className])}
      {...props}
    >
      {children}
    </div>
  );
}

function AlertCloseTrigger({
  className,
  ...props
}: React.ComponentProps<"button">) {
  const context = useContext(PresentContext);

  return (
    <Button
      shape="flat"
      variant="accent"
      className={twMerge([
        "absolute -right-1 top-2 px-5 py-1.5 transform scale-x-[-1]",
        "[--color-frame-1-fill:var(--color-accent)]/70",
      ])}
      {...props}
      onClick={() => context?.setPresent(false)}
    >
      <X className="size-4" />
    </Button>
  );
}

export { AlertRoot, AlertTitle, AlertDescription, AlertCloseTrigger };
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
import { Alert } from "@/components/ui/alert";
              `}
            </PreviewCode>
            <PreviewCode>
              {`
<AlertRoot>
  <AlertTitle>
    <SquareCheck className="size-4.5 me-2.5" /> Success!
    Your changes have been saved
  </AlertTitle>
  <AlertDescription>
    This is an alert with icon, title and description.
  </AlertDescription>
  <AlertCloseTrigger />
</AlertRoot>
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

export { AlertPage };
