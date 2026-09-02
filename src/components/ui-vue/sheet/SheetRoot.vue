<script setup lang="ts">
import { computed, provide, useAttrs, useId } from "vue";
import { useMachine, normalizeProps } from "@zag-js/vue";
import * as dialogMachine from "@zag-js/dialog";
import { SheetApiKey } from "./context";

defineOptions({ inheritAttrs: false });
const rawAttrs = useAttrs() as Partial<dialogMachine.Props>;
const id = useId();

const service = useMachine(
  dialogMachine.machine,
  computed(() => ({ id, ...rawAttrs }))
);
const api = computed(() => dialogMachine.connect(service, normalizeProps));

provide(SheetApiKey, api);
</script>

<template>
  <slot />
</template>
