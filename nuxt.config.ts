// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devServer: {
    port: 3030
  },
  devtools: { enabled: true },
    css: ['~/assets/css/main.css'],
  modules: [
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxt/eslint'
  ],
  runtimeConfig: {
        public: {
            apiHost: ''
        }
    }
})