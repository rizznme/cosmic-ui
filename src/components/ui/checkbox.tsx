import { createContext, useContext, useId } from "react";
import { twMerge } from "tailwind-merge";
import { useMachine, normalizeProps } from "@zag-js/react";
import * as checkbox from "@zag-js/checkbox";
import { Frame, parsePaths } from "@/components/ui/frame";
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
        paths={parsePaths(
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
