<script setup lang="ts">
import { useForm } from 'vee-validate'
import { ROUTES } from '~/constants/routes'

const transactionStore = useTransactionStore()
const router = useRouter()

if (!transactionStore.summary || !transactionStore.transactionId) {
  router.replace(ROUTES.home)
}

const { handleSubmit, values } = useForm({
  initialValues: {
    receiptFile: '',
    receiptUri: '',
  },
})

const isValid = computed(() => !!values.receiptFile && !!values.receiptUri)

const onSubmit = handleSubmit(() => {
  router.push(ROUTES.transaction.success)
})
</script>

<template>
  <div class="flex-1 overflow-y-auto">
    <div class="w-full max-w-xl mx-auto px-base py-8 flex flex-col gap-6 items-center">

      <div class="w-full bg-white rounded-xl border border-gray-25 overflow-hidden">
        <div class="flex flex-col items-center p-5 lg:p-8 gap-4">

          <div class="w-32 h-auto flex items-center justify-center">
            <img src="/images/voucher.png" alt="Envía tu constancia" width="130" height="70" class="object-contain" loading="lazy" />
          </div>

          <UiBaseText size="xl" weight="bold" color="secondary" as="h2" class="hidden lg:block text-center">
            Envía tu constancia
          </UiBaseText>

          <UiBaseText size="md" color="secondary" as="p" class="lg:text-center">
            Adjunta la constancia de tu transferencia para poder verificar tu operación.
          </UiBaseText>

          <form class="w-full flex flex-col gap-4 mt-2" @submit.prevent="onSubmit">
            <div class="py-3 px-3 lg:px-5 border border-gray-23 rounded-md">
              <FormFileUpload name="receiptFile" uri-name="receiptUri" label="Sube el archivo de tu constancia"
                placeholder="Selecciona archivo" />
            </div>

            <div class="flex flex-col mt-2">
              <UiBaseText as="h3" size="base" weight="bold" color="gray-66">Recuerda:</UiBaseText>
              <ul class="flex flex-col gap-2 pl-2">
                <li class="flex items-start gap-2">
                  <div class="w-1.5 h-1.5 rounded-full bg-gray-40 mt-2 shrink-0" />
                  <UiBaseText size="base" color="gray-66" class="leading-5">
                    El voucher enviado debe tener el <UiBaseText size="base" weight="bold" color="gray-66">monto, datos
                      del beneficiario, fecha y hora.</UiBaseText>
                  </UiBaseText>
                </li>
                <li class="flex items-start gap-2">
                  <div class="w-1.5 h-1.5 rounded-full bg-gray-40 mt-2 shrink-0" />
                  <UiBaseText size="base" color="gray-66" class="leading-5">El voucher debe ser legible</UiBaseText>
                </li>
                <li class="flex items-start gap-2">
                  <div class="w-1.5 h-1.5 rounded-full bg-gray-40 mt-2 shrink-0" />
                  <UiBaseText size="base" color="gray-66" class="leading-5">
                    Archivos permitidos <UiBaseText size="base" weight="bold" color="gray-66">imágenes, word y
                      PDF</UiBaseText>
                  </UiBaseText>
                </li>
              </ul>
            </div>
          </form>
        </div>
      </div>

      <UiBaseButton label="Enviar constancia" :disabled="!isValid" class="w-full" @click="onSubmit" />
    </div>
  </div>
</template>
