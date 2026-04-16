<script setup lang="ts">
import SuccessContainer from '~/modules/transaction/containers/SuccessContainer.vue'

definePageMeta({ layout: 'transaction', middleware: ['auth'] })
useSeoMeta({ title: 'Operación creada - Kambista' })
</script>

<template>
  <SuccessContainer />
</template>
