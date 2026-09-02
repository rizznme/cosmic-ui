<script setup lang="ts">
import { computed, provide, useAttrs, useId } from "vue";
import { useMachine, normalizeProps } from "@zag-js/vue";
import * as datePickerMachine from "@zag-js/date-picker";
import { DatePickerApiKey } from "./context";

defineOptions({ inheritAttrs: false });
const rawAttrs = useAttrs() as Partial<datePickerMachine.Props>;
const id = useId();

const service = useMachine(
  datePickerMachine.machine,
  computed(() => ({ id, ...rawAttrs }))
);
const api = computed(() => datePickerMachine.connect(service, normalizeProps));

provide(DatePickerApiKey, api);
</script>

<template>
  <slot />
</template>
