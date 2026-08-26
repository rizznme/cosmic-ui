<script setup lang="ts">
import { computed, provide, useAttrs, useId } from "vue";
import { useMachine, normalizeProps } from "@zag-js/vue";
import * as select from "@zag-js/select";
import { SelectApiKey } from "./context";

defineOptions({ inheritAttrs: false });
const rawAttrs = useAttrs() as Partial<select.Props>;
const id = useId();

const service = useMachine(
  select.machine,
  computed(() => ({ id, ...rawAttrs }))
);
const api = computed(() => select.connect(service, normalizeProps));

provide(SelectApiKey, api);
</script>

<template>
  <div v-bind="api.getRootProps()">
    <slot />
  </div>
</template>
