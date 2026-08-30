import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { twMerge } from "tailwind-merge";
import { Search } from "lucide-react";
import { DialogRoot, DialogContent } from "@/components/ui/dialog";
import { getFramework, getServerFramework, subscribe as subscribeFramework } from "@/lib/framework-store";
import { getSearchOpen, setSearchOpen, subscribe as subscribeSearchOpen } from "@/lib/search-palette-store";

type PagefindResultData = {
  url: string;
  excerpt: string;
  meta: { title?: string };
  filters: Record<string, string[]>;
};

type PagefindApi = {
  init: () => Promise<void>;
  search: (query: string) => Promise<{ results: { id: string; data: () => Promise<PagefindResultData> }[] }>;
};

declare global {
  interface Window {
    pagefind?: PagefindApi;
  }
}

// Dev has no index, so the palette falls back to this: it still opens and shows
// its quick links instead of throwing on every keystroke.
const emptyPagefind: PagefindApi = {
  init: async () => {},
  search: async () => ({ results: [] }),
};

let pagefindPromise: Promise<PagefindApi> | null = null;
function loadPagefind(): Promise<PagefindApi> {
  if (!pagefindPromise) {
    // astro-pagefind only writes /pagefind/pagefind.js into the build output, so
    // the module exists in production only. The specifier has to stay in a
    // variable: written as a literal, Vite resolves it at transform time and
    // fails the whole module in dev, which 500s every docs page — /* @vite-ignore */
    // alone does not prevent that as of Vite 8.
    const url = "/pagefind/pagefind.js";
    pagefindPromise = import(/* @vite-ignore */ url)
      .then(async (mod: PagefindApi) => {
        await mod.init();
        return mod;
      })
      .catch(() => emptyPagefind);
  }
  return pagefindPromise;
}

type Result = { url: string; title: string; excerpt: string };

function SearchPalette() {
  const open = useSyncExternalStore(subscribeSearchOpen, getSearchOpen, () => false);
  const framework = useSyncExternalStore(subscribeFramework, getFramework, getServerFramework);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [highlighted, setHighlighted] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const requestId = useRef(0);

  useEffect(() => {
    if (open) loadPagefind();
  }, [open]);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setResults([]);
      setHighlighted(0);
    }
  }, [open]);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setResults([]);
      return;
    }
    const id = ++requestId.current;
    loadPagefind().then(async (pagefind) => {
      const search = await pagefind.search(trimmed);
      if (id !== requestId.current) return; // a newer keystroke already superseded this

      const data = await Promise.all(search.results.slice(0, 20).map((r) => r.data()));
      if (id !== requestId.current) return;

      // Pages without a "framework" filter (Introduction, Colors) are
      // framework-agnostic and always shown; framework-tagged pages are
      // scoped to whichever framework the visitor is currently browsing.
      const scoped = data.filter((d) => {
        const fw = d.filters.framework?.[0];
        return !fw || fw === framework;
      });

      setResults(
        scoped.slice(0, 8).map((d) => ({
          url: d.url,
          title: d.meta.title?.replace(/\s*\|\s*Cosmic UI$/, "") ?? d.url,
          excerpt: d.excerpt,
        }))
      );
      setHighlighted(0);
    });
  }, [query, framework]);

  function navigate(url: string) {
    setSearchOpen(false);
    window.location.href = url;
  }

  // Before the visitor has typed anything, show a few fixed jump-to links
  // instead of an empty list - both so the dialog isn't just a single input
  // row (the decorative frame is designed for a taller box, and looks
  // pinched at that height) and so there's actually something useful to
  // land on immediately after opening.
  const quickLinks: Result[] = [
    { url: `/docs/${framework}/how-to-use`, title: "How to Use", excerpt: "" },
    { url: `/docs/${framework}/button`, title: "Button", excerpt: "" },
    { url: `/docs/${framework}/dialog`, title: "Dialog", excerpt: "" },
    { url: `/docs/${framework}/tabs`, title: "Tabs", excerpt: "" },
  ];
  const showingQuickLinks = !query.trim();
  const activeList = showingQuickLinks ? quickLinks : results;

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((h) => Math.min(h + 1, activeList.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const r = activeList[highlighted];
      if (r) navigate(r.url);
    }
  }

  return (
    <DialogRoot
      open={open}
      onOpenChange={(d) => setSearchOpen(d.open)}
      initialFocusEl={() => inputRef.current}
    >
      <DialogContent className="sm:max-w-xl p-6 top-[20%] translate-y-0">
        <div className="flex items-center gap-3 border-b border-primary/20 pb-4">
          <Search className="size-4 opacity-60 shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search docs..."
            className="w-full bg-transparent outline-none placeholder:opacity-50"
          />
        </div>
        <div className="mt-3 pb-2 max-h-80 overflow-y-auto flex flex-col gap-1">
          {showingQuickLinks && (
            <div className="px-3 pb-1 text-xs opacity-50 uppercase tracking-wide">Quick links</div>
          )}
          {!showingQuickLinks && results.length === 0 && (
            <div className="py-8 text-center opacity-50 text-sm">No results for "{query}"</div>
          )}
          {activeList.map((r, i) => (
            <button
              key={r.url}
              type="button"
              onMouseEnter={() => setHighlighted(i)}
              onClick={() => navigate(r.url)}
              className={twMerge([
                "text-left px-3 py-2.5 border border-transparent cursor-pointer",
                i === highlighted && "border-primary/30 bg-primary/10",
              ])}
            >
              <div className="font-medium text-sm">{r.title}</div>
              {r.excerpt && (
                <div
                  className="text-xs opacity-60 mt-0.5 line-clamp-1 [&_mark]:bg-transparent [&_mark]:text-primary [&_mark]:font-medium"
                  dangerouslySetInnerHTML={{ __html: r.excerpt }}
                />
              )}
            </button>
          ))}
        </div>
      </DialogContent>
    </DialogRoot>
  );
}

export { SearchPalette };
