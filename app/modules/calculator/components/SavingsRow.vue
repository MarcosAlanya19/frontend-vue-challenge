<script setup lang="ts">
defineProps<{ savings: string; koins: number }>()
</script>

<template>
  <div class="flex justify-between px-3.5 lg:px-14 pt-base">
    <div>
      <UiBaseText size="base" weight="medium" color="secondary">Ahorro estimado:</UiBaseText>
      <br />
      <UiBaseText size="base" weight="semibold" color="secondary">S/ {{ savings }}</UiBaseText>
    </div>
    <div class="text-right">
      <UiBaseText size="base" weight="medium" color="secondary">Koinks:</UiBaseText>
      <div class="flex items-center gap-xs justify-end mt-0.5">
        <Icon name='lucide:info' />

        <UiBaseText size="base" weight="semibold" color="secondary">{{ koins.toLocaleString() }}</UiBaseText>
        <img src="/images/coin.png" />
      </div>
    </div>
  </div>
</template>
