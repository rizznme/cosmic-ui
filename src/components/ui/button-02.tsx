import { twMerge } from "tailwind-merge";

function Button02({ className, children, ...props }: React.ComponentProps<"button">) {
  return (
    <button
      {...props}
      className={twMerge([
        "px-6 py-2.5 font-medium cursor-pointer border border-transparent text-foreground bg-transparent transition-colors",
        "hover:bg-foreground/10",
        "disabled:opacity-40 disabled:pointer-events-none",
        className,
      ])}
    >
      {children}
    </button>
  );
}

export { Button02 };
