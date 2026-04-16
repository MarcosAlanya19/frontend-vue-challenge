<script setup lang="ts">
import ReceiptContainer from '~/modules/transaction/containers/ReceiptContainer.vue'

definePageMeta({ layout: 'transaction', middleware: ['auth'] })
useSeoMeta({ title: 'Envía tu constancia - Kambista' })
</script>

<template>
  <ReceiptContainer />
</template>
