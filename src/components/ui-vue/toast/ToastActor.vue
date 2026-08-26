<script setup lang="ts">
import { computed, provide } from "vue";
import { useMachine, normalizeProps } from "@zag-js/vue";
import * as toast from "@zag-js/toast";
import { ToastApiKey } from "./context";

// `defineProps()`'s runtime declaration form still trips Vue's automatic
// type-declaration generation if a prop is cast to a complex external type
// (`Object as () => toast.Props`) right there in the macro call. Keeping the
// props untyped here and casting them as normal TS expressions below avoids it.
const props = defineProps({
  value: { type: Object, required: true },
  parent: { type: Object, required: true },
  index: { type: Number, required: true },
});
const value = props.value as toast.Props;
const parent = props.parent as toast.GroupService;

const service = useMachine(
  toast.machine,
  computed(() => ({ ...value, parent, index: props.index }))
);
const api = computed(() => toast.connect(service, normalizeProps));

provide(ToastApiKey, api);
</script>

<template>
  <slot :toast="value" />
</template>
