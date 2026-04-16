<script setup lang="ts">
import { useForm } from 'vee-validate'
import { ECurrency } from '~/enums/currency.enum'
import { ROUTES } from '~/constants/routes'
import AccountSelectorField from '../components/AccountSelectorField.vue'
import SummaryCard from '../components/SummaryCard.vue'
import { useGetBankAccounts } from '../composables/useGetBankAccounts'
import { useGetSourceFunds } from '../composables/useGetSourceFunds'

const transactionStore = useTransactionStore()
const router = useRouter()

if (!transactionStore.summary) {
  router.replace(ROUTES.home)
}

const summary = computed(() => transactionStore.summary)
const showInfoHighlight = ref(true)
const showWarningHighlight = ref(true)

const { data: bankOptions, handle: loadBankAccounts } = useGetBankAccounts()
const { data: fundSourceOptions, handle: loadSourceFunds } = useGetSourceFunds()

const accountOptions = [
  { label: 'Alias - PEN', value: 'acc-1', subtitle: '4444444444444444' },
  { label: 'Alias - Soles', value: 'acc-2', subtitle: '4444444444444444' },
  { label: 'Mi BCP', value: 'acc-3', subtitle: '4444444444444444' },
]

onMounted(() => {
  loadBankAccounts()
  loadSourceFunds()
})

const { handleSubmit, values } = useForm({
  initialValues: {
    sourceBankId: '',
    destinationAccountId: '',
    sourceFundId: '',
  },
})

const isValid = computed(() =>
  !!values.sourceBankId && !!values.destinationAccountId && !!values.sourceFundId
)

const selectedBankLabel = computed(() => bankOptions.value.find(b => b.value === values.sourceBankId)?.label ?? '')
const selectedAccountLabel = computed(() => accountOptions.find(a => a.value === values.destinationAccountId)?.label ?? '')

const onSubmit = handleSubmit(() => {
  transactionStore.setStep1Data({
    sourceBankId: values.sourceBankId,
    sourceBankLabel: selectedBankLabel.value,
    destinationAccountId: values.destinationAccountId,
    destinationAccountLabel: selectedAccountLabel.value,
    sourceFundId: values.sourceFundId,
  })
  router.push(ROUTES.transaction.transfer)
})
</script>

<template>
  <div class="flex-1 overflow-y-auto">
    <UiBaseText size="2xl" weight="bold" color="secondary" as="h1" class="text-center pt-8 lg:pt-9 pb-5 lg:pb-11">
      Completa los datos de tu operación
    </UiBaseText>

    <div class="w-full max-w-[410px] mx-auto px-6 lg:px-0 pb-8 flex flex-col gap-5">
      <SummaryCard v-if="summary" :summary="summary" />

      <div v-if="showInfoHighlight" class="relative">
        <UiBaseHighlight variant="info">
          <UiBaseText as="p" weight="medium" size="sm" color="blue">
            Tiempo estimado de espera <UiBaseText size="sm" weight="bold" color="blue">BCP, Interbank, BanBif y
              Pichincha</UiBaseText>: 15 minutos (Aplica para cualquier monto). <UiBaseText size="sm" weight="bold"
              color="blue">Otros bancos:</UiBaseText> 1 día útil.
          </UiBaseText>
        </UiBaseHighlight>
        <button type="button" class="absolute top-3 right-3 text-gray-40 hover:text-secondary"
          @click="showInfoHighlight = false">
          <Icon name="heroicons:x-mark" class="w-4 h-4" />
        </button>
      </div>

      <form class="flex flex-col gap-5" @submit.prevent="onSubmit">
        <FormSelect name="sourceBankId" label="¿Desde qué banco nos envías tu dinero?" :options="bankOptions" />

        <AccountSelectorField name="destinationAccountId" label="¿En qué cuenta deseas recibir tu dinero?"
          :options="accountOptions" :currency="summary?.receiveCurrency ?? ECurrency.PEN" />

        <div v-if="showWarningHighlight" class="relative">
          <UiBaseHighlight variant="warning">
            <UiBaseText as="p" weight="medium" size="sm" color="brown">
              Recuerda que las cuentas deben estar <UiBaseText size="sm" weight="bold" color="brown">a tu nombre.
              </UiBaseText>
              Kambista no transfiere a <UiBaseText size="sm" weight="bold" color="brown">cuentas de terceros.
              </UiBaseText>
            </UiBaseText>
          </UiBaseHighlight>
          <button type="button" class="absolute top-3 right-3 text-gray-40 hover:text-secondary"
            @click="showWarningHighlight = false">
            <Icon name="heroicons:x-mark" class="w-4 h-4" />
          </button>
        </div>

        <FormSelect name="sourceFundId" label="Origen de fondos" sheet-title="Origen de fondos"
          :options="fundSourceOptions" placeholder="Selecciona" />

        <UiBaseButton label="Continuar" type="submit" :disabled="!isValid" class="mt-2" />
      </form>
    </div>
  </div>
</template>
