import { createContext, useContext, useId } from "react";
import { twMerge } from "tailwind-merge";
import { useMachine, normalizeProps } from "@zag-js/react";
import * as switchMachine from "@zag-js/switch";
import { Frame, parsePaths } from "@/components/ui/frame";

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
          paths={parsePaths(
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
        paths={parsePaths(
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
