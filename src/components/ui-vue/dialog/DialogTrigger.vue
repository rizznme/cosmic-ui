<script setup lang="ts">
import { inject } from "vue";
import Button from "@/components/ui-vue/button.vue";
import { DialogApiKey } from "./context";

defineProps<{ class?: string }>();

const injectedApi = inject(DialogApiKey);
if (!injectedApi) throw new Error("Dialog parts must be used within <DialogRoot>");
const api = injectedApi;
</script>

<template>
  <Button v-bind="api.getTriggerProps()" :class="$props.class">
    <slot />
  </Button>
</template>
