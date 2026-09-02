<script setup lang="ts">
import { computed, inject } from "vue";
import Button from "@/components/ui-vue/button.vue";
import { AlertDialogApiKey } from "./context";

defineProps<{ class?: string }>();
// Declaring this as an emit (rather than leaving @click to fall through as a
// plain DOM attribute) means it composes cleanly with the machine's own
// close handler below instead of both landing on the button and firing
// twice.
const emit = defineEmits<{ click: [event: MouseEvent] }>();

const injectedApi = inject(AlertDialogApiKey);
if (!injectedApi)
  throw new Error("AlertDialog parts must be used within <AlertDialogRoot>");
const api = injectedApi;

// The consumer's handler runs first (it does the actual delete/confirm
// action); the machine's own onClick then closes the dialog, unless that
// handler called event.preventDefault() to keep it open.
const triggerProps = computed(() => {
  const { onClick, ...rest } = api.value.getCloseTriggerProps();
  return {
    ...rest,
    onClick: (event: MouseEvent) => {
      emit("click", event);
      onClick?.(event);
    },
  };
});
</script>

<template>
  <Button variant="destructive" v-bind="triggerProps" :class="$props.class">
    <slot />
  </Button>
</template>
