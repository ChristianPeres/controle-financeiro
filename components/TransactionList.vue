<template>
  <div class="bg-white overflow-y-auto shadow max-h-80 rounded-lg p-6">
    <h2 class="text-2xl font-semibold mb-4">Transações Recentes</h2>
    <ul class="divide-y  divide-gray-200">
      <li v-for="transaction in transactions" :key="transaction.id" class="py-4 flex justify-between items-center">
        <div>
          <p class="text-sm font-medium text-gray-900">{{ transaction.description }}</p>
          <p class="text-sm text-gray-500">{{ formatDate(transaction.date) }}</p>
        </div>
        <div class="flex items-center">
          <span :class="[
            'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
            transaction.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          ]">
            {{ formatCurrency(transaction.amount) }}
          </span>
          <button @click="$emit('delete', transaction.id)" class="ml-2 text-red-600 hover:text-red-900">
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  transactions: Array<{
    id: number
    description: string
    amount: number
    type: 'income' | 'expense'
    date: string
  }>
}>()

defineEmits<{
  (e: 'delete', id: number): void
}>()

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('pt-BR')
}
</script>