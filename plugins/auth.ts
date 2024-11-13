export default defineNuxtPlugin(() => {
  return {
    provide: {
      auth: {
        isAuthenticated: () => {
          // Implemente sua lógica de verificação de autenticação aqui
          return !!localStorage.getItem('user')
        },
        login: (user) => {
          // Lógica de login
          localStorage.setItem('user', JSON.stringify(user))
        },
        logout: () => {
          // Lógica de logout
          localStorage.removeItem('user')
        }
      }
    }
  }
})