import { createContext, useContext, useId } from "react";
import { twMerge } from "tailwind-merge";
import { useMachine, normalizeProps } from "@zag-js/react";
import * as select from "@zag-js/select";
import { Button } from "@/components/ui/button";
import { Frame, parsePaths } from "@/components/ui/frame";
import { Portal } from "@/components/ui/portal";
import { usePresence } from "@/components/ui/presence";
import { ChevronDown, Check } from "lucide-react";

const SelectContext = createContext<ReturnType<typeof select.connect> | null>(null);
const SelectItemContext = createContext<select.CollectionItem | null>(null);

function useSelectContext() {
  const api = useContext(SelectContext);
  if (!api) throw new Error("Select parts must be used within <SelectRoot>");
  return api;
}

function useSelectItemContext() {
  const item = useContext(SelectItemContext);
  if (item === null) {
    throw new Error("SelectItemText/Indicator must be used within <SelectItem>");
  }
  return item;
}

function SelectRoot({
  children,
  ...rest
}: React.PropsWithChildren<Partial<select.Props>>) {
  const service = useMachine(select.machine, { id: useId(), ...rest });
  const api = select.connect(service, normalizeProps);

  return (
    <SelectContext.Provider value={api}>
      <div {...api.getRootProps()}>{children}</div>
    </SelectContext.Provider>
  );
}

function SelectControl({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  const api = useSelectContext();

  return (
    <div {...api.getControlProps()} className={twMerge(["relative", className])}>
      {children}
    </div>
  );
}

function SelectTrigger({
  className,
  placeholder = "Select option...",
}: {
  className?: string;
  placeholder?: string;
}) {
  const api = useSelectContext();

  return (
    <Button
      {...api.getTriggerProps()}
      className={twMerge(["w-full min-w-55 px-0 [&>span]:justify-start px-8", className])}
    >
      {api.valueAsString || placeholder}
      <span
        {...api.getIndicatorProps()}
        className="ms-auto transition-transform group-data-[state=open]:rotate-180"
      >
        <ChevronDown className="size-4" />
      </span>
    </Button>
  );
}

function SelectPositioner({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  const api = useSelectContext();

  return (
    <Portal>
      <div {...api.getPositionerProps()} className={className}>
        {children}
      </div>
    </Portal>
  );
}

function SelectContent({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  const api = useSelectContext();
  const { present, ref } = usePresence(api.open);

  return (
    <div
      {...api.getContentProps()}
      ref={ref}
      hidden={!present}
      className={twMerge([
        "group relative min-w-(--reference-width) px-6 py-7 outline-none mt-1.5",
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
      <div className="relative flex flex-col gap-2.5">{children}</div>
    </div>
  );
}

function SelectItemGroup({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  const api = useSelectContext();

  return (
    <div {...api.getItemGroupProps({ id: "group" })} className={className}>
      {children}
    </div>
  );
}

function SelectItem({
  children,
  className,
  item,
}: React.PropsWithChildren<{ className?: string; item: select.CollectionItem }>) {
  const api = useSelectContext();

  return (
    <SelectItemContext.Provider value={item}>
      <div
        {...api.getItemProps({ item })}
        className={twMerge([
          "cursor-pointer flex items-center -mx-3 -my-0.5 px-3 py-0.5 border border-transparent hover:border-primary/30 hover:bg-primary/10 data-[highlighted]:border-primary/30 data-[highlighted]:bg-primary/10",
          className,
        ])}
      >
        {children}
      </div>
    </SelectItemContext.Provider>
  );
}

function SelectItemText({ children }: React.PropsWithChildren) {
  const api = useSelectContext();
  const item = useSelectItemContext();

  return <div {...api.getItemTextProps({ item })}>{children}</div>;
}

function SelectItemIndicator({ className }: { className?: string }) {
  const api = useSelectContext();
  const item = useSelectItemContext();

  return (
    <div {...api.getItemIndicatorProps({ item })} className={twMerge(["ms-auto", className])}>
      <Check className="size-3.5" />
    </div>
  );
}

export {
  SelectRoot,
  SelectControl,
  SelectTrigger,
  SelectPositioner,
  SelectContent,
  SelectItemGroup,
  SelectItem,
  SelectItemText,
  SelectItemIndicator,
};
