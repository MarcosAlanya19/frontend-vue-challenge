<script setup lang="ts">
import SuccessContainer from '~/modules/transaction/containers/SuccessContainer.vue'

definePageMeta({ layout: 'transaction', middleware: ['auth'] })
</script>

<template>
  <SuccessContainer />
</template>
