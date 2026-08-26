<script setup lang="ts">
import { TabsRoot, TabsList, TabsTrigger, TabsContent } from "@/components/ui-vue/tabs";

const data = [
  { value: "item-1", label: "Item one", content: "Item one content" },
  { value: "item-2", label: "Item two", content: "Item two content" },
  { value: "item-3", label: "Item three", content: "Item three content" },
];
</script>

<template>
  <TabsRoot :defaultValue="data[0].value">
    <TabsList>
      <TabsTrigger v-for="item in data" :key="item.value" :value="item.value">
        {{ item.label }}
      </TabsTrigger>
    </TabsList>
    <TabsContent v-for="item in data" class="xl:w-150" :key="item.value" :value="item.value">
      {{ item.content }}
    </TabsContent>
  </TabsRoot>
</template>
