// middleware/auth.ts
export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated, checkAuth } = useAuth()
  
  if (import.meta.client) {
    checkAuth()
    
    if (!isAuthenticated.value && to.path !== '/login') {
      return  window.location.href = '/login'
    }
    
    if (isAuthenticated.value && to.path === '/login') {
      return  window.location.href = '/'
    }
  }
})