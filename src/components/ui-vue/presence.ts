import { computed, toValue, type MaybeRefOrGetter } from "vue";
import { useMachine, normalizeProps } from "@zag-js/vue";
import * as presence from "@zag-js/presence";

/**
 * Keeps a node mounted through its exit animation.
 *
 * `open` flips to false immediately, but `present` stays true until the
 * node's CSS `animationend` fires (detected via the returned ref callback),
 * so exit animations (`data-[state=closed]:animate-out` etc.) actually get
 * to play instead of the node disappearing on the same frame.
 */
function usePresence(open: MaybeRefOrGetter<boolean>) {
  const service = useMachine(
    presence.machine,
    computed(() => ({ present: toValue(open) }))
  );
  const api = computed(() => presence.connect(service, normalizeProps));

  return {
    present: computed(() => api.value.present),
    setNode: (node: HTMLElement | null) => api.value.setNode(node),
  };
}

export { usePresence };
