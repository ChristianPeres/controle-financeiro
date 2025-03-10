<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div 
          v-if="errorMessage" 
          class="absolute left-0 right-0 flex justify-center z-50"
          style="top: 50px;"
        >
          <div 
            class="
              bg-red-100 border border-red-400 text-red-700 
              px-4 py-2 md:px-5 md:py-3
              rounded-lg 
              shadow-md 
              text-sm md:text-base text-center
              transition-all duration-300
            "
            :class="{
              'opacity-100 translate-y-0': errorMessage,
              'opacity-0 -translate-y-full': !errorMessage
            }"
          >
            {{ errorMessage }}
          </div>
        </div>
    <div class="max-w-md w-full space-y-8 
      md:max-w-lg 
      md:scale-105 lg:scale-110
    ">
      <div>
        <h2 class="mt-6 text-center text-3xl md:text-5xl font-extrabold text-gray-900">
          Controle Pessoal
        </h2>
        <p class="mt-2 text-center text-sm md:text-base text-gray-600">
          Faça login para acessar sua conta
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email" class="sr-only">Email</label>
            <input
              id="email"
              v-model="email"
              name="email"
              type="email"
              required  
              class="appearance-none rounded-none relative block w-full 
                px-3 py-2 md:px-4 md:py-3
                border border-gray-300 
                placeholder-gray-500 text-gray-900 
                rounded-t-md 
                focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 
                text-sm md:text-base"
              placeholder="Email"
            />
          </div>
          <div class="flex">
            <input  
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              name="password"
              required
              class="appearance-none rounded-none relative block w-full 
                px-3 py-2 md:px-4 md:py-3
                border border-gray-300 
                placeholder-gray-500 text-gray-900 
                rounded-b-md 
                focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 
                text-sm md:text-base"
              placeholder="Senha"
            />
            <button
              type="button"
              @click="togglePasswordVisibility"
              class="
                px-3 py-2 md:px-4 md:py-3
                border border-l-0 border-gray-300 
                bg-gray-100 text-gray-600 hover:bg-gray-200
                rounded-r-md
                flex items-center justify-center
                text-sm md:text-base
              "
            >
              <svg 
                v-if="!showPassword" 
                xmlns="http://www.w3.org/2000/svg" 
                class="h-5 w-5 md:h-6 md:w-6" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
              </svg>
              <svg 
                v-else 
                xmlns="http://www.w3.org/2000/svg" 
                class="h-5 w-5 md:h-6 md:w-6" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3
                 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.78zm4.261 4.262l1.514 1.514a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" />
                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.742L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.064 7 9.542 7 .817 0 1.614-.107 2.371-.311z" />
              </svg>
            </button>
          </div>
        </div>
        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center 
              py-2 px-4 md:py-3 md:px-5
              border border-transparent 
              text-sm md:text-base font-medium 
              rounded-md text-white bg-indigo-600 
              hover:bg-indigo-700 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span v-if="loading">Carregando...</span>
            <span v-else>Entrar</span>
          </button>
        </div>
        <p>Caso nao tenha uma conta</p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useRouter } from '#app'

definePageMeta({
  middleware: ['auth']
})

const router = useRouter()
const { login } = useAuth()
const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')
const showPassword = ref(false)

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const handleLogin = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    await login(email.value, password.value)
    
    // Adiciona delay antes de redirecionar
    setTimeout(() => {
      router.push('/')
    }, 500)
  } catch (error) {
    errorMessage.value = 'Email ou senha incorretos.'

    // Oculta a mensagem após 3 segundos
    setTimeout(() => {
      errorMessage.value = ''
    }, 3000)
  } finally {
    // Adiciona delay antes de desabilitar o loading
    setTimeout(() => {
      loading.value = false
    }, 2000)
  }
}
</script>