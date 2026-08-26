<script setup lang="ts">
import * as select from "@zag-js/select";
import {
  SelectRoot,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectItemIndicator,
} from "@/components/ui-vue/select";

const frameworks = [
  { label: "React", value: "react" },
  { label: "Solid", value: "solid" },
  { label: "Vue", value: "vue" },
  { label: "Svelte", value: "svelte" },
];

const frameworksCollection = select.collection({
  items: frameworks,
  itemToString: (item) => item.label,
  itemToValue: (item) => item.value,
});
</script>

<template>
  <SelectRoot :collection="frameworksCollection">
    <SelectTrigger />
    <SelectContent>
      <SelectItem v-for="item in frameworks" :key="item.value" :item="item">
        <SelectItemText>{{ item.label }}</SelectItemText>
        <SelectItemIndicator />
      </SelectItem>
    </SelectContent>
  </SelectRoot>
</template>
