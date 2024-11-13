<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-8 text-center">Controle Financeiro</h1>
    
    <DashboardSummary 
      :balance="balance"
      :income="income"
      :expenses="expenses"
    />
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <TransactionForm @submit="addTransaction" />
      <TransactionList 
        :transactions="sortedTransactions" 
        @delete="deleteTransaction"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
definePageMeta({
  middleware: ['auth']
})
interface Transaction {
  id: number
  description: string
  amount: number
  type: 'income' | 'expense'
  date: string
}

const transactions = ref<Transaction[]>([])

const balance = computed(() => 
  transactions.value.reduce((acc, t) => 
    t.type === 'income' ? acc + t.amount : acc - t.amount, 0)
)

const income = computed(() =>
  transactions.value
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0)
)

const expenses = computed(() =>
  transactions.value
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0)
)

const sortedTransactions = computed(() => 
  [...transactions.value].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
)

const addTransaction = (transaction: Omit<Transaction, 'id' | 'date'>) => {
  const newTransaction = {
    ...transaction,
    id: Date.now(),
    date: new Date().toISOString()
  }
  transactions.value.push(newTransaction)
}

const deleteTransaction = (id: number) => {
  transactions.value = transactions.value.filter(t => t.id !== id)
}
</script>