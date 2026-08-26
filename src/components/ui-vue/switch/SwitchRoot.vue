<script setup lang="ts">
import { computed, provide, useAttrs, useId } from "vue";
import { useMachine, normalizeProps } from "@zag-js/vue";
import * as switchMachine from "@zag-js/switch";
import { twMerge } from "tailwind-merge";
import { SwitchApiKey } from "./context";

defineOptions({ inheritAttrs: false });
const rawAttrs = useAttrs() as Partial<switchMachine.Props> & { class?: string };
const id = useId();

const machineProps = computed(() => {
  const { class: _class, ...rest } = rawAttrs;
  return { id, ...rest };
});
const service = useMachine(switchMachine.machine, machineProps);
const api = computed(() => switchMachine.connect(service, normalizeProps));

provide(SwitchApiKey, api);
</script>

<template>
  <label v-bind="api.getRootProps()" :class="twMerge(['flex items-center gap-4', rawAttrs.class])">
    <slot />
    <input v-bind="api.getHiddenInputProps()" />
  </label>
</template>
