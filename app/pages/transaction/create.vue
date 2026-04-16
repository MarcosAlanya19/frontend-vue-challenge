<script setup lang="ts">
import CreateTransactionContainer from '~/modules/transaction/containers/CreateTransactionContainer.vue'

definePageMeta({ layout: 'transaction', middleware: ['auth'] })
useSeoMeta({ title: 'Completa tu operación - Kambista' })
</script>

<template>
  <CreateTransactionContainer />
</template>
