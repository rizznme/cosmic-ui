import { useSyncExternalStore } from "react";
import { twMerge } from "tailwind-merge";
import { X } from "lucide-react";
import { getShowMenu, setShowMenu, subscribe } from "@/lib/mobile-menu-store";
import { FrameworkSwitcher } from "@/components/FrameworkSwitcher";

type DocLink = { href: string; label: string; end?: boolean; badge?: string };

const docLinks: { group: string; items: DocLink[] }[] = [
  {
    group: "Getting Started",
    items: [
      { href: "/docs", label: "Introduction", end: true },
      { href: "/docs/react/how-to-use", label: "How to Use" },
    ],
  },
  {
    group: "Components",
    items: [
      { href: "/docs/react/frame", label: "Frame" },
      { href: "/docs/react/menu", label: "Menu" },
      { href: "/docs/react/alert", label: "Alert" },
      { href: "/docs/react/accordion", label: "Accordion" },
      { href: "/docs/react/dialog", label: "Dialog" },
      { href: "/docs/react/tabs", label: "Tabs" },
      { href: "/docs/react/toast", label: "Toast", badge: "New" },
      { href: "/docs/react/button", label: "Button" },
      { href: "/docs/react/input", label: "Input" },
      { href: "/docs/react/switch", label: "Switch" },
      { href: "/docs/react/textarea", label: "Textarea" },
      { href: "/docs/react/radio-group", label: "Radio Group" },
      { href: "/docs/react/checkbox", label: "Checkbox" },
      { href: "/docs/react/chart", label: "Chart" },
      { href: "/docs/react/combobox", label: "Combobox" },
      { href: "/docs/react/select", label: "Select", badge: "New" },
    ],
  },
];

function isActive(currentPath: string, href: string, end?: boolean) {
  if (end) return currentPath === href;
  return currentPath === href || currentPath.startsWith(href + "/");
}

export function Sidebar({ currentPath }: { currentPath: string }) {
  const showMenu = useSyncExternalStore(subscribe, getShowMenu, () => false);
  const desktopVisible = currentPath.startsWith("/docs");

  return (
    <div className={desktopVisible ? undefined : "lg:hidden"}>
      <div
        className={twMerge([
          "before:fixed before:absolute before:w-screen before:left-0 before:top-0 before:h-screen before:bg-background/5 before:backdrop-blur before:z-[-1]",
          "after:fixed after:absolute after:inset-0 after:bg-background/80 after:border-r after:border-primary/30 lg:after:backdrop-none after:z-[-1]",
          "pt-10 top-0 left-0 fixed flex flex-col gap-10 text-foreground/50 w-70 lg:w-[25%] xl:w-[15%] lg:top-30 bottom-0 lg:pt-0 lg:pt-10 pl-10 z-60 -ml-[100%] transition-[margin] lg:left-auto lg:ml-0 before:hidden after:hidden [&.active]:ml-0 [&.active]:after:block [&.active]:before:block [&.active]:lg:before:hidden [&.active]:lg:after:hidden",
          showMenu && "active",
        ])}
      >
        <div
          onClick={() => setShowMenu(false)}
          className="absolute top-0 right-0 -mr-14 mt-8 cursor-pointer text-foreground lg:hidden"
        >
          <X className="size-6" />
        </div>
        <FrameworkSwitcher currentPath={currentPath} />
        {docLinks.map((group) => (
          <div className="flex flex-col" key={group.group}>
            <div className="font-medium text-foreground mb-2">{group.group}</div>
            {group.items.map((item) => (
              <a
                key={item.href}
                onClick={() => setShowMenu(false)}
                href={item.href}
                className={twMerge([
                  "hover:text-foreground py-1",
                  isActive(currentPath, item.href, item.end) && "text-foreground",
                ])}
              >
                {item.label}
                {item.badge && (
                  <span className="px-2 py-px border border-primary/30 bg-primary/10 text-sm ms-2">
                    {item.badge}
                  </span>
                )}
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
