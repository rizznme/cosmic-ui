<script setup lang="ts">
import { computed, provide, useAttrs, useId } from "vue";
import { useMachine, normalizeProps } from "@zag-js/vue";
import * as tabs from "@zag-js/tabs";
import { twMerge } from "tailwind-merge";
import { TabsApiKey } from "./context";

defineOptions({ inheritAttrs: false });
const rawAttrs = useAttrs() as Partial<tabs.Props> & { class?: string };
const id = useId();

const machineProps = computed(() => {
  const { class: _class, ...rest } = rawAttrs;
  return { id, ...rest };
});
const service = useMachine(tabs.machine, machineProps);
const api = computed(() => tabs.connect(service, normalizeProps));

provide(TabsApiKey, api);
</script>

<template>
  <div v-bind="api.getRootProps()" :class="twMerge(['flex flex-col gap-2', rawAttrs.class])">
    <slot />
  </div>
</template>
