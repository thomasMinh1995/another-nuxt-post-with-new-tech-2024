// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true }, 
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ['~/assets/css/main.css'],
  modules: [
    '@primevue/nuxt-module'
],
primevue: {
    options: {
        unstyled: true
    },
    usePrimeVue: true,
    importPT: { as: 'Aura', from: '~/presets/aura' }
}
})
