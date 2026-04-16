<script setup lang="ts">
import ReceiptContainer from '~/modules/transaction/containers/ReceiptContainer.vue'

definePageMeta({ layout: 'transaction', middleware: ['auth'] })
</script>

<template>
  <ReceiptContainer />
</template>
