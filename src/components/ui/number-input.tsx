import { createContext, useContext, useId } from "react";
import { twMerge } from "tailwind-merge";
import { Minus, Plus } from "lucide-react";
import { useMachine, normalizeProps } from "@zag-js/react";
import * as numberInputMachine from "@zag-js/number-input";

const NumberInputContext = createContext<ReturnType<
  typeof numberInputMachine.connect
> | null>(null);

function useNumberInputContext() {
  const api = useContext(NumberInputContext);
  if (!api) throw new Error("NumberInput parts must be used within <NumberInputRoot>");
  return api;
}

function NumberInputRoot({
  children,
  className,
  ...rest
}: React.PropsWithChildren<
  Partial<numberInputMachine.Props> & { className?: string }
>) {
  const service = useMachine(numberInputMachine.machine, { id: useId(), ...rest });
  const api = numberInputMachine.connect(service, normalizeProps);

  return (
    <NumberInputContext.Provider value={api}>
      <div {...api.getRootProps()} className={twMerge(["flex flex-col gap-2", className])}>
        {children}
      </div>
    </NumberInputContext.Provider>
  );
}

function NumberInputLabel({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  const api = useNumberInputContext();

  return (
    <label {...api.getLabelProps()} className={className}>
      {children}
    </label>
  );
}

function NumberInputControl({ className }: { className?: string }) {
  const api = useNumberInputContext();

  return (
    <div
      {...api.getControlProps()}
      className={twMerge([
        "flex items-center border border-primary/30 bg-primary/10 w-fit",
        className,
      ])}
    >
      <button
        {...api.getDecrementTriggerProps()}
        className="px-2.5 py-2 hover:bg-primary/10 disabled:opacity-30 disabled:pointer-events-none"
      >
        <Minus className="size-3.5" />
      </button>
      <input
        {...api.getInputProps()}
        className="w-16 text-center outline-none bg-transparent py-2"
      />
      <button
        {...api.getIncrementTriggerProps()}
        className="px-2.5 py-2 hover:bg-primary/10 disabled:opacity-30 disabled:pointer-events-none"
      >
        <Plus className="size-3.5" />
      </button>
    </div>
  );
}

export { NumberInputRoot, NumberInputLabel, NumberInputControl };
