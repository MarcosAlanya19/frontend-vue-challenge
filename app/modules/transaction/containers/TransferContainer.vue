<script setup lang="ts">
import { ECurrency } from '~/enums/currency.enum'
import CopyButton from '../components/CopyButton.vue'
import DetailRow from '../components/DetailRow.vue'

const transactionStore = useTransactionStore()
const koinsStore = useKoinsStore()
const router = useRouter()

if (!transactionStore.summary || !transactionStore.step1Data) {
  router.replace('/')
}

const summary = computed(() => transactionStore.summary)

const currencySymbol = (currency: string) => currency === ECurrency.USD ? '$' : 'S/'

const updateTime = computed(() => {
  const now = new Date()
  now.setMinutes(now.getMinutes() + 15)
  return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
})

const kambistaAccount = computed(() => {
  const sendCurrency = summary.value?.sendCurrency ?? ECurrency.USD
  return {
    bank: 'Interbank',
    amount: `${currencySymbol(sendCurrency)} ${Number(summary.value?.sendAmount ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
    rawAmount: summary.value?.sendAmount ?? '0',
    accountNumber: '201010000000000',
    ruc: '20601708141',
    holder: 'Kambista SAC',
    type: 'Corriente',
  }
})

function handleTransferred() {
  if (summary.value?.koins) {
    koinsStore.addKoins(summary.value.koins)
  }
  transactionStore.setTransactionId('mock-tx-' + Date.now())
  router.push('/transaction/receipt')
}
</script>

<template>
  <div class="flex-1 overflow-y-auto">
    <div class="w-full max-w-xl mx-auto px-base py-5 lg:py-8 flex flex-col gap-4 lg:gap-8 items-center">

      <UiBaseText size="sm" color="gray-60" class="text-center lg:text-md">
        El tipo de cambio podría actualizarse a las: <UiBaseText size="lg" weight="bold" color="gray-60"
          class="lg:text-xl">{{ updateTime }}</UiBaseText>
      </UiBaseText>

      <div class="w-full bg-white rounded-xl border border-gray-25 overflow-hidden">
        <div class="flex flex-col items-center px-5 lg:px-8 py-5 lg:py-8 gap-4">

          <div class="w-20 h-auto flex items-center justify-center">
            <img src="/images/transfiere.png" alt="Transfiere a Kambista" width="77" height="83" class="object-contain" loading="lazy" />
          </div>

          <UiBaseText size="xl" weight="bold" color="secondary" as="h2" class="text-center hidden lg:block">
            Transfiere a Kambista
          </UiBaseText>

          <UiBaseText size="md" color="gray-60" as="p" class="text-center leading-5">
            Transfiere desde tu app bancaria y guarda el
            <UiBaseText size="md" weight="bold" color="secondary" class="underline">número o código de operación
            </UiBaseText>
            para el siguiente paso.
          </UiBaseText>

          <div class="w-full flex flex-col gap-3 mt-2 border border-solid border-[#CCCCCC] rounded-md p-4">
            <DetailRow label="Banco" :value="kambistaAccount.bank" />
            <DetailRow label="Monto">
              <div class="flex items-center gap-2">
                <UiBaseText size="sm" weight="bold" color="secondary">{{ kambistaAccount.amount }}</UiBaseText>
                <CopyButton :text="kambistaAccount.rawAmount" />
              </div>
            </DetailRow>
            <DetailRow label="Número de cuenta">
              <div class="flex items-center gap-2">
                <UiBaseText size="sm" weight="bold" color="secondary">{{ kambistaAccount.accountNumber }}</UiBaseText>
                <CopyButton :text="kambistaAccount.accountNumber" />
              </div>
            </DetailRow>
            <DetailRow label="RUC">
              <div class="flex items-center gap-2">
                <UiBaseText size="sm" weight="bold" color="secondary">{{ kambistaAccount.ruc }}</UiBaseText>
                <CopyButton :text="kambistaAccount.ruc" />
              </div>
            </DetailRow>
            <DetailRow label="Titular de la cuenta">
              <div class="flex items-center gap-2">
                <UiBaseText size="sm" weight="bold" color="secondary">{{ kambistaAccount.holder }}</UiBaseText>
                <CopyButton :text="kambistaAccount.holder" />
              </div>
            </DetailRow>
            <DetailRow label="Tipo de cuenta" :value="kambistaAccount.type" />
          </div>
        </div>
      </div>

      <UiBaseButton label="Ya hice mi transferencia" class="w-full" @click="handleTransferred" />
    </div>
  </div>
</template>
