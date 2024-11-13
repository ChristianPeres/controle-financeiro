<template>
  <div class="bg-white shadow rounded-lg p-6 mb-8">
    <h2 class="text-2xl font-semibold mb-4">Resumo Financeiro</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-blue-100 p-4 rounded-lg">
        <p class="text-sm text-blue-600 font-medium">Saldo Total</p>
        <p class="text-2xl font-bold text-blue-800">{{ formatCurrency(balance) }}</p>
      </div>
      <div class="bg-green-100 p-4 rounded-lg">
        <p class="text-sm text-green-600 font-medium">Receitas</p>
        <p class="text-2xl font-bold text-green-800">{{ formatCurrency(income) }}</p>
      </div>
      <div class="bg-red-100 p-4 rounded-lg">
        <p class="text-sm text-red-600 font-medium">Despesas</p>
        <p class="text-2xl font-bold text-red-800">{{ formatCurrency(expenses) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  balance: number
  income: number
  expenses: number
}>()

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}
</script>