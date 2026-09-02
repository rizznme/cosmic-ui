import { createContext, useContext, useId } from "react";
import { twMerge } from "tailwind-merge";
import { X } from "lucide-react";
import { useMachine, normalizeProps } from "@zag-js/react";
import * as dialogMachine from "@zag-js/dialog";
import { Button } from "@/components/ui/button";
import { Portal } from "@/components/ui/portal";
import { usePresence } from "@/components/ui/presence";

const SheetContext = createContext<ReturnType<typeof dialogMachine.connect> | null>(
  null
);

function useSheetContext() {
  const api = useContext(SheetContext);
  if (!api) throw new Error("Sheet parts must be used within <SheetRoot>");
  return api;
}

function SheetRoot({
  children,
  ...rest
}: React.PropsWithChildren<Partial<dialogMachine.Props>>) {
  const service = useMachine(dialogMachine.machine, { id: useId(), ...rest });
  const api = dialogMachine.connect(service, normalizeProps);

  return <SheetContext.Provider value={api}>{children}</SheetContext.Provider>;
}

function SheetTrigger({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  const api = useSheetContext();

  return (
    <Button {...api.getTriggerProps()} className={className}>
      {children}
    </Button>
  );
}

type SheetSide = "top" | "right" | "bottom" | "left";

// Each side needs its own edge, size, border, and slide direction - the rest
// of SheetContent's classes (positioning strategy, animation timing, surface)
// stay the same across all four.
const sideClasses: Record<SheetSide, string> = {
  right:
    "inset-y-0 right-0 h-full w-full max-w-sm border-l border-primary/30 data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right",
  left: "inset-y-0 left-0 h-full w-full max-w-sm border-r border-primary/30 data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left",
  top: "inset-x-0 top-0 w-full border-b border-primary/30 data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top",
  bottom:
    "inset-x-0 bottom-0 w-full border-t border-primary/30 data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom",
};

function SheetContent({
  children,
  className,
  side = "right",
}: React.PropsWithChildren<{ className?: string; side?: SheetSide }>) {
  const api = useSheetContext();
  const backdrop = usePresence(api.open);
  const content = usePresence(api.open);

  return (
    <Portal>
      <div
        {...api.getBackdropProps()}
        ref={backdrop.ref}
        hidden={!backdrop.present}
        className="fixed inset-0 bg-background/80 z-50 [&[data-state='open']]:animate-in [&[data-state='open']]:fade-in-0 [&[data-state='closed']]:animate-out [&[data-state='closed']]:fade-out-0"
      />
      <div {...api.getPositionerProps()}>
        <div
          {...api.getContentProps()}
          ref={content.ref}
          hidden={!content.present}
          className={twMerge([
            "outline-none fixed z-50 p-6 bg-background overflow-y-auto",
            "[&[data-state='open']]:animate-in [&[data-state='open']]:duration-300",
            "[&[data-state='closed']]:animate-out [&[data-state='closed']]:duration-250",
            sideClasses[side],
            className,
          ])}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
}

function SheetTitle({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  const api = useSheetContext();

  return (
    <div {...api.getTitleProps()} className={twMerge(["font-bold text-lg", className])}>
      {children}
    </div>
  );
}

function SheetDescription({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  const api = useSheetContext();

  return (
    <div {...api.getDescriptionProps()} className={twMerge(["opacity-80 py-2", className])}>
      {children}
    </div>
  );
}

function SheetCloseTrigger({ className }: { className?: string }) {
  const api = useSheetContext();

  return (
    <button
      {...api.getCloseTriggerProps()}
      className={twMerge([
        "absolute right-4 top-4 opacity-70 hover:opacity-100 cursor-pointer",
        className,
      ])}
    >
      <X className="size-4" />
    </button>
  );
}

export {
  SheetRoot,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetCloseTrigger,
};
