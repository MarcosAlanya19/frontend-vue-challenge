// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-01-01",
  future: {
    compatibilityVersion: 4,
  },

  devtools: { enabled: true },

  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@nuxt/icon",
    [
      "@nuxtjs/google-fonts",
      {
        families: { Montserrat: [400, 500, 600, 700] },
        display: "swap",
        download: true,
      },
    ],
  ],

  typescript: {
    strict: true,
    typeCheck: true,
  },

  vite: {
    optimizeDeps: {
      include: ["vee-validate", "@vee-validate/zod", "zod"],
    },
  },

  css: ["~/assets/css/main.css"],
});
