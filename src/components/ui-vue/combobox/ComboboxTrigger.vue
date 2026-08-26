<script setup lang="ts">
import { inject } from "vue";
import Button from "@/components/ui-vue/button.vue";
import { ChevronsUpDown } from "@lucide/vue";
import { ComboboxApiKey } from "./context";

const injectedApi = inject(ComboboxApiKey);
if (!injectedApi) throw new Error("Combobox parts must be used within <ComboboxRoot>");
const api = injectedApi;
</script>

<template>
  <div v-bind="api.getControlProps()" class="relative">
    <Button v-bind="api.getTriggerProps()" class="w-full min-w-55 px-0 [&>span]:justify-start px-8">
      {{ api.value.length && api.value[0].length ? api.value.join(", ") : "Select option..." }}
      <ChevronsUpDown class="size-4 ms-auto opacity-70" />
    </Button>
  </div>
</template>
