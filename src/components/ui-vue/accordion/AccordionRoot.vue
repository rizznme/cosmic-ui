<script setup lang="ts">
import { computed, provide, useAttrs, useId } from "vue";
import { useMachine, normalizeProps } from "@zag-js/vue";
import * as accordion from "@zag-js/accordion";
import { twMerge } from "tailwind-merge";
import { AccordionApiKey } from "./context";

defineOptions({ inheritAttrs: false });
const rawAttrs = useAttrs() as Partial<accordion.Props> & { class?: string };
const id = useId();

const machineProps = computed(() => {
  const { class: _class, ...rest } = rawAttrs;
  return { id, collapsible: true, ...rest };
});
const service = useMachine(accordion.machine, machineProps);
const api = computed(() => accordion.connect(service, normalizeProps));

provide(AccordionApiKey, api);
</script>

<template>
  <div v-bind="api.getRootProps()" :class="twMerge(['flex flex-col gap-3', rawAttrs.class])">
    <slot />
  </div>
</template>
