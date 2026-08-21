import { Frame } from "@/components/ui/frame";
import { twMerge } from "tailwind-merge";

function Input({
  className,
  children,
  variant = "lifted",
  type,
  ...props
}: React.ComponentProps<"input"> & {
  variant?: "flat" | "lifted" | "simple";
}) {
  return (
    <div
      className={twMerge([
        "relative",
        "[--color-frame-1-stroke:var(--color-primary)]/70",
        "[--color-frame-1-fill:var(--color-primary)]/10",
        "[--color-frame-2-stroke:transparent]",
        "[--color-frame-2-fill:transparent]",
      ])}
    >
      <div className="absolute inset-0 -mb-2 [&>svg]:drop-shadow-[0_0px_20px_var(--color-primary)]">
        <Frame
          paths={JSON.parse(
            '[{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-1-stroke)","fill":"var(--color-frame-1-fill)"},"path":[["M","17","0"],["L","100% - 7","0"],["L","100% + 0","0% + 9.5"],["L","100% - 18","100% - 6"],["L","4","100% - 6"],["L","0","100% - 15"],["L","17","0"]]},{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-2-stroke)","fill":"var(--color-frame-2-fill)"},"path":[["M","9","100% - 6"],["L","100% - 22","100% - 6"],["L","100% - 25","100% + 0"],["L","12","100% + 0"],["L","9","100% - 6"]]}]'
          )}
        />
      </div>
      <input
        type={type}
        className="w-full outline-none px-8 py-2 relative placeholder:text-foreground/70"
        {...props}
      />
    </div>
  );
}

export { Input };
