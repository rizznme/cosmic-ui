import { Button } from "@/components/ui/button";
import { Frame, parsePaths } from "@/components/ui/frame";
import { X } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { useState, useContext, createContext } from "react";
import { usePresence } from "@/components/ui/presence";

const PresentContext = createContext<{
  present: boolean;
  setPresent: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

function AlertRoot({
  className,
  children,
  ...rest
}: React.ComponentProps<"div">) {
  const [present, setPresent] = useState(true);
  const { present: mounted, ref } = usePresence(present);

  return (
    <PresentContext.Provider
      value={{
        present,
        setPresent,
      }}
    >
      <div
        ref={ref}
        hidden={!mounted}
        data-state={present ? "open" : "closed"}
        className={twMerge([
          "relative px-10 pt-8 pb-6.5 w-full [&>svg]:drop-shadow-[0_0px_20px_var(--color-primary)]",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:duration-200",
          "[--color-frame-1-stroke:var(--color-primary)]",
          "[--color-frame-1-fill:var(--color-primary)]/20",
          "[--color-frame-2-stroke:var(--color-primary)]",
          "[--color-frame-2-fill:transparent]",
          "[--color-frame-3-stroke:var(--color-accent)]",
          "[--color-frame-3-fill:var(--color-accent)]/50",
          className,
        ])}
        {...rest}
      >
        <Frame
          paths={parsePaths(
            '[{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-1-stroke)","fill":"var(--color-frame-1-fill)"},"path":[["M","0% + 34","7"],["L","0% + 79.5","7"],["L","0% + 96.5","13"],["L","100% - 21.5","13"],["L","100% + 0","34"],["L","100% - 13","100% - 15"],["L","100% - 26","100% - 6"],["L","0% + 11.5","100% - 6"],["L","0","100% - 18"],["L","13","0% + 28"],["L","34","7"]]},{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-2-stroke)","fill":"var(--color-frame-2-fill)"},"path":[["M","18","100% - 6"],["L","100% - 33.5","100% - 6"],["L","100% - 39.5","100% - 0"],["L","24","100% + 0"],["L","18","100% - 6"]]},{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-3-stroke)","fill":"var(--color-frame-3-fill)"},"path":[["M","17","7"],["L","0% + 26.5","7"],["L","0% + 12.5","0% + 20"],["L","13","0% + 11"],["L","17","7"]]}]'
          )}
        />
        {children}
      </div>
    </PresentContext.Provider>
  );
}

function AlertTitle({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={twMerge([
        "flex items-center text-shadow-lg text-shadow-primary font-bold w-full relative",
        className,
      ])}
      {...props}
    >
      {children}
    </div>
  );
}

function AlertDescription({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={twMerge(["relative pt-2 opacity-80", className])}
      {...props}
    >
      {children}
    </div>
  );
}

function AlertCloseTrigger({
  className,
  ...props
}: React.ComponentProps<"button">) {
  const context = useContext(PresentContext);

  return (
    <Button
      shape="flat"
      variant="accent"
      className={twMerge([
        "absolute -right-1 top-2 px-5 py-1.5 transform scale-x-[-1]",
        "[--color-frame-1-fill:var(--color-accent)]/70",
      ])}
      {...props}
      onClick={() => context?.setPresent(false)}
    >
      <X className="size-4" />
    </Button>
  );
}

export { AlertRoot, AlertTitle, AlertDescription, AlertCloseTrigger };
