<script setup lang="ts">
import CalculatorForm from '../components/CalculatorForm.vue'
import { useCalculateExchange } from '../composables/useCalculateExchange'
import { useExchangeRate } from '../composables/useExchangeRate'
import type { TransactionSummary } from '~/stores/transaction'

const { data: exchangeRate, isLoading: isLoadingRate, handle: fetchRate } = useExchangeRate()
const { data: calcResult, isLoading: isCalculating, handle: calculate } = useCalculateExchange()
const transactionStore = useTransactionStore()
const router = useRouter()

const formRef = ref<InstanceType<typeof CalculatorForm> | null>(null)

onMounted(async () => {
  await fetchRate()
  formRef.value?.triggerInitialCalculate()
})

async function onCalculate(params: { originCurrency: string; destinationCurrency: string; amount: number }) {
  await calculate(params)
  return calcResult.value
}

function handleStart(summary: TransactionSummary) {
  transactionStore.setSummary(summary)
  router.push('/transaction/create')
}
</script>

<template>
  <CalculatorForm ref="formRef" :exchange-rate="exchangeRate" :is-loading-rate="isLoadingRate"
    :is-calculating="isCalculating" :on-calculate="onCalculate" @start="handleStart" />
</template>
