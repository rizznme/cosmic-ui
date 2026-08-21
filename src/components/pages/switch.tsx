import { MoveUpRight } from "lucide-react";
import {
  SwitchRoot,
  SwitchHiddenInput,
  SwitchControl,
  SwitchLabel,
  SwitchThumb,
} from "@/components/ui/switch";
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

function SwitchPage() {
  return (
    <>
      <Wrapper>
        <div className="flex flex-col gap-20">
          <div>
            <Title>Switch</Title>
            <Subtitle>
              A control that allows the user to toggle between checked and not
              checked.
            </Subtitle>
            <div className="flex gap-3 mt-5">
              <a
                className="pr-3 pl-3.5 py-0.5 border border-primary/20 bg-primary/10 flex items-center gap-2 text-sm"
                target="_blank"
                href="https://zagjs.com/components/react/switch"
              >
                Docs <MoveUpRight className="stroke-1 size-3" />
              </a>
              <a
                className="pr-3 pl-3.5 py-0.5 border border-primary/20 bg-primary/10 flex items-center gap-2 text-sm"
                target="_blank"
                href="https://zagjs.com/components/react/switch#api-reference"
              >
                Api Reference <MoveUpRight className="stroke-1 size-3" />
              </a>
            </div>
            <Preview>
              {() => ({
                preview: (
                  <>
                    <SwitchRoot>
                      <SwitchControl>
                        <SwitchThumb />
                      </SwitchControl>
                      <SwitchLabel>Airplane Mode</SwitchLabel>
                      <SwitchHiddenInput />
                    </SwitchRoot>
                  </>
                ),
                code: (
                  <PreviewCode>
                    {`
<SwitchRoot>
  <SwitchControl>
    <SwitchThumb />
  </SwitchControl>
  <SwitchLabel>Airplane Mode</SwitchLabel>
  <SwitchHiddenInput />
</SwitchRoot>
                `}
                  </PreviewCode>
                ),
              })}
            </Preview>
          </div>
          <div id="installation">
            <SectionTitle>Installation</SectionTitle>
            <SectionContent>Install the following dependencies:</SectionContent>
            <InstallPackage>add @zag-js/switch @zag-js/react</InstallPackage>
            <SectionContent>
              This component is built directly on the Zag.js state machine
              (not a wrapper). No Portal or presence hook needed, the thumb
              just slides via CSS transition, no exit animation. Copy and
              paste the following code into your project.
            </SectionContent>
            <PreviewCode title="components/ui/switch.tsx">
              {`
import { createContext, useContext, useId } from "react";
import { twMerge } from "tailwind-merge";
import { useMachine, normalizeProps } from "@zag-js/react";
import * as switchMachine from "@zag-js/switch";
import { Frame } from "@/components/ui/frame";

const SwitchContext = createContext<ReturnType<typeof switchMachine.connect> | null>(
  null
);

function useSwitchContext() {
  const api = useContext(SwitchContext);
  if (!api) throw new Error("Switch parts must be used within <SwitchRoot>");
  return api;
}

function SwitchRoot({
  children,
  className,
  ...rest
}: React.PropsWithChildren<Partial<switchMachine.Props> & { className?: string }>) {
  const service = useMachine(switchMachine.machine, { id: useId(), ...rest });
  const api = switchMachine.connect(service, normalizeProps);

  return (
    <SwitchContext.Provider value={api}>
      <label {...api.getRootProps()} className={twMerge(["flex items-center gap-4", className])}>
        {children}
      </label>
    </SwitchContext.Provider>
  );
}

function SwitchHiddenInput() {
  const api = useSwitchContext();

  return <input {...api.getHiddenInputProps()} />;
}

function SwitchControl({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  const api = useSwitchContext();

  return (
    <div
      {...api.getControlProps()}
      className={twMerge([
        "group relative w-14 h-6 flex items-center p-1 cursor-pointer",
        "[--color-frame-1-stroke:var(--color-primary)]/70",
        "[--color-frame-1-fill:var(--color-primary)]/10",
        "data-[state=checked]:[--color-frame-1-stroke:var(--color-primary)]",
        "data-[state=checked]:[--color-frame-1-fill:var(--color-primary)]/20",
        className,
      ])}
    >
      <div className="absolute inset-0 z-[-1]">
        <Frame
          paths={JSON.parse(
            '[{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-1-stroke)","fill":"var(--color-frame-1-fill)"},"path":[["M","11","0"],["L","100% + 0","0"],["L","100% + 0","100% + 0"],["L","0","100% + 0"],["L","0","0% + 12"],["L","11","0"]]}]'
          )}
        />
      </div>
      {children}
    </div>
  );
}

function SwitchThumb({ className }: { className?: string }) {
  const api = useSwitchContext();

  return (
    <div
      {...api.getThumbProps()}
      className={twMerge([
        "relative w-1/2 h-3.5 z-[-1] -mb-px transition-all ms-0.5",
        "[--color-frame-1-stroke:var(--color-primary)]/80",
        "[--color-frame-1-fill:var(--color-primary)]/20",
        "group-data-[state=checked]:[--color-frame-1-stroke:var(--color-primary)]",
        "group-data-[state=checked]:[--color-frame-1-fill:var(--color-primary)]/30",
        "group-data-[state=checked]:ms-[47%] group-data-[state=checked]:drop-shadow-[0_0px_20px_var(--color-primary)]",
        className,
      ])}
    >
      <Frame
        paths={JSON.parse(
          '[{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-1-stroke)","fill":"var(--color-frame-1-fill)"},"path":[["M","7","0"],["L","100% + 0","0"],["L","100% + 0","100% + 0"],["L","0","100% + 0"],["L","0","0% + 7"],["L","7","0"]]}]'
        )}
      />
    </div>
  );
}

function SwitchLabel({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  const api = useSwitchContext();

  return (
    <span {...api.getLabelProps()} className={className}>
      {children}
    </span>
  );
}

export {
  SwitchRoot,
  SwitchHiddenInput,
  SwitchControl,
  SwitchThumb,
  SwitchLabel,
};
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
import {
  SwitchRoot,
  SwitchHiddenInput,
  SwitchControl,
  SwitchLabel,
  SwitchThumb,
} from "@/components/ui/switch";
              `}
            </PreviewCode>
            <PreviewCode>
              {`
<SwitchRoot>
  <SwitchControl>
    <SwitchThumb />
  </SwitchControl>
  <SwitchLabel>Airplane Mode</SwitchLabel>
  <SwitchHiddenInput />
</SwitchRoot>
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

export { SwitchPage };
