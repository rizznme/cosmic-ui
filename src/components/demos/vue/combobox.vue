<script setup lang="ts">
import * as combobox from "@zag-js/combobox";
import { ref } from "vue";
import {
  ComboboxRoot,
  ComboboxInput,
  ComboboxTrigger,
  ComboboxContent,
  ComboboxItemGroup,
  ComboboxItem,
  ComboboxItemText,
  ComboboxItemIndicator,
} from "@/components/ui-vue/combobox";

const frameworks = ["React", "Solid", "Vue", "Svelte"];

const state = ref([""]);
const itemsCollection = ref(combobox.collection({ items: frameworks }));

function handleInputChange(details: { inputValue: string }) {
  const query = details.inputValue.toLowerCase();
  itemsCollection.value = combobox.collection({
    items: frameworks.filter((item) => item.toLowerCase().includes(query)),
  });
}

function handleValueChange(details: { value: string[] }) {
  state.value = details.value;
}
</script>

<template>
  <ComboboxRoot
    :value="state"
    :collection="itemsCollection"
    :onInputValueChange="handleInputChange"
    :onValueChange="handleValueChange"
  >
    <ComboboxTrigger />
    <ComboboxContent>
      <ComboboxInput />
      <ComboboxItemGroup>
        <ComboboxItem v-for="item in itemsCollection.items" :key="item" :item="item">
          <ComboboxItemText>{{ item }}</ComboboxItemText>
          <ComboboxItemIndicator />
        </ComboboxItem>
      </ComboboxItemGroup>
    </ComboboxContent>
  </ComboboxRoot>
</template>
