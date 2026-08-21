import { createContext, useContext, useId } from "react";
import { twMerge } from "tailwind-merge";
import { useMachine, normalizeProps } from "@zag-js/react";
import * as menu from "@zag-js/menu";
import { Frame } from "@/components/ui/frame";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Portal } from "@/components/ui/portal";
import { usePresence } from "@/components/ui/presence";

const MenuContext = createContext<ReturnType<typeof menu.connect> | null>(null);

function useMenuContext() {
  const api = useContext(MenuContext);
  if (!api) throw new Error("Menu parts must be used within <MenuRoot>");
  return api;
}

function MenuRoot({
  children,
  ...rest
}: React.PropsWithChildren<Partial<menu.Props>>) {
  const service = useMachine(menu.machine, { id: useId(), ...rest });
  const api = menu.connect(service, normalizeProps);

  return <MenuContext.Provider value={api}>{children}</MenuContext.Provider>;
}

function MenuTrigger({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  const api = useMenuContext();

  return (
    <Button
      {...api.getTriggerProps()}
      className={twMerge([
        "data-[state=open]:drop-shadow-[0_0px_20px_var(--color-primary)]",
        className,
      ])}
    >
      {children}
      <span
        {...api.getIndicatorProps()}
        className="ms-auto transition-transform group-data-[state=open]:rotate-180"
      >
        <ChevronDown className="size-4" />
      </span>
    </Button>
  );
}

function MenuPositioner({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  const api = useMenuContext();

  return (
    <Portal>
      <div {...api.getPositionerProps()} className={className}>
        {children}
      </div>
    </Portal>
  );
}

function MenuContent({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  const api = useMenuContext();
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
          paths={JSON.parse(
            '[{"show":false,"style":{"strokeWidth":"1","stroke":"var(--color-frame-1-stroke)","fill":"var(--color-frame-1-fill)"},"path":[["M","14","6"],["L","50% - 7","6"],["L","50% - 2","0"],["L","50% + 4","0"],["L","50% + 9","6"],["L","100% - 13","6"],["L","100% + 0","19"],["L","100% + 0","100% - 26"],["L","100% - 13","100% - 12"],["L","50% + 13","100% - 12"],["L","50% - 0","100% + 0"],["L","0% + 14","100% + 0"],["L","0% + 0","100% - 13"],["L","0","0% + 19"],["L","14","6"]]},{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-2-stroke)","fill":"var(--color-frame-2-fill)"},"path":[["M","50% + 16","100% - 8"],["L","50% + 25","100% - 8"],["L","50% + 18","100% - 2"],["L","50% + 9","100% - 2"],["L","50% + 16","100% - 8"]]},{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-3-stroke)","fill":"var(--color-frame-3-fill)"},"path":[["M","50% + 30","100% - 8"],["L","50% + 37","100% - 8"],["L","50% + 32","100% - 3"],["L","50% + 25","100% - 3"],["L","50% + 30","100% - 8"]]},{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-4-stroke)","fill":"var(--color-frame-4-fill)"},"path":[["M","50% + 42","100% - 8"],["L","50% + 48","100% - 8"],["L","50% + 44","100% - 4"],["L","50% + 38","100% - 4"],["L","50% + 42","100% - 8"]]}]'
          )}
          enableBackdropBlur={true}
        />
      </div>
      <div className="relative flex flex-col gap-2.5">{children}</div>
    </div>
  );
}

function MenuItem({
  children,
  className,
  value,
}: React.PropsWithChildren<{ className?: string; value: string }>) {
  const api = useMenuContext();

  return (
    <div
      {...api.getItemProps({ value })}
      className={twMerge([
        "cursor-pointer flex items-center -mx-3 -my-0.5 px-3 py-0.5 border border-transparent hover:border-primary/30 hover:bg-primary/10 data-[highlighted]:border-primary/30 data-[highlighted]:bg-primary/10",
        className,
      ])}
    >
      {children}
    </div>
  );
}

export { MenuRoot, MenuTrigger, MenuPositioner, MenuContent, MenuItem };
