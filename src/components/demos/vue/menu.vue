<script setup lang="ts">
import { MenuRoot, MenuTrigger, MenuContent, MenuItem } from "@/components/ui-vue/menu";
import { PenLine, FilePenLine, CopySlash, Eraser, FileUp } from "@lucide/vue";
</script>

<template>
  <MenuRoot>
    <MenuTrigger class="w-56">
      <PenLine class="size-4 me-2.5" /> Actions
    </MenuTrigger>
    <MenuContent>
      <MenuItem value="edit">
        <FilePenLine class="size-4 me-2.5" /> Edit
      </MenuItem>
      <MenuItem value="duplicate">
        <CopySlash class="size-4 me-2.5" /> Duplicate
      </MenuItem>
      <MenuItem value="delete">
        <Eraser class="size-4 me-2.5" /> Delete
      </MenuItem>
      <MenuItem value="export">
        <FileUp class="size-4 me-2.5" /> Export...
      </MenuItem>
    </MenuContent>
  </MenuRoot>
</template>
