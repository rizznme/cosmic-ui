<script setup lang="ts">
import { computed, provide, useAttrs, useId } from "vue";
import { useMachine, normalizeProps } from "@zag-js/vue";
import * as dialogMachine from "@zag-js/dialog";
import { AlertDialogApiKey } from "./context";

defineOptions({ inheritAttrs: false });
const rawAttrs = useAttrs() as Partial<dialogMachine.Props>;
const id = useId();

const service = useMachine(
  dialogMachine.machine,
  computed(() => ({
    id,
    role: "alertdialog",
    // An alert dialog demands an explicit choice - dismissing it by clicking
    // outside or pressing Escape would let the user skip that choice.
    closeOnInteractOutside: false,
    closeOnEscape: false,
    ...rawAttrs,
  }))
);
const api = computed(() => dialogMachine.connect(service, normalizeProps));

provide(AlertDialogApiKey, api);
</script>

<template>
  <slot />
</template>
