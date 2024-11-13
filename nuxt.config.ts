export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
  
  nitro: {
    devProxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        prependPath: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },

  pinia: {
    autoImports: ["defineStore", "storeToRefs"],
  },
  
  css: ["~/assets/css/main.css"],

  app: {
    head: {
      title: "Finance Control",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  compatibilityDate: "2024-11-06",
})