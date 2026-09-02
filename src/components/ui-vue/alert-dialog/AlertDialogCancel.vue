<script setup lang="ts">
import { inject } from "vue";
import Button from "@/components/ui-vue/button.vue";
import { AlertDialogApiKey } from "./context";

defineProps<{ class?: string }>();

const injectedApi = inject(AlertDialogApiKey);
if (!injectedApi)
  throw new Error("AlertDialog parts must be used within <AlertDialogRoot>");
const api = injectedApi;
</script>

<template>
  <Button shape="flat" v-bind="api.getCloseTriggerProps()" :class="$props.class">
    <slot />
  </Button>
</template>
