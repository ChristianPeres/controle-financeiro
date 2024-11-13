<template>
  <form @submit.prevent="submitForm" class="bg-white shadow rounded-lg p-6">
    <h2 class="text-2xl font-semibold mb-4">Nova Transação</h2>
    <div class="space-y-4">
      <div>
        <label for="description" class="block text-sm font-medium text-gray-700">Descrição</label>
        <input v-model="form.description" id="description" type="text" required
               class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
      </div>
      <div>
        <label for="amount" class="block text-sm font-medium text-gray-700">Valor</label>
        <input v-model="form.amount" id="amount" type="number" step="0.01" required
               class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
      </div>
      <div>
        <label for="type" class="block text-sm font-medium text-gray-700">Tipo</label>
        <select v-model="form.type" id="type" required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
          <option value="income">Receita</option>
          <option value="expense">Despesa</option>
        </select>
      </div>
      <button type="submit"
              class="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        Adicionar Transação
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const emit = defineEmits<{
  (e: 'submit', transaction: { description: string, amount: number, type: 'income' | 'expense' }): void
}>()

const form = reactive({
  description: '',
  amount: 0,
  type: 'income' as 'income' | 'expense'
})

const submitForm = () => {
  emit('submit', { ...form, amount: Number(form.amount) })
  form.description = ''
  form.amount = 0
  form.type = 'income'
}
</script>