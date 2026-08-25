import { createContext, useContext, useId } from "react";
import { twMerge } from "tailwind-merge";
import { useMachine, normalizeProps } from "@zag-js/react";
import * as accordion from "@zag-js/accordion";
import { Frame, parsePaths } from "@/components/ui/frame";
import { ChevronDown, FilePenLine } from "lucide-react";

const AccordionContext = createContext<ReturnType<typeof accordion.connect> | null>(
  null
);
const AccordionItemContext = createContext<{ value: string } | null>(null);

function useAccordionContext() {
  const api = useContext(AccordionContext);
  if (!api) throw new Error("Accordion parts must be used within <AccordionRoot>");
  return api;
}

function useAccordionItemContext() {
  const item = useContext(AccordionItemContext);
  if (!item) throw new Error("AccordionItem parts must be used within <AccordionItem>");
  return item;
}

function AccordionRoot({
  children,
  className,
  ...rest
}: React.PropsWithChildren<Partial<accordion.Props> & { className?: string }>) {
  const service = useMachine(accordion.machine, {
    id: useId(),
    collapsible: true,
    ...rest,
  });
  const api = accordion.connect(service, normalizeProps);

  return (
    <AccordionContext.Provider value={api}>
      <div {...api.getRootProps()} className={twMerge(["flex flex-col gap-3", className])}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

function AccordionItem({
  children,
  className,
  value,
}: React.PropsWithChildren<{ className?: string; value: string }>) {
  const api = useAccordionContext();

  return (
    <AccordionItemContext.Provider value={{ value }}>
      <div
        {...api.getItemProps({ value })}
        className={twMerge([
          "relative px-6 pt-3 pb-5 data-[state=open]:drop-shadow-[0_0px_20px_var(--color-primary)]",
          "[--color-frame-1-stroke:var(--color-primary)]",
          "[--color-frame-1-fill:var(--color-primary)]/20",
          "[--color-frame-2-stroke:var(--color-primary)]",
          "[--color-frame-2-fill:transparent]",
          className,
        ])}
      >
        <Frame
          paths={parsePaths(
            '[{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-1-stroke)","fill":"var(--color-frame-1-fill)"},"path":[["M","15","0"],["L","100% - 0","0"],["L","100% - 0","100% - 7"],["L","0% + 0","100% - 7"],["L","0% + 0","0% + 15"],["L","15","0"]]},{"show":true,"style":{"strokeWidth":"1","stroke":"var(--color-frame-2-stroke)","fill":"var(--color-frame-2-fill)"},"path":[["M","7","100% - 7"],["L","100% - 8","100% - 7"],["L","100% - 14","100% + 0"],["L","12","100% + 0"],["L","7","100% - 7"]]}]'
          )}
        />
        <div className="relative">{children}</div>
      </div>
    </AccordionItemContext.Provider>
  );
}

function AccordionTrigger({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  const api = useAccordionContext();
  const { value } = useAccordionItemContext();

  return (
    <button
      {...api.getItemTriggerProps({ value })}
      className={twMerge([
        "flex items-center data-[state=open]:text-shadow-lg text-shadow-primary font-bold cursor-pointer w-full group py-2 -my-2 data-[state=open]:pt-3.5 transition-[padding] duration-100",
        className,
      ])}
    >
      <FilePenLine className="size-4.5 me-2.5" /> {children}
      <ChevronDown className="ms-auto size-4 group-data-[state=open]:rotate-180" />
    </button>
  );
}

function AccordionContent({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  const api = useAccordionContext();
  const { value } = useAccordionItemContext();

  return (
    <div
      {...api.getItemContentProps({ value })}
      className={twMerge([
        "py-2 mt-1 opacity-80 data-[state=open]:animate-in data-[state=open]:zoom-in-95 data-[state=open]:fade-in-0",
        className,
      ])}
    >
      {children}
    </div>
  );
}

export { AccordionRoot, AccordionItem, AccordionTrigger, AccordionContent };
