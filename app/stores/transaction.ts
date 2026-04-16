import { defineStore } from 'pinia'

interface ExchangeRate {
  purchasePrice: number
  salePrice: number
  currency: string
}

export interface TransactionSummary {
  sendAmount: string
  receiveAmount: string
  sendCurrency: 'PEN' | 'USD'
  receiveCurrency: 'PEN' | 'USD'
  coupon: string
  buyRate: number
  sellRate: number
}

export interface TransactionStep1Data {
  sourceBankId: string
  sourceBankLabel: string
  destinationAccountId: string
  destinationAccountLabel: string
  sourceFundId: string
}

export const useTransactionStore = defineStore('transaction', () => {
  const exchangeRate = ref<ExchangeRate | null>(null)
  const originAmount = ref<number>(0)
  const destinationAmount = ref<number>(0)
  const originCurrency = ref<'PEN' | 'USD'>('PEN')
  const destinationCurrency = ref<'PEN' | 'USD'>('USD')

  const summary = ref<TransactionSummary | null>(null)
  const step1Data = ref<TransactionStep1Data | null>(null)
  const transactionId = ref<string | null>(null)

  function setExchangeRate(rate: ExchangeRate) {
    exchangeRate.value = rate
  }

  function setAmounts(origin: number, destination: number) {
    originAmount.value = origin
    destinationAmount.value = destination
  }

  function swapCurrencies() {
    const temp = originCurrency.value
    originCurrency.value = destinationCurrency.value
    destinationCurrency.value = temp
  }

  function setSummary(data: TransactionSummary) {
    summary.value = data
  }

  function setStep1Data(data: TransactionStep1Data) {
    step1Data.value = data
  }

  function setTransactionId(id: string) {
    transactionId.value = id
  }

  function reset() {
    summary.value = null
    step1Data.value = null
    transactionId.value = null
  }

  return {
    exchangeRate,
    originAmount,
    destinationAmount,
    originCurrency,
    destinationCurrency,
    summary,
    step1Data,
    transactionId,
    setExchangeRate,
    setAmounts,
    swapCurrencies,
    setSummary,
    setStep1Data,
    setTransactionId,
    reset,
  }
})
