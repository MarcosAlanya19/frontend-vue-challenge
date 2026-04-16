<script setup lang="ts">
const route = useRoute();
const router = useRouter();

const name = computed(() => (route.query.name as string) || "");
</script>

<template>
  <div class="flex flex-col items-center w-full px-base py-8 lg:py-xl gap-8 max-w-sm lg:max-w-md mx-auto">
    <UiBaseText as="p" size="base" weight="bold" color="secondary" class="lg:hidden">
      Perfil creado con éxito
    </UiBaseText>
    <img src="/images/celphone.png" alt="Kambista app" class="w-44 lg:w-32 h-auto object-contain" />

    <div class="flex flex-col gap-4 w-full">
      <UiBaseText as="h1" size="2xl" color="secondary" weight="bold" class="text-center">
        ¡Felicitaciones {{ name }},<br>tu perfil ha sido creado!
      </UiBaseText>

      <UiBaseText as="p" size="base" weight="regular" color="gray-60" class="text-center leading-6">
        Ya puedes empezar a <em>Kambiar</em> con la mejor tasa del mercado
      </UiBaseText>
    </div>

    <div class="w-full pt-2">
      <UiBaseButton label="Continuar" @click="router.replace('/login')" />
    </div>
  </div>
</template>
