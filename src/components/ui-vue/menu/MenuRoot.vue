<script setup lang="ts">
import { computed, provide, useAttrs, useId } from "vue";
import { useMachine, normalizeProps } from "@zag-js/vue";
import * as menu from "@zag-js/menu";
import { MenuApiKey } from "./context";

// Vue's `defineProps<T>()` type macro can't statically resolve `menu.Props`
// (an externally-defined, multi-interface type) at compile time, so props
// are forwarded untyped via `useAttrs()` instead — the Vue equivalent of
// React's `{...rest}` spread.
defineOptions({ inheritAttrs: false });
const attrs = useAttrs() as Partial<menu.Props>;
const id = useId();

const service = useMachine(
  menu.machine,
  computed(() => ({ id, ...attrs }))
);
const api = computed(() => menu.connect(service, normalizeProps));

provide(MenuApiKey, api);
</script>

<template>
  <slot />
</template>
