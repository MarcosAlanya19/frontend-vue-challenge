<script setup lang="ts">
import TransferContainer from '~/modules/transaction/containers/TransferContainer.vue'

definePageMeta({ layout: 'transaction', middleware: ['auth'] })
useSeoMeta({ title: 'Transfiere a Kambista - Kambista' })
</script>

<template>
  <TransferContainer />
</template>
