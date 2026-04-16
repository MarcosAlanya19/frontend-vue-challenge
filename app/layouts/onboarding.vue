<script setup lang="ts">
import { ROUTES } from '~/constants/routes'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

function handleLogout() {
  authStore.logout()
  router.replace(ROUTES.login)
}
</script>

<template>
  <div class="min-h-screen bg-gray-background flex flex-col">
    <!-- Header -->
    <header class="bg-white border-b border-gray-25 px-base lg:px-8">
      <div class="h-16 flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center gap-2">
          <IconsLogoSvg :width="140" :height="45" color="#060F26" />
        </div>

        <!-- Right slot or default logout -->
        <slot name="header-right">
          <button v-if="!route.meta.hideBackButton" type="button" class="flex items-center gap-1"
            @click="router.back()">
            <Icon name="heroicons:chevron-left" class="w-5 h-5 text-secondary" />
            <UiBaseText size="base" weight="bold" color="secondary">Volver</UiBaseText>
          </button>
        </slot>
      </div>
    </header>

    <!-- Content -->
    <main class="flex-1 flex flex-col lg:items-center lg:justify-center lg:py-10">
      <slot />
    </main>
  </div>
</template>
