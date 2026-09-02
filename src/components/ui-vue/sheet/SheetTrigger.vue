<script setup lang="ts">
import { inject } from "vue";
import Button from "@/components/ui-vue/button.vue";
import { SheetApiKey } from "./context";

defineProps<{ class?: string }>();

const injectedApi = inject(SheetApiKey);
if (!injectedApi) throw new Error("Sheet parts must be used within <SheetRoot>");
const api = injectedApi;
</script>

<template>
  <Button v-bind="api.getTriggerProps()" :class="$props.class">
    <slot />
  </Button>
</template>
