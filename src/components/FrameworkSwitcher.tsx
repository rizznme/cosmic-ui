import * as select from "@zag-js/select";
import { useEffect, useId, useSyncExternalStore } from "react";
import { useMachine, normalizeProps } from "@zag-js/react";
import { ChevronDown, Check } from "lucide-react";
import { Portal } from "@/components/ui/portal";
import {
  FRAMEWORKS,
  frameworkFromPath,
  getFramework,
  getServerFramework,
  setFramework,
  subscribe,
  type Framework,
} from "@/lib/framework-store";

const frameworksCollection = select.collection({
  items: FRAMEWORKS,
  itemToString: (item) => item.label,
  itemToValue: (item) => item.id,
});

function getEquivalentPath(pathname: string, framework: Framework): string {
  const match = pathname.match(/^\/docs\/(react|vue|svelte)(\/.*)?$/);
  if (!match) return pathname;
  return `/docs/${framework}${match[2] ?? ""}`;
}

export function FrameworkSwitcher({ currentPath }: { currentPath: string }) {
  const framework = useSyncExternalStore(subscribe, getFramework, getServerFramework);

  // A URL that names its framework explicitly (e.g. reached via a search
  // engine or a shared link) is authoritative — sync the stored preference
  // to match so the switcher doesn't show a framework other than the one
  // actually on screen.
  useEffect(() => {
    const urlFramework = frameworkFromPath(currentPath);
    if (urlFramework && urlFramework !== getFramework()) {
      setFramework(urlFramework);
    }
  }, [currentPath]);

  const service = useMachine(select.machine, {
    id: useId(),
    collection: frameworksCollection,
    value: [framework],
    onValueChange(details) {
      const next = details.value[0] as Framework;
      setFramework(next);
      const nextPath = getEquivalentPath(currentPath, next);
      if (nextPath !== currentPath) window.location.href = nextPath;
    },
  });
  const api = select.connect(service, normalizeProps);
  const positionerProps = api.getPositionerProps();

  return (
    <div {...api.getRootProps()}>
      <button
        {...api.getTriggerProps()}
        className="w-40 flex items-center justify-between gap-2 border border-primary/20 bg-primary/5 px-2.5 py-1.5 cursor-pointer"
      >
        {api.valueAsString}
        <ChevronDown className="size-4 opacity-70" />
      </button>
      <Portal>
        <div {...positionerProps} style={{ ...positionerProps.style, zIndex: 70 }}>
          <div
            {...api.getContentProps()}
            hidden={!api.open}
            className="min-w-(--reference-width) border border-primary/20 bg-primary/5 backdrop-blur-md mt-1 py-1"
          >
            {FRAMEWORKS.map((item) => (
              <div
                key={item.id}
                {...api.getItemProps({ item })}
                className="cursor-pointer flex items-center justify-between px-3 py-1.5 hover:bg-primary/10 data-[highlighted]:bg-primary/10"
              >
                <span {...api.getItemTextProps({ item })}>{item.label}</span>
                <span {...api.getItemIndicatorProps({ item })}>
                  <Check className="size-3.5" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </Portal>
    </div>
  );
}
