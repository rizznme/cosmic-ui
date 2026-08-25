import { createContext, useContext, useId } from "react";
import { twMerge } from "tailwind-merge";
import { useMachine, normalizeProps } from "@zag-js/react";
import * as radioGroup from "@zag-js/radio-group";
import { Frame, parsePaths } from "@/components/ui/frame";

const RadioGroupContext = createContext<ReturnType<typeof radioGroup.connect> | null>(
  null
);
const RadioGroupItemContext = createContext<{ value: string } | null>(null);

function useRadioGroupContext() {
  const api = useContext(RadioGroupContext);
  if (!api) throw new Error("RadioGroup parts must be used within <RadioGroupRoot>");
  return api;
}

function useRadioGroupItemContext() {
  const item = useContext(RadioGroupItemContext);
  if (!item) throw new Error("RadioGroupItem parts must be used within <RadioGroupItem>");
  return item;
}

function RadioGroupRoot({
  children,
  className,
  ...rest
}: React.PropsWithChildren<Partial<radioGroup.Props> & { className?: string }>) {
  const service = useMachine(radioGroup.machine, { id: useId(), ...rest });
  const api = radioGroup.connect(service, normalizeProps);

  return (
    <RadioGroupContext.Provider value={api}>
      <div {...api.getRootProps()} className={twMerge(["flex flex-col gap-3", className])}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

function RadioGroupLabel({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  const api = useRadioGroupContext();

  return (
    <div {...api.getLabelProps()} className={twMerge(["font-bold", className])}>
      {children}
    </div>
  );
}

function RadioGroupItem({
  children,
  className,
  value,
}: React.PropsWithChildren<{ className?: string; value: string }>) {
  const api = useRadioGroupContext();

  return (
    <RadioGroupItemContext.Provider value={{ value }}>
      <label
        {...api.getItemProps({ value })}
        className={twMerge(["flex gap-3.5 items-center cursor-pointer", className])}
      >
        {children}
        <input {...api.getItemHiddenInputProps({ value })} />
      </label>
    </RadioGroupItemContext.Provider>
  );
}

function RadioGroupItemText({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  const api = useRadioGroupContext();
  const { value } = useRadioGroupItemContext();

  return (
    <span {...api.getItemTextProps({ value })} className={twMerge(["order-2", className])}>
      {children}
    </span>
  );
}

function RadioGroupItemControl({ className }: { className?: string }) {
  const api = useRadioGroupContext();
  const { value } = useRadioGroupItemContext();

  return (
    <div
      {...api.getItemControlProps({ value })}
      className={twMerge([
        "group relative size-5 flex items-center justify-center data-[state=checked]:drop-shadow-[0_0px_20px_var(--color-primary)]",
        "[--color-frame-1-stroke:var(--color-primary)]/70",
        "[--color-frame-1-fill:var(--color-primary)]/10",
        className,
      ])}
    >
      <Frame
        paths={parsePaths(
          '[{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-1-stroke)","fill":"var(--color-frame-1-fill)"},"path":[["M","50% - 28.125%","0"],["L","50% + 28.125%","0"],["L","100% + 0","50% - 28.125%"],["L","100% + 0","50% + 28.125%"],["L","50% + 28.125%","100% - 0"],["L","50% - 28.125%","100% + 0"],["L","0","50% + 28.125%"],["L","0","50% - 28.125%"],["L","50% - 28.125%","0"]]}]'
        )}
      />
      <div
        className={twMerge([
          "group-data-[state=checked]:opacity-100 opacity-0 relative size-3 transition-all duration-100",
          "[--color-frame-1-stroke:var(--color-primary)]",
          "[--color-frame-1-fill:var(--color-primary)]/30",
        ])}
      >
        <Frame
          paths={parsePaths(
            '[{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-1-stroke)","fill":"var(--color-frame-1-fill)"},"path":[["M","50% - 28.125%","0"],["L","50% + 28.125%","0"],["L","100% + 0","50% - 28.125%"],["L","100% + 0","50% + 28.125%"],["L","50% + 28.125%","100% - 0"],["L","50% - 28.125%","100% + 0"],["L","0","50% + 28.125%"],["L","0","50% - 28.125%"],["L","50% - 28.125%","0"]]}]'
          )}
        />
      </div>
    </div>
  );
}

export {
  RadioGroupRoot,
  RadioGroupLabel,
  RadioGroupItem,
  RadioGroupItemText,
  RadioGroupItemControl,
};
