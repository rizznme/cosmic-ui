import * as tabs from "@zag-js/tabs";
import { twMerge } from "tailwind-merge";
import { useMachine, normalizeProps } from "@zag-js/react";
import {
  SquareChevronRight,
  Clipboard,
  FileScan,
  ArrowDown,
  Check,
} from "lucide-react";
import { useId, useEffect, useRef, useState } from "react";

function Wrapper({ children }: React.PropsWithChildren) {
  return (
    <div className="p-7 sm:p-10 lg:px-20 lg:py-14 sm:mx-10 lg:ml-0 xl:mr-0 col-span-10 xl:col-span-8 border border-primary/20 bg-primary/5">
      {children}
    </div>
  );
}

function Menu({ children }: React.PropsWithChildren) {
  return (
    <div className="hidden xl:block pl-14 col-span-2 text-foreground/50">
      <div className="flex flex-col lg:mt-10 pt-10 lg:pt-0 sticky top-40">
        <div className="font-medium text-foreground/70 mb-2">On This Page</div>
        {children}
      </div>
    </div>
  );
}

function Title({ children }: React.PropsWithChildren) {
  return (
    <h2 className="font-orbitron text-2xl text-shadow-lg text-shadow-primary/50 font-bold">
      {children}
    </h2>
  );
}

function Subtitle({ children }: React.PropsWithChildren) {
  return <div className="mt-2 text-lg opacity-50">{children}</div>;
}

function SectionTitle({ children }: React.PropsWithChildren) {
  return <div className="text-2xl font-medium">{children}</div>;
}

function SectionContent({ className, children }: React.ComponentProps<"p">) {
  return <p className={twMerge(["mt-2 opacity-70", className])}>{children}</p>;
}

function InstallPackage({ children }: React.PropsWithChildren) {
  const [packageManager, setPackageManager] = useState("yarn");
  const [copied, setCopied] = useState(false);
  const commandRef = useRef<HTMLDivElement>(null);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      // Cleanup timeout on unmount
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    };
  }, []);

  const handleCopy = () => {
    const codeElement = commandRef.current;
    if (!codeElement) return;

    const text = codeElement.textContent || "";
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);

      // Reset icon after 3 seconds
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = setTimeout(() => {
        setCopied(false);
      }, 3000);
    });
  };

  return (
    <div className="mt-8 mb-10 border bg-primary/5 border-primary/20 shadow-lg shadow-primary/10">
      <div className="flex items-center py-2 px-5 gap-5">
        <SquareChevronRight className="stroke-1 size-5 fill-foreground/10" />
        <div className="flex items-center w-full gap-2">
          <div
            onClick={() => setPackageManager("pnpm")}
            className={twMerge([
              "cursor-pointer px-3.5 py-1 [&.active]:border [&.active]:border-primary/20 [&.active]:bg-primary/10",
              packageManager == "pnpm" && "active",
            ])}
          >
            pnpm
          </div>
          <div
            onClick={() => setPackageManager("npm")}
            className={twMerge([
              "cursor-pointer px-3.5 py-1 [&.active]:border [&.active]:border-primary/20 [&.active]:bg-primary/10",
              packageManager == "npm" && "active",
            ])}
          >
            npm
          </div>
          <div
            onClick={() => setPackageManager("yarn")}
            className={twMerge([
              "cursor-pointer px-3.5 py-1 [&.active]:border [&.active]:border-primary/20 [&.active]:bg-primary/10",
              packageManager == "yarn" && "active",
            ])}
          >
            yarn
          </div>
          <div
            onClick={() => setPackageManager("bun")}
            className={twMerge([
              "cursor-pointer px-3.5 py-1 [&.active]:border [&.active]:border-primary/20 [&.active]:bg-primary/10",
              packageManager == "bun" && "active",
            ])}
          >
            bun
          </div>
          {copied ? (
            <Check className="ms-auto cursor-pointer size-5 stroke-1 fill-foreground/10" />
          ) : (
            <Clipboard
              onClick={handleCopy}
              className="ms-auto cursor-pointer size-5 stroke-1 fill-foreground/10"
            />
          )}
        </div>
      </div>
      <div ref={commandRef} className="p-5 border-t border-primary/20">
        {packageManager}{" "}
        {packageManager == "npm"
          ? children?.toString().replace("add", "install")
          : children}
      </div>
    </div>
  );
}

