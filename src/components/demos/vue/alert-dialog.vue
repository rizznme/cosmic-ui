<script setup lang="ts">
import {
  AlertDialogRoot,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui-vue/alert-dialog";

function handleDelete() {
  console.log("account deleted");
}
</script>

<template>
  <AlertDialogRoot>
    <AlertDialogTrigger>Delete account</AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your
        account and remove your data from our servers.
      </AlertDialogDescription>
      <div class="flex justify-end gap-2 mt-4">
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction @click="handleDelete">Continue</AlertDialogAction>
      </div>
    </AlertDialogContent>
  </AlertDialogRoot>
</template>
