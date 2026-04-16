<script setup lang="ts">
import { cn } from '~/lib/cn'

const authStore = useAuthStore()
const koinsStore = useKoinsStore()
const router = useRouter()
const route = useRoute()

const NAV_ITEMS = [
  { label: 'Inicio', path: '/', icon: resolveComponent('IconsHomeSvg') },
  { label: 'Historial de operaciones', path: '/history', icon: resolveComponent('IconsHistorySvg') },
  { label: 'Cuentas bancarias', path: '/accounts', icon: resolveComponent('IconsCardSvg') },
  { label: 'Regala y gana', path: '/referrals', icon: resolveComponent('IconsCouponSvg') },
  { label: 'Kambista beneficios', path: '/benefits', icon: resolveComponent('IconsOfertSvg') },
  { label: 'Alertas de tipo de cambio', path: '/alerts', icon: resolveComponent('IconsTypeChangesSvg') },
  { label: 'Kambi Koinks', path: '/koinks', badge: 'NUEVO', icon: resolveComponent('IconsCoinSvg') },
  { label: 'Ayuda', path: '/help', icon: resolveComponent('IconsHelpSvg') },
]

const mobileMenuOpen = ref(false)
const userMenuOpen = ref(false)
const sidebarOpen = ref(true)

watch(() => route.path, () => {
  mobileMenuOpen.value = false
  userMenuOpen.value = false
})

onMounted(() => {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (!target.closest('[data-user-menu]')) {
      userMenuOpen.value = false
    }
  })
})

const currentPageLabel = computed(() => NAV_ITEMS.find(i => i.path === route.path)?.label ?? 'Inicio')
const userName = computed(() => authStore.user?.email?.split('@')?.[0]?.toUpperCase() ?? '')

function handleLogout() {
  authStore.logout()
  router.replace('/login')
}

function isActive(path: string) {
  return route.path === path
}
</script>

