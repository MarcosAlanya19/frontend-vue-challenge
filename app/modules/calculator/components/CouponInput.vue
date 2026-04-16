<script setup lang="ts">
const coupon = defineModel<string>({ default: '' })
const emit = defineEmits<{ (e: 'apply'): void }>()
</script>

<template>
  <div class="mx-3.5 lg:mx-14 my-base flex items-center border border-gray-25 rounded-lg overflow-hidden"
    style="box-shadow: 0px 4px 4px 0px rgba(0,0,0,0.06);">
    <div class="pl-base items-center shrink-0 hidden md:flex">
      <img src="/images/coupon.png" />
    </div>
    <input v-model="coupon" type="text" placeholder="Ingresa el cupón"
      class="flex-1 h-[52px] px-sm text-sm text-secondary placeholder:text-gray-40 bg-white outline-none border-0 ring-0 focus:ring-0 p-0 text-center pl-0 md:pl-sm" />
    <button type="button" class="h-[52px] px-lg bg-secondary shrink-0" @click="emit('apply')">
      <UiBaseText size="sm" weight="semibold" color="white" class="tracking-wide">APLICAR</UiBaseText>
    </button>
  </div>
</template>
