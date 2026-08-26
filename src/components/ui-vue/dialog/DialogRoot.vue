<script setup lang="ts">
import { computed, provide, useAttrs, useId } from "vue";
import { useMachine, normalizeProps } from "@zag-js/vue";
import * as dialog from "@zag-js/dialog";
import { DialogApiKey } from "./context";

defineOptions({ inheritAttrs: false });
const rawAttrs = useAttrs() as Partial<dialog.Props>;
const id = useId();

const service = useMachine(
  dialog.machine,
  computed(() => ({ id, ...rawAttrs }))
);
const api = computed(() => dialog.connect(service, normalizeProps));

provide(DialogApiKey, api);
</script>

<template>
  <slot />
</template>
