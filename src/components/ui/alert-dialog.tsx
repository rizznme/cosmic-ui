import { createContext, useContext, useId } from "react";
import { twMerge } from "tailwind-merge";
import { useMachine, normalizeProps } from "@zag-js/react";
import * as dialogMachine from "@zag-js/dialog";
import { Button } from "@/components/ui/button";
import { Portal } from "@/components/ui/portal";
import { usePresence } from "@/components/ui/presence";

const AlertDialogContext = createContext<ReturnType<typeof dialogMachine.connect> | null>(
  null
);

function useAlertDialogContext() {
  const api = useContext(AlertDialogContext);
  if (!api) throw new Error("AlertDialog parts must be used within <AlertDialogRoot>");
  return api;
}

function AlertDialogRoot({
  children,
  ...rest
}: React.PropsWithChildren<Partial<dialogMachine.Props>>) {
  const service = useMachine(dialogMachine.machine, {
    id: useId(),
    role: "alertdialog",
    // An alert dialog demands an explicit choice - dismissing it by clicking
    // outside or pressing Escape would let the user skip that choice.
    closeOnInteractOutside: false,
    closeOnEscape: false,
    ...rest,
  });
  const api = dialogMachine.connect(service, normalizeProps);

  return <AlertDialogContext.Provider value={api}>{children}</AlertDialogContext.Provider>;
}

function AlertDialogTrigger({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  const api = useAlertDialogContext();

  return (
    <Button {...api.getTriggerProps()} className={className}>
      {children}
    </Button>
  );
}

function AlertDialogContent({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  const api = useAlertDialogContext();
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
            "outline-none fixed top-[50%] left-[50%] z-50 w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] sm:max-w-lg p-6 border border-primary/30 bg-background",
            "[&[data-state='open']]:animate-in [&[data-state='open']]:fade-in-0 [&[data-state='open']]:zoom-in-80 [&[data-state='open']]:duration-250",
            "[&[data-state='closed']]:animate-out [&[data-state='closed']]:fade-out-0 [&[data-state='closed']]:zoom-out-80 [&[data-state='closed']]:duration-400",
            className,
          ])}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
}

function AlertDialogTitle({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  const api = useAlertDialogContext();

  return (
    <div {...api.getTitleProps()} className={twMerge(["font-bold text-lg", className])}>
      {children}
    </div>
  );
}

function AlertDialogDescription({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  const api = useAlertDialogContext();

  return (
    <div {...api.getDescriptionProps()} className={twMerge(["opacity-80 py-2", className])}>
      {children}
    </div>
  );
}

function AlertDialogCancel({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  const api = useAlertDialogContext();

  return (
    <Button shape="flat" {...api.getCloseTriggerProps()} className={className}>
      {children}
    </Button>
  );
}

function AlertDialogAction({
  children,
  className,
  onClick,
}: React.PropsWithChildren<{
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}>) {
  const api = useAlertDialogContext();
  const triggerProps = api.getCloseTriggerProps();

  return (
    <Button
      variant="destructive"
      {...triggerProps}
      // The consumer's handler runs first (it does the actual delete/confirm
      // action); triggerProps.onClick then closes the dialog, unless that
      // handler called event.preventDefault() to keep it open.
      onClick={(event) => {
        onClick?.(event);
        triggerProps.onClick?.(event);
      }}
      className={className}
    >
      {children}
    </Button>
  );
}

export {
  AlertDialogRoot,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
};
