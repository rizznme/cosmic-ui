<script setup lang="ts">
import { inject } from "vue";
import { Search } from "@lucide/vue";
import { ComboboxApiKey } from "./context";

const injectedApi = inject(ComboboxApiKey);
if (!injectedApi) throw new Error("Combobox parts must be used within <ComboboxRoot>");
const api = injectedApi;
</script>

<template>
  <div class="relative border-b border-primary/30">
    <div class="absolute size-3.5 inset-y-0 my-auto ml-5">
      <Search class="size-full mt-0.5 opacity-70" />
    </div>
    <input
      v-bind="api.getInputProps()"
      class="outline-none ps-11 pe-6 pt-2.5 pb-3 mt-2 w-full"
      placeholder="Search..."
    />
  </div>
</template>
