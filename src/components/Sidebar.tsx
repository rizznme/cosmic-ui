import { useState, useSyncExternalStore } from "react";
import { twMerge } from "tailwind-merge";
import { ChevronRight, Search, X } from "lucide-react";
import { getShowMenu, setShowMenu, subscribe } from "@/lib/mobile-menu-store";
import { setSearchOpen } from "@/lib/search-palette-store";
import { FrameworkSwitcher } from "@/components/FrameworkSwitcher";
import {
  frameworkFromPath,
  getFramework,
  getServerFramework,
  subscribe as subscribeFramework,
} from "@/lib/framework-store";

export type DocLink = {
  slug: string;
  label: string;
  end?: boolean;
  badge?: string;
  absolute?: true;
  comingSoon?: boolean;
  /**
   * The name to pass to `cosmic-ui-cli add`, when it differs from the page
   * slug. Calendar/Datepicker/Daterangepicker are three pages sharing one
   * registry item (`date-picker.tsx`), so their install command has to name
   * that shared file, not their own page slug - see each of their docs pages'
   * `<InstallCommand component="date-picker" />`.
   */
  installName?: string;
  /** Nested variants shown under this item, expand/collapse in the sidebar. */
  children?: DocLink[];
};

export const docLinks: { group: string; items: DocLink[] }[] = [
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
      { slug: "toast", label: "Toast" },
      {
        slug: "button",
        label: "Button",
        children: [
          { slug: "button-01", label: "Outline" },
          { slug: "button-02", label: "Ghost" },
          { slug: "button-03", label: "Solid" },
        ],
      },
      { slug: "input", label: "Input" },
      { slug: "switch", label: "Switch" },
      { slug: "textarea", label: "Textarea" },
      { slug: "radio-group", label: "Radio Group" },
      { slug: "checkbox", label: "Checkbox" },
      { slug: "chart", label: "Chart" },
      { slug: "combobox", label: "Combobox" },
      { slug: "select", label: "Select" },
      { slug: "alert-dialog", label: "Alert Dialog" },
      { slug: "avatar", label: "Avatar" },
      { slug: "breadcrumb", label: "Breadcrumb" },
      { slug: "button-group", label: "Button Group" },
      { slug: "calendar", label: "Calendar", installName: "date-picker" },
      { slug: "datepicker", label: "Datepicker", installName: "date-picker" },
      {
        slug: "daterangepicker",
        label: "Daterangepicker",
        installName: "date-picker",
      },
      { slug: "sheet", label: "Sheet" },
      { slug: "number-input", label: "Number Input" },
      { slug: "pagination", label: "Pagination" },
      { slug: "table", label: "Table" },
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

  const [expanded, setExpanded] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    for (const group of docLinks) {
      for (const item of group.items) {
        if (!item.children) continue;
        const isChildActive = item.children.some((child) => {
          const href = child.absolute ? child.slug : `/docs/${framework}/${child.slug}`;
          return isActive(currentPath, href, child.end);
        });
        if (isChildActive) initial.add(item.slug);
      }
    }
    return initial;
  });

  function toggleExpanded(slug: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  }

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
        <button
          type="button"
          onClick={() => {
            setShowMenu(false);
            setSearchOpen(true);
          }}
          className="flex items-center gap-2 text-left hover:text-foreground cursor-pointer lg:hidden"
        >
          <Search className="size-4" />
          Search docs...
        </button>
        {/* flex-1 + min-h-0 let this shrink inside the fixed-height column
            above instead of pushing past it, so it scrolls on its own while
            the framework switcher and search button stay put. */}
        <div className="flex flex-col gap-10 overflow-y-auto flex-1 min-h-0 pr-6 pt-1 pb-14 mask-t-from-[calc(100%-2rem)] mask-t-to-100% mask-b-from-[calc(100%-2rem)] mask-b-to-100%">
          {docLinks.map((group) => (
            <div className="flex flex-col" key={group.group}>
              <div className="font-medium text-foreground mb-2">{group.group}</div>
              {group.items.map((item) => {
                if (item.comingSoon) {
                  return (
                    <span key={item.slug} className="py-1 text-foreground/30 cursor-default">
                      {item.label}
                      <span className="px-2 py-px border border-foreground/20 text-sm ms-2">
                        Soon
                      </span>
                    </span>
                  );
                }
                const href = item.absolute ? item.slug : `/docs/${framework}/${item.slug}`;
                const isOpen = expanded.has(item.slug);
                return (
                  <div key={item.slug} className="flex flex-col">
                    <div className="flex items-center">
                      <a
                        onClick={() => setShowMenu(false)}
                        href={href}
                        className={twMerge([
                          "flex-1 hover:text-foreground py-1",
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
                      {item.children && (
                        <button
                          type="button"
                          onClick={() => toggleExpanded(item.slug)}
                          className="p-1 -mr-1 text-foreground/40 hover:text-foreground cursor-pointer"
                          aria-label={isOpen ? `Collapse ${item.label}` : `Expand ${item.label}`}
                        >
                          <ChevronRight
                            className={twMerge(["size-3.5 transition-transform", isOpen && "rotate-90"])}
                          />
                        </button>
                      )}
                    </div>
                    {item.children && isOpen && (
                      <div className="flex flex-col ml-3 border-l border-foreground/15 pl-3">
                        {item.children.map((child) => {
                          const childHref = child.absolute
                            ? child.slug
                            : `/docs/${framework}/${child.slug}`;
                          return (
                            <a
                              key={child.slug}
                              onClick={() => setShowMenu(false)}
                              href={childHref}
                              className={twMerge([
                                "hover:text-foreground py-1",
                                isActive(currentPath, childHref, child.end) && "text-foreground",
                              ])}
                            >
                              {child.label}
                            </a>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
