<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { Form, useForm, type GenericObject } from 'vee-validate';
import BaseButton from '~/components/ui/BaseButton.vue';
import BaseHighlight from '~/components/ui/BaseHighlight.vue';
import { DOC_TYPE_OPTIONS, PREVIOUS_EXCHANGE_OPTIONS } from '~/modules/onboarding/constants';
import { personalDataSchema, type PersonalDataFormData } from './index.schema';

const emit = defineEmits<{
  submit: [data: PersonalDataFormData]
}>()

const schema = toTypedSchema(personalDataSchema)

const { meta, validateField, values } = useForm({
  validationSchema: toTypedSchema(personalDataSchema),
})

watch(() => values.documentType, () => {
  if (values.documentNumber) validateField('documentNumber')
})

const onSubmit = (data: GenericObject) => {
  emit('submit', data as PersonalDataFormData)
}
</script>

<template>
  <Form :validation-schema="schema" mode="eager" class="flex flex-col gap-base" @submit="onSubmit" v-slot="{ meta }">
    <FormInput name="fullName" label="Nombres completos" placeholder="Escribe tus nombres y apellidos" />

    <!-- Documento row -->
    <div class="flex flex-col gap-1">
      <UiBaseText size="base" weight="medium" color="gray-60">Documento</UiBaseText>
      <div class="grid grid-cols-2 gap-sm">
        <FormPickerInput name="documentType" placeholder="Tipo" :options="DOC_TYPE_OPTIONS" />
        <FormInput name="documentNumber" placeholder="Nº de documento" />
      </div>
    </div>

    <BaseHighlight variant="info">
      Tu documento de identidad debe coincidir con tus datos para evitar
      inconvenientes al momento de hacer una primera operación
    </BaseHighlight>

    <!-- Celular + Fecha row -->
    <div class="flex gap-sm">
      <div class="flex-1">
        <FormInput name="phone" label="Celular" placeholder="N° de celular" type="tel" />
      </div>
      <div class="flex-1">
        <FormDateInput name="birthDate" label="Fecha de nacimiento" placeholder="DD/MM/AAAA" />
      </div>
    </div>

    <FormPickerInput name="previousExchange" label="¿Dónde cambiabas antes? (Opcional)"
      placeholder="Último lugar de cambio" :options="PREVIOUS_EXCHANGE_OPTIONS" />

    <!-- Checkboxes -->
    <div class="flex flex-col gap-sm pt-2">
      <FormCheckbox name="termsAccepted">
        <span class="text-sm font-medium text-secondary">
          He leído y acepto los
          <span class="font-bold underline">Términos y condiciones</span>
        </span>
      </FormCheckbox>

      <FormCheckbox name="privacyAccepted">
        <span class="text-sm font-medium text-secondary">
          Acepto de manera expresa e informada la
          <span class="font-bold underline">Política de Tratamiento de datos personales de Kambista</span>
        </span>
      </FormCheckbox>
    </div>

    <div class="pt-4">
      <BaseButton type="submit" label="Registrarme" :disabled="!meta.valid" />
    </div>
  </Form>
</template>
