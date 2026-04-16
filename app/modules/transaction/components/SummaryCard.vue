<script setup lang="ts">
import type { TransactionSummary } from '~/stores/transaction'
import SummaryRow from './SummaryRow.vue'
import { ECurrency } from '~/enums/currency.enum';

interface IProps {
  summary: TransactionSummary
}

const props = defineProps<IProps>()

const currencySymbol = (currency: string) => currency === ECurrency.USD ? '$' : 'S/'

const displaySend = computed(() =>
  `${currencySymbol(props.summary.sendCurrency)} ${props.summary.sendAmount}`
)

const displayReceive = computed(() =>
  `${currencySymbol(props.summary.receiveCurrency)} ${props.summary.receiveAmount}`
)

const displayBuyRate = computed(() => props.summary.buyRate.toFixed(2))
const displaySellRate = computed(() => props.summary.sellRate.toFixed(2))
</script>

<template>
  <div class="bg-white rounded-xl overflow-hidden border border-gray-25">
    <div class="px-5 py-4 flex flex-col gap-2.5">
      <SummaryRow label="Tú envías" :value="displaySend" />
      <SummaryRow label="Tú recibes" :value="displayReceive" />
      <SummaryRow v-if="summary.coupon" label="Cupón aplicado" :value="summary.coupon" />

      <div class="h-px bg-secondary" />

      <div class="flex items-center justify-between">
        <UiBaseText size="sm" class="lg:text-base" weight="bold" color="secondary">Tipo de cambio utilizado</UiBaseText>
        <div class="flex items-center gap-2">
          <UiBaseText size="sm" color="red" weight="bold" class="lg:text-base line-through">{{ displayBuyRate }}
          </UiBaseText>
          <UiBaseText size="base" class="lg:text-base" weight="bold" color="secondary">{{ displaySellRate }}
          </UiBaseText>
        </div>
      </div>
    </div>
  </div>
</template>
