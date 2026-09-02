import { twMerge } from "tailwind-merge";

function Button01({ className, children, ...props }: React.ComponentProps<"button">) {
  return (
    <button
      {...props}
      className={twMerge([
        "px-6 py-2.5 font-medium cursor-pointer border border-primary text-primary bg-transparent transition-colors",
        "hover:bg-primary hover:text-primary-foreground",
        "disabled:opacity-40 disabled:pointer-events-none",
        className,
      ])}
    >
      {children}
    </button>
  );
}

export { Button01 };
