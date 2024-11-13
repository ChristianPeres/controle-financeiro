// composables/useAuth.ts
import { ref, computed } from 'vue'

interface User {
  id: number;
  email: string;
  password: string;
}

const user = ref<User | null>(null)

// Configure a URL base do seu json-server
const API_URL = 'http://localhost:3000' // ajuste conforme necessário

export const useAuth = () => {
  const isAuthenticated = computed(() => !!user.value)

  const login = async (email: string, password: string) => {
    try {
      // Faz a requisição para o json-server
      const response = await fetch(`${API_URL}/users?email=${email}`)
      const users = await response.json()
      
      const foundUser = users.find((u: User) => u.password === password)

      if (foundUser) {
        // Remove a senha antes de armazenar no estado
        const { password: _, ...userWithoutPassword } = foundUser
        user.value = userWithoutPassword
        localStorage.setItem('user', JSON.stringify(userWithoutPassword))
        return true
      } else {
        throw new Error('Email ou senha inválidos')
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error)
      throw new Error('Erro ao fazer login')
    }
  }

  const logout = () => {
    user.value = null
    localStorage.removeItem('user')
  }

  const checkAuth = () => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      user.value = JSON.parse(storedUser)
    }
  }

  return {
    user,
    isAuthenticated,
    login,
    logout,
    checkAuth
  }
}