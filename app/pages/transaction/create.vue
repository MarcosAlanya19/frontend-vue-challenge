<script setup lang="ts">
import CreateTransactionContainer from '~/modules/transaction/containers/CreateTransactionContainer.vue'

definePageMeta({ layout: 'transaction', middleware: ['auth'] })
</script>

<template>
  <CreateTransactionContainer />
</template>
