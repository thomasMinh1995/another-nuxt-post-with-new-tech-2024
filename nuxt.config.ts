// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  ssr: true,
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ["~/assets/css/main.css"],
  modules: ["@pinia/nuxt", "nuxt-lazy-hydrate", "@nuxtjs/tailwindcss", "@primevue/nuxt-module"],
  plugins: ["~/plugins/primevue.js"],
  primevue: {
    options: {
        theme: {
            preset: Aura,
            options: {
                cssLayer: false 
            }
        }
    }
}
});
