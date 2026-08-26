<script setup lang="ts">
import { computed, provide, useAttrs, useId } from "vue";
import { useMachine, normalizeProps } from "@zag-js/vue";
import * as combobox from "@zag-js/combobox";
import { ComboboxApiKey } from "./context";

defineOptions({ inheritAttrs: false });
const rawAttrs = useAttrs() as Partial<combobox.Props>;
const id = useId();

const machineProps = computed(() => ({
  id,
  selectionBehavior: "clear" as const,
  ...rawAttrs,
}));
const service = useMachine(combobox.machine, machineProps);
const api = computed(() => combobox.connect(service, normalizeProps));

provide(ComboboxApiKey, api);
</script>

<template>
  <div v-bind="api.getRootProps()">
    <slot />
  </div>
</template>
