import { useSyncExternalStore } from "react";
import { twMerge } from "tailwind-merge";
import { X } from "lucide-react";
import { getShowMenu, setShowMenu, subscribe } from "@/lib/mobile-menu-store";
import { FrameworkSwitcher } from "@/components/FrameworkSwitcher";
import {
  frameworkFromPath,
  getFramework,
  getServerFramework,
  subscribe as subscribeFramework,
} from "@/lib/framework-store";

type DocLink = { slug: string; label: string; end?: boolean; badge?: string; absolute?: true };

const docLinks: { group: string; items: DocLink[] }[] = [
  {
    group: "Getting Started",
    items: [
      { slug: "/docs", label: "Introduction", end: true, absolute: true },
      { slug: "how-to-use", label: "How to Use" },
    ],
  },
  {
    group: "Components",
    items: [
      { slug: "frame", label: "Frame" },
      { slug: "menu", label: "Menu" },
      { slug: "alert", label: "Alert" },
      { slug: "accordion", label: "Accordion" },
      { slug: "dialog", label: "Dialog" },
      { slug: "tabs", label: "Tabs" },
      { slug: "toast", label: "Toast", badge: "New" },
      { slug: "button", label: "Button" },
      { slug: "input", label: "Input" },
      { slug: "switch", label: "Switch" },
      { slug: "textarea", label: "Textarea" },
      { slug: "radio-group", label: "Radio Group" },
      { slug: "checkbox", label: "Checkbox" },
      { slug: "chart", label: "Chart" },
      { slug: "combobox", label: "Combobox" },
      { slug: "select", label: "Select", badge: "New" },
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

  // A URL naming its framework explicitly wins (so links stay internally
  // consistent while browsing a specific framework's pages); otherwise fall
  // back to the persisted preference for framework-agnostic pages.
  const storedFramework = useSyncExternalStore(
    subscribeFramework,
    getFramework,
    getServerFramework
  );
  const framework = frameworkFromPath(currentPath) ?? storedFramework;

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
            {group.items.map((item) => {
              const href = item.absolute ? item.slug : `/docs/${framework}/${item.slug}`;
              return (
                <a
                  key={item.slug}
                  onClick={() => setShowMenu(false)}
                  href={href}
                  className={twMerge([
                    "hover:text-foreground py-1",
                    isActive(currentPath, href, item.end) && "text-foreground",
                  ])}
                >
                  {item.label}
                  {item.badge && (
                    <span className="px-2 py-px border border-primary/30 bg-primary/10 text-sm ms-2">
                      {item.badge}
                    </span>
                  )}
                </a>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
