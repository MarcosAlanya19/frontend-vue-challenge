<script setup lang="ts">
import CalculatorCard from '~/modules/calculator/containers/CalculatorCard.vue'

definePageMeta({ layout: 'main', middleware: ['auth'] })
</script>

<template>
  <div class="w-full h-full overflow-y-auto pt-6 lg:pt-10">
    <CalculatorCard />
  </div>
</template>
