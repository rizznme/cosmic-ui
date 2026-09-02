import { useId } from "react";
import { twMerge } from "tailwind-merge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMachine, normalizeProps } from "@zag-js/react";
import * as paginationMachine from "@zag-js/pagination";

function Pagination({
  className,
  ...rest
}: Partial<paginationMachine.Props> & { className?: string }) {
  const service = useMachine(paginationMachine.machine, { id: useId(), ...rest });
  const api = paginationMachine.connect(service, normalizeProps);

  return (
    <div {...api.getRootProps()} className={twMerge(["flex items-center gap-1.5", className])}>
      <button
        {...api.getPrevTriggerProps()}
        className="size-8 flex items-center justify-center border border-primary/30 hover:bg-primary/10 disabled:opacity-30 disabled:pointer-events-none"
      >
        <ChevronLeft className="size-4" />
      </button>
      {api.pages.map((page, i) =>
        page.type === "page" ? (
          <button
            key={i}
            {...api.getItemProps(page)}
            className="size-8 border border-primary/30 hover:bg-primary/10 data-[selected]:bg-primary/20 data-[selected]:border-primary"
          >
            {page.value}
          </button>
        ) : (
          <span
            key={i}
            {...api.getEllipsisProps({ index: i })}
            className="size-8 flex items-center justify-center"
          >
            &#8230;
          </span>
        )
      )}
      <button
        {...api.getNextTriggerProps()}
        className="size-8 flex items-center justify-center border border-primary/30 hover:bg-primary/10 disabled:opacity-30 disabled:pointer-events-none"
      >
        <ChevronRight className="size-4" />
      </button>
    </div>
  );
}

export { Pagination };