function Preview({
  children,
}: {
  children: () => {
    preview: React.ReactElement;
    code: React.ReactElement;
  };
}) {
  const service = useMachine(tabs.machine, {
    id: useId(),
    defaultValue: "preview",
  });
  const api = tabs.connect(service, normalizeProps);
  const Preview = children().preview;
  const Code = children().code;

  return (
    <>
      <div className="mt-10" {...api.getRootProps()}>
        <div className="flex text-lg px-3" {...api.getListProps()}>
          <button
            {...api.getTriggerProps({ value: "preview" })}
            className="px-2.5 opacity-70 cursor-pointer data-[selected]:opacity-100"
          >
            Preview
          </button>
          <button
            {...api.getTriggerProps({ value: "code" })}
            className="px-2.5 opacity-70 cursor-pointer data-[selected]:opacity-100"
          >
            Code
          </button>
        </div>
        <div
          {...api.getContentProps({ value: "preview" })}
          className="mt-4 backdrop-blur-md font-orbitron text-sm border bg-primary/5 border-primary/20 shadow-lg shadow-primary/10 min-h-100 flex items-center justify-center px-5 py-8 sm:p-8 lg:py-50 lg:px-20"
        >
          {Preview}
        </div>
        <div {...api.getContentProps({ value: "code" })} className="-mt-4">
          {Code}
        </div>
      </div>
    </>
  );
}

function PreviewCode({
  children,
  title = "",
}: React.PropsWithChildren & {
  title?: string;
}) {
  const [expand, setExpand] = useState(false);
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLDivElement>(null);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (codeRef.current) {
      if (codeRef.current.offsetHeight < 300) {
        setExpand(true);
      }
    }
    return () => {
      // Cleanup timeout on unmount
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    };
  }, []);

  const handleCopy = () => {
    const codeElement = codeRef.current?.querySelector("code");
    if (!codeElement) return;

    const text = codeElement.textContent || "";
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);

      // Reset icon after 3 seconds
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = setTimeout(() => {
        setCopied(false);
      }, 3000);
    });
  };

  return (
    <div className="mt-8 mb-10 border bg-primary/5 border-primary/20 shadow-lg shadow-primary/10 relative">
      <div className="flex items-center py-2 px-5 gap-5">
        {title && <FileScan className="stroke-1 size-5 fill-foreground/10" />}
        <div className="flex items-center w-full gap-2">
          <div>{title}</div>
          <div
            onClick={() => setExpand(!expand)}
            className={twMerge([
              "ms-auto mr-2 cursor-pointer px-3.5 py-1 relative after:w-px after:h-5 after:inset-y-0 after:my-auto after:bg-primary/20 after:right-0 after:absolute",
              codeRef.current &&
                codeRef.current.offsetHeight < 300 &&
                "opacity-0",
            ])}
          >
            {expand ? "Collapse" : "Expand"}
          </div>
          {copied ? (
            <Check
              className={twMerge([
                "cursor-pointer size-5 stroke-1 fill-foreground/10",
                !title && "mt-1",
              ])}
            />
          ) : (
            <Clipboard
              onClick={handleCopy}
              className={twMerge([
                "cursor-pointer size-5 stroke-1 fill-foreground/10",
                !title && "mt-1",
              ])}
            />
          )}
        </div>
      </div>
      <div
        className={twMerge([
          "max-h-100 text-sm px-5 border-t border-primary/20 overflow-x-auto overflow-y-hidden before:h-80 before:absolute before:bg-gradient-to-b before:from-transparent before:to-background/80 before:inset-x-0 before:bottom-0",
          expand && "max-h-auto before:hidden",
          !title && "-mt-13 border-0",
        ])}
        ref={codeRef}
      >
        <pre>
          <code>{children}</code>
        </pre>
        {!expand && (
          <div
            onClick={() => setExpand(true)}
            className="absolute bottom-0 inset-x-0 mx-auto w-26 mb-8 py-0.5 cursor-pointer border border-primary/50 bg-primary/20 flex items-center justify-center gap-2 text-base backdrop-blur"
          >
            <ArrowDown className="size-4" /> Expand
          </div>
        )}
      </div>
    </div>
  );
}

export {
  Wrapper,
  Menu,
  Title,
  Subtitle,
  Preview,
  SectionTitle,
  SectionContent,
  InstallPackage,
  PreviewCode,
};
