// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules:[
    "@pinia/nuxt",
    '@pinia-plugin-persistedstate/nuxt',
    "@nuxt/icon"
  ],

  piniaPersistedstate: {
    cookieOptions: {
      sameSite: 'strict',
    },
  },
  build: {
    transpile:
      process.env.NODE_ENV === 'production'
        ? [
            'naive-ui',
            'vueuc',
            '@css-render/vue3-ssr',
            '@juggle/resize-observer',
          ]
          : ['@juggle/resize-observer'],
  },
  vite: {
    optimizeDeps: {
      include:
        process.env.NODE_ENV === 'development'
          ? ['naive-ui', 'vueuc']
          : []
    },
    plugins: [
      Components({
        resolvers: [NaiveUiResolver()],
      }),
    ],
  },
  routeRules: {
    '/login': { ssr: false },
  },
  runtimeConfig: {
    public: {
        baseURL: "",
        apiKeyGoogleMap: "",
    },
  },
})
