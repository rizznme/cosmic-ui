import { MoveUpRight } from "lucide-react";
import {
  CheckboxRoot,
  CheckboxLabel,
  CheckboxControl,
  CheckboxHiddenInput,
} from "@/components/ui/checkbox";
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

function CheckboxPage() {
  return (
    <>
      <Wrapper>
        <div className="flex flex-col gap-20">
          <div>
            <Title>Checkbox</Title>
            <Subtitle>
              A set of checkable buttons—known as radio buttons—where no more
              than one of the buttons can be checked at a time.
            </Subtitle>
            <div className="flex gap-3 mt-5">
              <a
                className="pr-3 pl-3.5 py-0.5 border border-primary/20 bg-primary/10 flex items-center gap-2 text-sm"
                target="_blank"
                href="https://zagjs.com/components/react/checkbox"
              >
                Docs <MoveUpRight className="stroke-1 size-3" />
              </a>
              <a
                className="pr-3 pl-3.5 py-0.5 border border-primary/20 bg-primary/10 flex items-center gap-2 text-sm"
                target="_blank"
                href="https://zagjs.com/components/react/checkbox#api-reference"
              >
                Api Reference <MoveUpRight className="stroke-1 size-3" />
              </a>
            </div>
            <Preview>
              {() => ({
                preview: (
                  <>
                    <CheckboxRoot>
                      <CheckboxLabel>Accept terms and conditions</CheckboxLabel>
                      <CheckboxControl />
                      <CheckboxHiddenInput />
                    </CheckboxRoot>
                  </>
                ),
                code: (
                  <PreviewCode>
                    {`
<CheckboxRoot>
  <CheckboxLabel>Accept terms and conditions</CheckboxLabel>
  <CheckboxControl />
  <CheckboxHiddenInput />
</CheckboxRoot>
                `}
                  </PreviewCode>
                ),
              })}
            </Preview>
          </div>
          <div id="installation">
            <SectionTitle>Installation</SectionTitle>
            <SectionContent>Install the following dependencies:</SectionContent>
            <InstallPackage>add @zag-js/checkbox @zag-js/react</InstallPackage>
            <SectionContent>
              This component is built directly on the Zag.js state machine
              (not a wrapper). No Portal or presence hook needed, the check
              mark just toggles opacity, no exit animation. Copy and paste
              the following code into your project.
            </SectionContent>
            <PreviewCode title="components/ui/checkbox.tsx">
              {`
import { createContext, useContext, useId } from "react";
import { twMerge } from "tailwind-merge";
import { useMachine, normalizeProps } from "@zag-js/react";
import * as checkbox from "@zag-js/checkbox";
import { Frame } from "@/components/ui/frame";
import { Check } from "lucide-react";

const CheckboxContext = createContext<ReturnType<typeof checkbox.connect> | null>(
  null
);

function useCheckboxContext() {
  const api = useContext(CheckboxContext);
  if (!api) throw new Error("Checkbox parts must be used within <CheckboxRoot>");
  return api;
}

function CheckboxRoot({
  children,
  className,
  ...rest
}: React.PropsWithChildren<Partial<checkbox.Props> & { className?: string }>) {
  const service = useMachine(checkbox.machine, { id: useId(), ...rest });
  const api = checkbox.connect(service, normalizeProps);

  return (
    <CheckboxContext.Provider value={api}>
      <label
        {...api.getRootProps()}
        className={twMerge(["flex gap-3.5 items-center cursor-pointer", className])}
      >
        {children}
      </label>
    </CheckboxContext.Provider>
  );
}

function CheckboxLabel({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  const api = useCheckboxContext();

  return (
    <span {...api.getLabelProps()} className={twMerge(["order-2", className])}>
      {children}
    </span>
  );
}

function CheckboxControl({ className }: { className?: string }) {
  const api = useCheckboxContext();

  return (
    <div
      {...api.getControlProps()}
      className={twMerge([
        "group relative size-5 flex items-center justify-center data-[state=checked]:drop-shadow-[0_0px_20px_var(--color-primary)]",
        "[--color-frame-1-stroke:var(--color-primary)]/80",
        "[--color-frame-1-fill:var(--color-primary)]/10",
        className,
      ])}
    >
      <Frame
        paths={JSON.parse(
          '[{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-1-stroke)","fill":"var(--color-frame-1-fill)"},"path":[["M","50% - 28.125%","0"],["L","50% + 28.125%","0"],["L","100% + 0","50% - 28.125%"],["L","100% + 0","50% + 28.125%"],["L","50% + 28.125%","100% - 0"],["L","50% - 28.125%","100% + 0"],["L","0","50% + 28.125%"],["L","0","50% - 28.125%"],["L","50% - 28.125%","0"]]}]'
        )}
      />
      <Check className="group-data-[state=checked]:opacity-100 opacity-0 size-6 -mt-1 -mr-2 stroke-(--color-primary)/80 drop-shadow-[0_0px_2px_var(--color-primary)] transition-all duration-100" />
    </div>
  );
}

function CheckboxHiddenInput() {
  const api = useCheckboxContext();

  return <input {...api.getHiddenInputProps()} />;
}

export { CheckboxRoot, CheckboxLabel, CheckboxControl, CheckboxHiddenInput };
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
  CheckboxRoot,
  CheckboxLabel,
  CheckboxControl,
  CheckboxHiddenInput,
} from "@/components/ui/checkbox";
              `}
            </PreviewCode>
            <PreviewCode>
              {`
<CheckboxRoot>
  <CheckboxLabel>Accept terms and conditions</CheckboxLabel>
  <CheckboxControl />
  <CheckboxHiddenInput />
</CheckboxRoot>
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

export { CheckboxPage };
