<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import type { ICalculate } from '../types/calculate.type'
import type { IExchangeRate } from '../types/exchange-rate.type'
import { EActiveField } from '../enums/active-field.enum'
import { ECurrency } from '~/enums/currency.enum'
import { getCurrencies } from '../lib/get-currencies'
import { getKoins } from '../lib/get-koins'
import CouponInput from './CouponInput.vue'
import CurrencyRow from './CurrencyRow.vue'
import PromoBanner from './PromoBanner.vue'
import RateTabs from './RateTabs.vue'
import SavingsRow from './SavingsRow.vue'

interface IProps {
  exchangeRate: IExchangeRate | null
  isLoadingRate: boolean
  isCalculating: boolean
  onCalculate: (params: { originCurrency: string; destinationCurrency: string; amount: number }) => Promise<ICalculate | null>
}

const props = defineProps<IProps>()

const emit = defineEmits<{
  start: [summary: {
    sendAmount: string
    receiveAmount: string
    sendCurrency: ECurrency
    receiveCurrency: ECurrency
    coupon: string
    buyRate: number
    sellRate: number
    koins: number
  }]
}>()

// UI state
const isCompra = ref(true)
const lastActiveField = ref<EActiveField>(EActiveField.Send)
const sendAmount = ref('1000')
const receiveAmount = ref('')
const savings = ref('0.00')
const coupon = ref('')
const swapDeg = ref(0)

// Derived display values
const sendCurrencyLabel = computed(() => isCompra.value ? 'Dólares' : 'Soles')
const receiveCurrencyLabel = computed(() => isCompra.value ? 'Soles' : 'Dólares')
const sendCurrency = computed(() => isCompra.value ? ECurrency.USD : ECurrency.PEN)
const receiveCurrency = computed(() => isCompra.value ? ECurrency.PEN : ECurrency.USD)
const rate = computed(() => isCompra.value ? (props.exchangeRate?.bid ?? 0) : (props.exchangeRate?.ask ?? 0))
const koins = computed(() => getKoins(parseFloat(sendAmount.value.replace(',', '.')) || 0, isCompra.value, rate.value))

const canStart = computed(() =>
  !props.isLoadingRate
  && parseFloat(sendAmount.value) > 0
  && parseFloat(receiveAmount.value) > 0
)

// Core calculation
const performCalculate = async (value: string, field: EActiveField, compra: boolean) => {
  const amount = parseFloat(value.replace(',', '.')) || 0
  if (!amount) {
    if (field === EActiveField.Send) receiveAmount.value = '0.00'
    else sendAmount.value = '0.00'
    return
  }

  const { origin, destination } = getCurrencies(field, compra)
  const result = await props.onCalculate({ originCurrency: origin, destinationCurrency: destination, amount })
  if (!result?.data.operate) return

  const formatted = result.exchange.toFixed(2)
  if (field === EActiveField.Send) receiveAmount.value = formatted
  else sendAmount.value = formatted
  savings.value = result.savings.amount
}

const debouncedCalculate = useDebounceFn(performCalculate, 500)

const handleSendAmountChange = (value: string) => {
  sendAmount.value = value
  lastActiveField.value = EActiveField.Send
  debouncedCalculate(value, EActiveField.Send, isCompra.value)
}

const handleReceiveAmountChange = (value: string) => {
  receiveAmount.value = value
  lastActiveField.value = EActiveField.Receive
  debouncedCalculate(value, EActiveField.Receive, isCompra.value)
}

const handleToggleRate = (compra: boolean) => {
  isCompra.value = compra
  swapDeg.value += 360
  const current = lastActiveField.value === EActiveField.Send ? sendAmount.value : receiveAmount.value
  if (parseFloat(current)) performCalculate(current, lastActiveField.value, compra)
}

const handleSwap = () => {
  const newIsCompra = !isCompra.value
  isCompra.value = newIsCompra
  swapDeg.value += 360
  const current = lastActiveField.value === EActiveField.Send ? sendAmount.value : receiveAmount.value
  if (parseFloat(current)) performCalculate(current, lastActiveField.value, newIsCompra)
}

const handleStart = () => {
  emit('start', {
    sendAmount: sendAmount.value,
    receiveAmount: receiveAmount.value,
    sendCurrency: sendCurrency.value,
    receiveCurrency: receiveCurrency.value,
    coupon: coupon.value,
    buyRate: props.exchangeRate?.bid ?? 0,
    sellRate: props.exchangeRate?.ask ?? 0,
    koins: koins.value,
  })
}

// Expose initial calculation trigger for container
defineExpose({ triggerInitialCalculate: () => performCalculate('1000', EActiveField.Send, true) })
</script>

<template>
  <div class="w-full max-w-2xl mx-auto px-base py-8 flex flex-col gap-base lg:gap-10">

    <!-- Calculator card -->
    <div class="bg-white rounded-xl overflow-hidden" style="box-shadow: 0px 2px 12px 0px rgba(0,0,0,0.08);">

      <!-- Buy / Sell tabs -->
      <RateTabs :buy-rate="exchangeRate?.bid ?? 0" :sell-rate="exchangeRate?.ask ?? 0" :is-loading="isLoadingRate"
        :is-compra="isCompra" @toggle="handleToggleRate" />

      <!-- Currency inputs -->
      <div class="px-3.5 lg:px-14 mt-8 flex flex-col">
        <CurrencyRow label="¿Cuánto envías?" :currency-label="sendCurrencyLabel" :amount="sendAmount"
          :is-calculating="isCalculating && lastActiveField === EActiveField.Receive"
          @update:amount="handleSendAmountChange" />

        <!-- Swap button -->
        <div class="flex justify-end relative z-10 -my-[26px]" style="padding-right: 94px;">
          <div class="w-[62px] h-[62px] rounded-full flex items-center justify-center shrink-0"
            style="background: rgba(25,34,50,0.19); box-shadow: 0px 3px 25px 0px rgba(0,0,0,0.15);">
            <button type="button"
              class="w-[38px] h-[38px] rounded-full bg-white flex items-center justify-center shadow"
              @click="handleSwap">
              <div :style="{ transform: `rotate(${swapDeg}deg)`, transition: 'transform 0.4s ease' }">
                <IconsReloadSvg />
              </div>
            </button>
          </div>
        </div>

        <CurrencyRow label="Entonces recibes" :currency-label="receiveCurrencyLabel" :amount="receiveAmount"
          :is-calculating="isCalculating && lastActiveField === EActiveField.Send"
          @update:amount="handleReceiveAmountChange" />
      </div>

      <!-- Savings + Koinks -->
      <SavingsRow :savings="savings" :koins="koins" />

      <!-- Coupon -->
      <CouponInput v-model="coupon" @apply="() => { }" />

      <!-- Promo banner -->
      <PromoBanner />
    </div>

    <!-- CTA -->
    <UiBaseButton label="Iniciar operación" :disabled="!canStart" @click="handleStart" />
  </div>
</template>
