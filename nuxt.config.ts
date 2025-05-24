// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  app: {
    head: {
      title: 'Pokemon TCG Pocket',
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ]
    }
  },
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