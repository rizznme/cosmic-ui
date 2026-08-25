import { createContext, useContext, useId } from "react";
import { twMerge } from "tailwind-merge";
import { useMachine, normalizeProps } from "@zag-js/react";
import * as combobox from "@zag-js/combobox";
import { Button } from "@/components/ui/button";
import { Frame, parsePaths } from "@/components/ui/frame";
import { Portal } from "@/components/ui/portal";
import { usePresence } from "@/components/ui/presence";
import { ChevronsUpDown, Search, Check } from "lucide-react";

const ComboboxContext = createContext<ReturnType<typeof combobox.connect> | null>(
  null
);
const ComboboxItemContext = createContext<combobox.CollectionItem | null>(null);

function useComboboxContext() {
  const api = useContext(ComboboxContext);
  if (!api) throw new Error("Combobox parts must be used within <ComboboxRoot>");
  return api;
}

function useComboboxItemContext() {
  const item = useContext(ComboboxItemContext);
  if (item === null) {
    throw new Error("ComboboxItemText/Indicator must be used within <ComboboxItem>");
  }
  return item;
}

function ComboboxRoot({
  children,
  ...rest
}: React.PropsWithChildren<Partial<combobox.Props>>) {
  const service = useMachine(combobox.machine, {
    id: useId(),
    selectionBehavior: "clear",
    ...rest,
  });
  const api = combobox.connect(service, normalizeProps);

  return (
    <ComboboxContext.Provider value={api}>
      <div {...api.getRootProps()}>{children}</div>
    </ComboboxContext.Provider>
  );
}

function ComboboxTrigger() {
  const api = useComboboxContext();

  return (
    <div {...api.getControlProps()} className="relative">
      <Button
        {...api.getTriggerProps()}
        className="w-full min-w-55 px-0 [&>span]:justify-start px-8"
      >
        {api.value.length && api.value[0].length ? api.value : "Select option..."}{" "}
        <ChevronsUpDown className="size-4 ms-auto opacity-70" />
      </Button>
    </div>
  );
}

function ComboboxContent({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  const api = useComboboxContext();
  const { present, ref } = usePresence(api.open);

  return (
    <Portal>
      <div {...api.getPositionerProps()}>
        <div
          {...api.getContentProps()}
          ref={ref}
          hidden={!present}
          className={twMerge([
            "group relative min-w-(--reference-width) outline-none",
            "[&[data-state='open']]:animate-in [&[data-state='open']]:zoom-in-80 [&[data-state='open']]:fade-in-0 [&[data-state='open']]:duration-200 [&[data-state='open'][data-placement='bottom-start']]:slide-in-from-top-2 [&[data-state='open'][data-placement='left-start']]:slide-in-from-right-2 [&[data-state='open'][data-placement='right-start']]:slide-in-from-left-2 [&[data-state='open'][data-placement='top-start']]:slide-in-from-bottom-2",
            "[&[data-state='closed']]:animate-out [&[data-state='closed']]:zoom-out-80 [&[data-state='closed']]:fade-out-0 [&[data-state='closed']]:duration-200",
            "[--color-frame-1-stroke:var(--color-primary)]",
            "[--color-frame-1-fill:var(--color-primary)]/20",
            "[--color-frame-2-stroke:var(--color-accent)]",
            "[--color-frame-2-fill:var(--color-accent)]/40",
            "[--color-frame-3-stroke:var(--color-accent)]",
            "[--color-frame-3-fill:var(--color-accent)]/40",
            "[--color-frame-4-stroke:var(--color-accent)]",
            "[--color-frame-4-fill:var(--color-accent)]/40",
            className,
          ])}
        >
          <div className="absolute inset-0 group-data-[placement=top-start]:scale-y-[-1]">
            <Frame
              paths={parsePaths(
                '[{"show":false,"style":{"strokeWidth":"1","stroke":"var(--color-frame-1-stroke)","fill":"var(--color-frame-1-fill)"},"path":[["M","14","6"],["L","50% - 7","6"],["L","50% - 2","0"],["L","50% + 4","0"],["L","50% + 9","6"],["L","100% - 13","6"],["L","100% + 0","19"],["L","100% + 0","100% - 26"],["L","100% - 13","100% - 12"],["L","50% + 13","100% - 12"],["L","50% - 0","100% + 0"],["L","0% + 14","100% + 0"],["L","0% + 0","100% - 13"],["L","0","0% + 19"],["L","14","6"]]},{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-2-stroke)","fill":"var(--color-frame-2-fill)"},"path":[["M","50% + 16","100% - 8"],["L","50% + 25","100% - 8"],["L","50% + 18","100% - 2"],["L","50% + 9","100% - 2"],["L","50% + 16","100% - 8"]]},{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-3-stroke)","fill":"var(--color-frame-3-fill)"},"path":[["M","50% + 30","100% - 8"],["L","50% + 37","100% - 8"],["L","50% + 32","100% - 3"],["L","50% + 25","100% - 3"],["L","50% + 30","100% - 8"]]},{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-4-stroke)","fill":"var(--color-frame-4-fill)"},"path":[["M","50% + 42","100% - 8"],["L","50% + 48","100% - 8"],["L","50% + 44","100% - 4"],["L","50% + 38","100% - 4"],["L","50% + 42","100% - 8"]]}]'
              )}
              enableBackdropBlur={true}
            />
          </div>
          {children}
        </div>
      </div>
    </Portal>
  );
}

function ComboboxInput() {
  const api = useComboboxContext();

  return (
    <div className="relative border-b border-primary/30">
      <div className="absolute size-3.5 inset-y-0 my-auto ml-5">
        <Search className="size-full mt-0.5 opacity-70" />
      </div>
      <input
        {...api.getInputProps()}
        className="outline-none ps-11 pe-6 pt-2.5 pb-3 mt-2 w-full"
        placeholder="Search..."
      />
    </div>
  );
}

function ComboboxItemGroup({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  const api = useComboboxContext();
  const groupId = useId();

  return (
    <div
      {...api.getItemGroupProps({ id: groupId })}
      className={twMerge(["relative flex flex-col gap-2.5 px-6 pt-4 pb-7", className])}
    >
      {children}
    </div>
  );
}

function ComboboxItem({
  children,
  className,
  item,
}: React.PropsWithChildren<{ className?: string; item: combobox.CollectionItem }>) {
  const api = useComboboxContext();

  return (
    <ComboboxItemContext.Provider value={item}>
      <div
        {...api.getItemProps({ item })}
        className={twMerge([
          "cursor-pointer flex items-center -mx-3 -my-0.5 px-3 py-0.5 border border-transparent hover:border-primary/30 hover:bg-primary/10 data-[highlighted]:border-primary/30 data-[highlighted]:bg-primary/10",
          className,
        ])}
      >
        {children}
      </div>
    </ComboboxItemContext.Provider>
  );
}

function ComboboxItemText({ children }: React.PropsWithChildren) {
  const api = useComboboxContext();
  const item = useComboboxItemContext();

  return <div {...api.getItemTextProps({ item })}>{children}</div>;
}

function ComboboxItemIndicator({ className }: { className?: string }) {
  const api = useComboboxContext();
  const item = useComboboxItemContext();

  return (
    <div {...api.getItemIndicatorProps({ item })} className={twMerge(["ms-auto", className])}>
      <Check className="size-3.5" />
    </div>
  );
}

export {
  ComboboxRoot,
  ComboboxInput,
  ComboboxTrigger,
  ComboboxContent,
  ComboboxItemGroup,
  ComboboxItem,
  ComboboxItemText,
  ComboboxItemIndicator,
};
