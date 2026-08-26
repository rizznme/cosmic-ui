<script setup lang="ts">
import { computed, provide, useAttrs, useId } from "vue";
import { useMachine, normalizeProps } from "@zag-js/vue";
import * as checkbox from "@zag-js/checkbox";
import { twMerge } from "tailwind-merge";
import { CheckboxApiKey } from "./context";

defineOptions({ inheritAttrs: false });
const rawAttrs = useAttrs() as Partial<checkbox.Props> & { class?: string };
const id = useId();

const machineProps = computed(() => {
  const { class: _class, ...rest } = rawAttrs;
  return { id, ...rest };
});
const service = useMachine(checkbox.machine, machineProps);
const api = computed(() => checkbox.connect(service, normalizeProps));

provide(CheckboxApiKey, api);
</script>

<template>
  <label
    v-bind="api.getRootProps()"
    :class="twMerge(['flex gap-3.5 items-center cursor-pointer', rawAttrs.class])"
  >
    <slot />
    <input v-bind="api.getHiddenInputProps()" />
  </label>
</template>
