<script setup lang="ts">
import PersonalDataContainer from "~/modules/onboarding/containers/PersonalDataContainer.vue";

definePageMeta({ layout: "onboarding", middleware: ["guest"] });
useSeoMeta({ title: "Registro - Kambista", description: "Completa tus datos personales para crear tu cuenta en Kambista." });
</script>

<template>
  <PersonalDataContainer />
</template>
