<script setup lang="ts">
import { inject } from "vue";
import { ChevronLeft, ChevronRight } from "@lucide/vue";
import { twMerge } from "tailwind-merge";
import { DatePickerApiKey } from "./context";

// The day grid, with a prev/next month header. This is the one part shared
// verbatim across Calendar (rendered inline, no popover), Datepicker (single
// selection, inside a popover), and Daterangepicker (range selection, inside
// a popover) - only the selectionMode/inline props passed to DatePickerRoot
// differ between the three.
//
// Scoped to the day view only: Zag's machine also supports drilling into
// month/year picker views (view/minView/maxView, getMonthsGrid, etc.), left
// out here to keep this placeholder implementation a manageable size.
const { class: className } = defineProps<{ class?: string }>();

const injectedApi = inject(DatePickerApiKey);
if (!injectedApi) throw new Error("DatePicker parts must be used within <DatePickerRoot>");
const api = injectedApi;
</script>

<template>
  <div :class="twMerge(['p-3', className])">
    <div class="flex items-center justify-between mb-3">
      <button
        v-bind="api.getPrevTriggerProps()"
        class="p-1 hover:bg-primary/10 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
      >
        <ChevronLeft class="size-4" />
      </button>
      <span class="font-medium text-sm">{{ api.visibleRangeText.formatted }}</span>
      <button
        v-bind="api.getNextTriggerProps()"
        class="p-1 hover:bg-primary/10 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
      >
        <ChevronRight class="size-4" />
      </button>
    </div>
    <table v-bind="api.getTableProps({ view: 'day' })" class="border-collapse">
      <thead v-bind="api.getTableHeadProps()">
        <tr v-bind="api.getTableRowProps()">
          <th
            v-for="(day, i) in api.weekDays"
            :key="i"
            scope="col"
            class="text-xs opacity-50 font-normal pb-2 size-8"
          >
            {{ day.narrow }}
          </th>
        </tr>
      </thead>
      <tbody v-bind="api.getTableBodyProps()">
        <tr v-for="(week, i) in api.weeks" :key="i" v-bind="api.getTableRowProps()">
          <td
            v-for="(value, j) in week"
            :key="j"
            v-bind="api.getDayTableCellProps({ value })"
            class="text-center p-0.5"
          >
            <div
              v-bind="api.getDayTableCellTriggerProps({ value })"
              class="size-8 flex items-center justify-center cursor-pointer border border-transparent hover:border-primary/30 data-[selected]:bg-primary/20 data-[selected]:border-primary data-[today]:border-primary/50 data-[in-range]:bg-primary/10 data-[outside-range]:opacity-30 data-[unavailable]:opacity-20 data-[unavailable]:pointer-events-none data-[disabled]:opacity-20 data-[disabled]:pointer-events-none"
            >
              {{ value.day }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
