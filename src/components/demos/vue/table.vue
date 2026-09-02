<script setup lang="ts">
import {
  TableRoot,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/components/ui-vue/table";

const invoices = [
  { invoice: "INV001", status: "Paid", method: "Credit Card", amount: "$250.00" },
  { invoice: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" },
  { invoice: "INV003", status: "Unpaid", method: "Bank Transfer", amount: "$350.00" },
];
</script>

<template>
  <TableRoot>
    <TableCaption>A list of your recent invoices.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead>Invoice</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Method</TableHead>
        <TableHead class="text-right">Amount</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="row in invoices" :key="row.invoice">
        <TableCell>{{ row.invoice }}</TableCell>
        <TableCell>{{ row.status }}</TableCell>
        <TableCell>{{ row.method }}</TableCell>
        <TableCell class="text-right">{{ row.amount }}</TableCell>
      </TableRow>
    </TableBody>
    <TableFooter>
      <TableRow>
        <TableCell :colspan="3">Total</TableCell>
        <TableCell class="text-right">$750.00</TableCell>
      </TableRow>
    </TableFooter>
  </TableRoot>
</template>
