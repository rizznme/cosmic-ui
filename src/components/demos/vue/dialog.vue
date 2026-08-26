<script setup lang="ts">
import {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogCloseTrigger,
} from "@/components/ui-vue/dialog";
import Button from "@/components/ui-vue/button.vue";
import Input from "@/components/ui-vue/input.vue";
import { Save, FileUp, Unplug } from "@lucide/vue";
</script>

<template>
  <DialogRoot>
    <DialogTrigger>
      <FileUp class="size-4 me-2.5" /> Dialog
    </DialogTrigger>
    <DialogContent>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogDescription>
        Make changes to your profile here. Click save when you're done.
      </DialogDescription>
      <div class="py-5 flex flex-col gap-4">
        <Input type="text" placeholder="Email" />
        <Input type="password" placeholder="Password" />
      </div>
      <div class="flex flex-col sm:flex-row gap-y-3 justify-end mt-3 pb-2">
        <DialogCloseTrigger v-slot="{ triggerProps }">
          <Button v-bind="triggerProps" variant="secondary" class="min-w-30">
            <Unplug class="size-4 me-2.5" />
            Cancel
          </Button>
        </DialogCloseTrigger>
        <Button class="min-w-30" type="submit">
          <Save class="size-4 me-2.5" />
          Save changes
        </Button>
      </div>
      <DialogCloseTrigger />
    </DialogContent>
  </DialogRoot>
</template>
