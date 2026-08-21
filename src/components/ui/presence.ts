import { useMachine, normalizeProps } from "@zag-js/react";
import * as presence from "@zag-js/presence";

/**
 * Keeps a node mounted through its exit animation.
 *
 * `open` flips to false immediately, but `present` stays true until the
 * node's CSS `animationend` fires (detected via `ref`), so exit animations
 * (`data-[state=closed]:animate-out` etc.) actually get to play instead of
 * the node disappearing on the same frame.
 */
function usePresence(open: boolean) {
  const service = useMachine(presence.machine, { present: open });
  const api = presence.connect(service, normalizeProps);

  return { present: api.present, ref: api.setNode };
}

export { usePresence };
