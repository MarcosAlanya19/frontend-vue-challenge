// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-01-01",
  future: {
    compatibilityVersion: 4,
  },

  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: { lang: "es" },
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Kambista - Cambia dólares al mejor tipo de cambio",
      meta: [
        {
          name: "description",
          content:
            "Cambia dólares y soles al mejor tipo de cambio en Perú. Operaciones rápidas, seguras y 100% digitales.",
        },
        { name: "theme-color", content: "#060F26" },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "Kambista" },
        {
          property: "og:title",
          content: "Kambista - Cambia dólares al mejor tipo de cambio",
        },
        {
          property: "og:description",
          content:
            "Cambia dólares y soles al mejor tipo de cambio en Perú. Operaciones rápidas, seguras y 100% digitales.",
        },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: "Kambista - Cambia dólares al mejor tipo de cambio",
        },
        {
          name: "twitter:description",
          content:
            "Cambia dólares y soles al mejor tipo de cambio en Perú. Operaciones rápidas, seguras y 100% digitales.",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  modules: [
    ["@nuxtjs/tailwindcss", { cssPath: "~/assets/css/main.css" }],
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

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL,
    },
  },

  typescript: {
    strict: true,
    typeCheck: false,
  },

  vite: {
    optimizeDeps: {
      include: ["vee-validate", "@vee-validate/zod", "zod", "v-calendar"],
    },
  },

  css: [],
});
