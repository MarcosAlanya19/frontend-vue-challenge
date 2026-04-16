<script setup lang="ts">
import PersonalDataContainer from "~/modules/onboarding/containers/PersonalDataContainer.vue";

definePageMeta({ layout: "onboarding", middleware: ["guest"] });
</script>

<template>
  <PersonalDataContainer />
</template>
