<script setup lang="ts">
import TransferContainer from '~/modules/transaction/containers/TransferContainer.vue'

definePageMeta({ layout: 'transaction', middleware: ['auth'] })
</script>

<template>
  <TransferContainer />
</template>