<template>
  <div class="flex min-h-screen bg-gray-background">

    <!-- Sidebar desktop -->
    <aside :class="cn(
      'hidden lg:flex flex-col bg-white border-r border-gray-25 shrink-0 relative transition-all duration-300',
      sidebarOpen ? 'w-80' : 'w-0 overflow-hidden border-r-0',
    )">
      <div class="flex items-center px-6 py-5">
        <IconsLogoSvg :width="148" :height="35" color="secondary" />
      </div>

      <nav class="flex flex-col flex-1">
        <NuxtLink v-for="item in NAV_ITEMS" :key="item.path" :to="item.path" :class="cn(
          'flex items-center gap-3 px-6 py-4 transition-colors',
          isActive(item.path) ? 'bg-gray-10' : 'hover:bg-gray-10',
        )">
          <component :is="item.icon" class="w-6 h-6 shrink-0" />
          <UiBaseText size="base" :weight="isActive(item.path) ? 'semibold' : 'regular'"
            :color="isActive(item.path) ? 'secondary' : 'gray-60'">
            {{ item.label }}
          </UiBaseText>
          <div v-if="item.badge" class="bg-secondary px-2 py-0.5 rounded-lg">
            <UiBaseText as="p" color="white" weight="bold" size="sm">
              {{ item.badge }}
            </UiBaseText>
          </div>
        </NuxtLink>
      </nav>

      <!-- Collapse button -->
      <button type="button"
        class="absolute -right-4 top-4 w-7 h-7 bg-gray-21 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-10 transition-colors z-10"
        @click="sidebarOpen = false">
        <Icon name="heroicons:chevron-left" class="w-4 h-4 text-secondary" />
      </button>
    </aside>

    <!-- Main -->
    <div class="flex-1 flex flex-col min-w-0 h-screen">

      <!-- Header desktop -->
      <header class="hidden lg:flex items-center gap-4 mx-7 h-16 border-b border-gray-25">
        <!-- Expand button (visible when sidebar is closed) -->
        <button v-if="!sidebarOpen" type="button"
          class=" w-7 h-7 bg-gray-21 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-10 transition-colors shrink-0"
          @click="sidebarOpen = true">
          <Icon name="heroicons:chevron-right" class="w-4 h-4 text-secondary" />
        </button>

        <UiBaseText size="2xl" weight="bold" color="secondary" as="h1">{{ currentPageLabel }}</UiBaseText>

        <div class="flex-1 flex justify-center">
          <UiBaseText size="base" color="secondary" as="p" weight="medium">
            Horario: Lunes a viernes 9:00 am a 7:00 pm<br>Sábados de 09:00 am a 2:00 pm
          </UiBaseText>
        </div>

        <div class="flex items-center gap-1">
          <UiBaseText size="base" weight="medium" color="secondary">Tienes</UiBaseText>
          <UiBaseText size="base" weight="bold" color="secondary">{{ koinsStore.totalKoins }}</UiBaseText>
          <UiBaseText size="base" weight="medium" color="secondary">Koinks</UiBaseText>
          <img src="/images/coin.png" alt="Koinks" width="20" height="20" loading="lazy" />
        </div>

        <div data-user-menu class="relative flex items-center gap-2 border-l border-gray-25 pl-4">
          <IconsPersonSvg />
          <button type="button" class="flex items-center gap-1" @click="userMenuOpen = !userMenuOpen">
            <UiBaseText size="sm" weight="semibold" color="secondary">{{ userName }}</UiBaseText>
            <Icon name="heroicons:chevron-down" class="w-4 h-4 text-secondary transition-transform"
              :class="{ 'rotate-180': userMenuOpen }" />
          </button>

          <Transition name="fade">
            <div v-if="userMenuOpen"
              class="absolute top-full right-0 mt-2 w-44 bg-white border border-gray-25 rounded-lg shadow-md z-50 overflow-hidden">
              <button type="button" class="flex items-center gap-2 w-full px-4 py-3 hover:bg-gray-10 transition-colors"
                @click="() => { userMenuOpen = false; handleLogout() }">
                <Icon name="heroicons:arrow-right-on-rectangle" class="w-4 h-4 text-secondary" />
                <UiBaseText size="sm" weight="medium" color="secondary">Cerrar sesión</UiBaseText>
              </button>
            </div>
          </Transition>
        </div>
      </header>

      <!-- Header mobile -->
      <header class="flex lg:hidden items-center justify-between px-base h-14 bg-white border-b border-gray-25">
        <IconsLogoSvg :width="120" :height="28" color="secondary" />
        <button type="button" class="text-secondary" @click="mobileMenuOpen = !mobileMenuOpen">
          <Icon name="heroicons:bars-3" class="w-6 h-6" />
        </button>
      </header>

      <!-- Mobile drawer backdrop -->
      <Transition name="fade">
        <div v-if="mobileMenuOpen" class="fixed inset-0 bg-black/40 z-40 lg:hidden" @click="mobileMenuOpen = false" />
      </Transition>

      <!-- Mobile drawer -->
      <Transition name="slide-right">
        <div v-if="mobileMenuOpen" class="fixed top-0 left-0 bottom-0 w-72 bg-white z-50 lg:hidden flex flex-col">
          <div class="flex items-center justify-between px-base py-4 border-b border-gray-25">
            <IconsLogoSvg :width="120" :height="28" color="secondary" />
            <button type="button" @click="mobileMenuOpen = false">
              <Icon name="heroicons:x-mark" class="w-5 h-5 text-gray-40" />
            </button>
          </div>

          <nav class="flex flex-col py-2 flex-1 overflow-y-auto">
            <NuxtLink v-for="item in NAV_ITEMS" :key="item.path" :to="item.path" :class="cn(
              'flex items-center gap-3 px-base py-3 transition-colors',
              isActive(item.path) ? 'bg-gray-10' : 'hover:bg-gray-10',
            )">
              <component :is="item.icon" class="w-5 h-5 shrink-0" />
              <UiBaseText size="sm" :weight="isActive(item.path) ? 'semibold' : 'regular'"
                :color="isActive(item.path) ? 'secondary' : 'gray-60'">
                {{ item.label }}
              </UiBaseText>
              <div v-if="item.badge" class="bg-secondary px-2 py-0.5 rounded-lg">
                <UiBaseText as="p" color="white" weight="bold" size="sm">
                  {{ item.badge }}
                </UiBaseText>
              </div>
            </NuxtLink>
          </nav>

          <button type="button" class="flex items-center gap-2 px-base py-4 border-t border-gray-25"
            @click="handleLogout">
            <Icon name="heroicons:arrow-right-on-rectangle" class="w-5 h-5 text-secondary" />
            <UiBaseText size="sm" weight="medium" color="secondary">Cerrar sesión</UiBaseText>
          </button>
        </div>
      </Transition>

      <!-- Page content -->
      <main class="flex-1 flex flex-col overflow-hidden">
        <slot />
      </main>
    </div>

    <!-- WhatsApp floating button -->
    <a href="https://wa.me/51934737663" target="_blank" rel="noopener noreferrer" class="fixed bottom-6 right-6 z-50"
      aria-label="Contactar por WhatsApp">
      <IconsWhatsappSvg class="w-14 h-14" />
    </a>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-right-enter-active {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-right-leave-active {
  transition: transform 0.22s cubic-bezier(0.4, 0, 1, 1);
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(-100%);
}
</style>
