import { twMerge } from "tailwind-merge";

function ButtonGroup({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div
      role="group"
      className={twMerge(["inline-flex divide-x divide-primary/30 border border-primary/30", className])}
    >
      {children}
    </div>
  );
}

function ButtonGroupItem({
  children,
  className,
  ...rest
}: React.ComponentProps<"button">) {
  return (
    <button
      {...rest}
      className={twMerge([
        "px-4 py-2 hover:bg-primary/10 disabled:opacity-30 disabled:pointer-events-none",
        className,
      ])}
    >
      {children}
    </button>
  );
}

export { ButtonGroup, ButtonGroupItem };
