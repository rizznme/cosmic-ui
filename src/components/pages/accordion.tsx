import { MoveUpRight } from "lucide-react";
import {
  AccordionRoot,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Wrapper,
  Title,
  Subtitle,
  Menu,
  Preview,
  SectionTitle,
  SectionContent,
  InstallPackage,
  PreviewCode,
} from "@/components/docs";

function AccordionPage() {
  const data = [
    {
      title: "Product Information",
      content:
        "Our flagship product combines cutting-edge technology with sleek design. Built with premium materials, it offers unparalleled performance and reliability. Key features include advanced processing capabilities, and an intuitive user interface designed for both beginners and experts.",
    },
    {
      title: "Shipping Details",
      content:
        "Our flagship product combines cutting-edge technology with sleek design. Built with premium materials, it offers unparalleled performance and reliability. Key features include advanced processing capabilities, and an intuitive user interface designed for both beginners and experts.",
    },
    {
      title: "Return Policy",
      content:
        "Our flagship product combines cutting-edge technology with sleek design. Built with premium materials, it offers unparalleled performance and reliability. Key features include advanced processing capabilities, and an intuitive user interface designed for both beginners and experts.",
    },
  ];

  return (
    <>
      <Wrapper>
        <div className="flex flex-col gap-20">
          <div>
            <Title>Accordion</Title>
            <Subtitle>
              A vertically stacked set of interactive headings that each reveal
              a section of content.
            </Subtitle>
            <div className="flex gap-3 mt-5">
              <a
                className="pr-3 pl-3.5 py-0.5 border border-primary/20 bg-primary/10 flex items-center gap-2 text-sm"
                target="_blank"
                href="https://zagjs.com/components/react/accordion"
              >
                Docs <MoveUpRight className="stroke-1 size-3" />
              </a>
              <a
                className="pr-3 pl-3.5 py-0.5 border border-primary/20 bg-primary/10 flex items-center gap-2 text-sm"
                target="_blank"
                href="https://zagjs.com/components/react/accordion#api-reference"
              >
                Api Reference <MoveUpRight className="stroke-1 size-3" />
              </a>
            </div>
            <Preview>
              {() => ({
                preview: (
                  <>
                    <AccordionRoot
                      className="w-200"
                      defaultValue={[data[0].title]}
                    >
                      {data.map((item) => (
                        <AccordionItem key={item.title} value={item.title}>
                          <AccordionTrigger>{item.title}</AccordionTrigger>
                          <AccordionContent>{item.content}</AccordionContent>
                        </AccordionItem>
                      ))}
                    </AccordionRoot>
                  </>
                ),
                code: (
                  <PreviewCode>
                    {`
const data = [
  {
    title: "Product Information",
    content:
      "Our flagship product combines cutting-edge technology with sleek design. Built with premium materials, it offers unparalleled performance and reliability. Key features include advanced processing capabilities, and an intuitive user interface designed for both beginners and experts.",
  },
  {
    title: "Shipping Details",
    content:
      "Our flagship product combines cutting-edge technology with sleek design. Built with premium materials, it offers unparalleled performance and reliability. Key features include advanced processing capabilities, and an intuitive user interface designed for both beginners and experts.",
  },
  {
    title: "Return Policy",
    content:
      "Our flagship product combines cutting-edge technology with sleek design. Built with premium materials, it offers unparalleled performance and reliability. Key features include advanced processing capabilities, and an intuitive user interface designed for both beginners and experts.",
  },
];

<AccordionRoot className="w-200" defaultValue={[data[0].title]}>
  {data.map((item) => (
    <AccordionItem key={item.title} value={item.title}>
      <AccordionTrigger>{item.title}</AccordionTrigger>
      <AccordionContent>{item.content}</AccordionContent>
    </AccordionItem>
  ))}
</AccordionRoot>
                `}
                  </PreviewCode>
                ),
              })}
            </Preview>
          </div>
          <div id="installation">
            <SectionTitle>Installation</SectionTitle>
            <SectionContent>Install the following dependencies:</SectionContent>
            <InstallPackage>add @zag-js/accordion @zag-js/react</InstallPackage>
            <SectionContent>
              This component is built directly on the Zag.js state machine
              (not a wrapper). Unlike most other components in this library,
              it needs no Portal or presence hook, since closing an item has
              no exit animation, so Zag's own{" "}
              <span className="bg-foreground/15 px-1.5 py-px rounded-md">
                hidden
              </span>{" "}
              handling is enough. Copy and paste the following code into your
              project.
            </SectionContent>
            <PreviewCode title="components/ui/accordion.tsx">
              {`
import { createContext, useContext, useId } from "react";
import { twMerge } from "tailwind-merge";
import { useMachine, normalizeProps } from "@zag-js/react";
import * as accordion from "@zag-js/accordion";
import { Frame } from "@/components/ui/frame";
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
          paths={JSON.parse(
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
              `}
            </PreviewCode>
          </div>
        </div>
      </Wrapper>
      <Menu>
        <a className="hover:text-foreground py-1" href="#installation">
          Installation
        </a>
        <a className="hover:text-foreground py-1" href="#usage">
          Usage
        </a>
      </Menu>
    </>
  );
}

export { AccordionPage };
