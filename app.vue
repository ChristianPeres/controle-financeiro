<template>
  <div>
    <!-- Layout de Login -->
    <div v-if="route.path === '/login'" class="min-h-screen bg-gray-100">
      <NuxtPage />
    </div>

    <!-- Layout Principal -->
    <div v-else class="min-h-screen bg-gray-100">
      <header class="bg-white shadow">
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 class="text-4xl font-bold text-gray-900">
            Controle Pessoal
          </h1>
          <button 
            @click="handleLogout" 
            class="px-7 py-2 bg-red-200 rounded text-sm text-red-600 hover:text-red-800"
          >
            Sair
          </button>
        </div>
      </header>

      <main>
        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <NuxtPage />
          <LineChart />
        </div>
      </main>

      <footer class="bg-white shadow mt-8">
        <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center text-gray-500">
          &copy; {{ new Date().getFullYear() }} Finance Control. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from '#app'
import { useAuth } from '~/composables/useAuth'

const route = useRoute()
const router = useRouter()
const { logout } = useAuth()

const handleLogout = () => {
  logout()
  router.push('/login')
}
</script>