<script setup lang="ts">
import PersonalDataForm from "~/modules/onboarding/components/PersonalDataForm/index.vue";
import type { PersonalDataFormData } from "~/modules/onboarding/components/PersonalDataForm/index.schema";
import { useRegister } from "~/modules/onboarding/composables/useRegister";

const router = useRouter();
const { data, handle } = useRegister();

const onSubmit = async (formData: PersonalDataFormData) => {
  await handle({
    fullName: formData.fullName,
    documentType: formData.documentType,
    documentNumber: formData.documentNumber,
    phone: formData.phone,
    birthDate: formData.birthDate,
  });

  if (!data.value) return;

  router.push({
    path: "/onboarding/success",
    query: { name: formData.fullName.split(" ")[0], email: data.value },
  });
};
</script>

<template>
  <div class="grid gap-10 lg:max-w-xl lg:bg-white lg:rounded-xl lg:shadow-sm px-6 lg:px-16 py-10">
    <div class="text-center">
      <UiBaseText as="h1" weight="bold" size="2xl" color="secondary">
        Completa tus datos
      </UiBaseText>
    </div>

    <PersonalDataForm @submit="onSubmit" />
  </div>

  <UiErrorBottomSheet />
</template>
