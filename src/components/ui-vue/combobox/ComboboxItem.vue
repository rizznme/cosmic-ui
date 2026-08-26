<script setup lang="ts">
import { inject, provide } from "vue";
import { twMerge } from "tailwind-merge";
import type * as combobox from "@zag-js/combobox";
import { ComboboxApiKey, ComboboxItemKey } from "./context";

const rawProps = defineProps({
  class: { type: String, required: false },
  item: { type: null, required: true },
});
const item = rawProps.item as combobox.CollectionItem;

const injectedApi = inject(ComboboxApiKey);
if (!injectedApi) throw new Error("Combobox parts must be used within <ComboboxRoot>");
const api = injectedApi;

provide(ComboboxItemKey, item);
</script>

<template>
  <div
    v-bind="api.getItemProps({ item })"
    :class="
      twMerge([
        'cursor-pointer flex items-center -mx-3 -my-0.5 px-3 py-0.5 border border-transparent hover:border-primary/30 hover:bg-primary/10 data-[highlighted]:border-primary/30 data-[highlighted]:bg-primary/10',
        rawProps.class,
      ])
    "
  >
    <slot />
  </div>
</template>
