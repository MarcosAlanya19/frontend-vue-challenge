<script setup lang="ts">
import SuccessView from "~/modules/onboarding/components/SuccessView.vue";

definePageMeta({
  layout: "onboarding",
  middleware: ["guest"],
  hideBackButton: true,
});
</script>

<template>
  <SuccessView />
</template>
