<script setup lang="ts">
import { computed, provide, useAttrs, useId } from "vue";
import { useMachine, normalizeProps } from "@zag-js/vue";
import * as radioGroup from "@zag-js/radio-group";
import { twMerge } from "tailwind-merge";
import { RadioGroupApiKey } from "./context";

defineOptions({ inheritAttrs: false });
const rawAttrs = useAttrs() as Partial<radioGroup.Props> & { class?: string };
const id = useId();

const machineProps = computed(() => {
  const { class: _class, ...rest } = rawAttrs;
  return { id, ...rest };
});
const service = useMachine(radioGroup.machine, machineProps);
const api = computed(() => radioGroup.connect(service, normalizeProps));

provide(RadioGroupApiKey, api);
</script>

<template>
  <div v-bind="api.getRootProps()" :class="twMerge(['flex flex-col gap-3', rawAttrs.class])">
    <slot />
  </div>
</template>
