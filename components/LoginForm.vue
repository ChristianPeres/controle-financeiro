<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <input v-model="email" type="email" placeholder="Email" required>
    </div>
    <div>
      <input v-model="password" type="password" placeholder="Senha" required>
    </div>
    <div>
      <button type="submit" :disabled="loading">
        {{ loading ? 'Carregando...' : 'Login' }}
      </button>
    </div>
    <p v-if="error" class="error">{{ error }}</p>
  </form>
</template>

<script setup lang="ts">
const { login, error } = useAuth()
const email = ref('')
const password = ref('')
const loading = ref(false)

const handleSubmit = async () => {
  loading.value = true
  try {
    await login(email.value, password.value)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.error {
  color: red;
  margin-top: 1rem;
}
</style>