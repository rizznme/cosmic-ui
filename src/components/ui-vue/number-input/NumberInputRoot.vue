<script setup lang="ts">
import { computed, provide, useAttrs, useId } from "vue";
import { useMachine, normalizeProps } from "@zag-js/vue";
import * as numberInputMachine from "@zag-js/number-input";
import { twMerge } from "tailwind-merge";
import { NumberInputApiKey } from "./context";

defineOptions({ inheritAttrs: false });
const rawAttrs = useAttrs() as Partial<numberInputMachine.Props> & { class?: string };
const id = useId();

const machineProps = computed(() => {
  const { class: _class, ...rest } = rawAttrs;
  return { id, ...rest };
});
const service = useMachine(numberInputMachine.machine, machineProps);
const api = computed(() => numberInputMachine.connect(service, normalizeProps));

provide(NumberInputApiKey, api);
</script>

<template>
  <div v-bind="api.getRootProps()" :class="twMerge(['flex flex-col gap-2', rawAttrs.class])">
    <slot />
  </div>
</template>
