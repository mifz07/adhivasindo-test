// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  sourcemap: false,

  app: {
    head: {
      title: 'Adhivasindo',
      meta: [
        { name: 'description', content: 'Adhikari Inovasi Indonesia' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/Adhivasindo.png' }
      ]
    }
  },

  ssr: false,

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    'nuxt-charts',
    '@nuxtjs/color-mode',
    'nuxt-icons',
    '@nuxt/image'
  ],
  css: [
    './assets/css/main.css',
    './assets/css/tailwind.css'
  ],

  components: true, // auto import

  image: {
    dir: 'assets/images',
  },

  plugins: ['~/plugins/global-function.ts'],

  runtimeConfig: {
    public: {
      siteUrl: process.env.NEXT_PUBLIC_URL,
      URL_API: process.env.NUXT_PUBLIC_URL_API || 'http://127.0.0.1:3000',
    },
    auth: {
      cookie: {
        options: {
          httpOnly: true,
        },
      },
    },
  },

  nitro: {
    routeRules: {
      '/login': { headers: { 'Cross-Origin-Opener-Policy': 'same-origin-allow-popups' } }
    },
    devProxy: {
    '/api/v1': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
    prerender: {
      routes: []
    }
  }
})
