import { twMerge } from "tailwind-merge";

function Button03({ className, children, ...props }: React.ComponentProps<"button">) {
  return (
    <button
      {...props}
      className={twMerge([
        "px-6 py-2.5 font-medium cursor-pointer border border-primary bg-primary text-primary-foreground transition-colors",
        "hover:bg-primary/90",
        "disabled:opacity-40 disabled:pointer-events-none",
        className,
      ])}
    >
      {children}
    </button>
  );
}

export { Button03 };
