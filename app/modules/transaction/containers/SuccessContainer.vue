<script setup lang="ts">
import { ECurrency } from '~/enums/currency.enum'
import DetailRow from '../components/DetailRow.vue'

const transactionStore = useTransactionStore()
const router = useRouter()

if (!transactionStore.summary) {
  router.replace('/')
}

const summary = computed(() => transactionStore.summary)
const currencySymbol = (currency: string) => currency === ECurrency.USD ? '$' : 'S/'
const kambistaCode = computed(() => 'km' + (transactionStore.transactionId?.slice(-6) ?? '20ttfff'))

function handleGoHome() {
  transactionStore.reset()
  router.replace('/')
}
</script>

<template>
  <div class="flex-1 overflow-y-auto">
    <div class="w-full max-w-xl mx-auto px-base py-8 flex flex-col gap-6 items-center">

      <div class="w-full bg-white rounded-md border border-gray-23 overflow-hidden">
        <div class="flex flex-col items-center p-5 lg:p-8 gap-4">

          <div class="w-24 h-24 flex items-center justify-center">
            <img src="/images/happy-pig.png" alt="Operación exitosa" width="103" height="97" class="object-contain" loading="lazy" />
          </div>

          <UiBaseText size="xl" weight="bold" color="secondary" as="h2" class="text-center">
            ¡Constancia enviada!
          </UiBaseText>

          <div class="w-full flex flex-col gap-2.5 lg:gap-4 mt-2">
            <DetailRow label="Código Kambista" :value="kambistaCode" />

            <UiBaseText size="sm" color="gray-60" as="p">
              *Usa tu código para dar seguimiento a tu operación.
            </UiBaseText>

            <DetailRow label="Monto a recibir"
              :value="`${currencySymbol(summary?.receiveCurrency ?? ECurrency.PEN)} ${summary?.receiveAmount}`" />

            <DetailRow label="Tiempo estimado de espera" value="20h 15min" />
          </div>
        </div>
      </div>

      <div
        class="w-full h-20 rounded-xl overflow-hidden flex items-center justify-center px-4 lg:px-6 relative shadow-sm"
        style="background: linear-gradient(64.32deg, #B28FD9 20.26%, #F0979E 52.95%, #FCC48C 101.24%);">
        <img src="/images/piggy-glasses.png" alt="Kambista beneficios" width="71" height="88" loading="lazy"
          class="absolute -left-6 -bottom-6 object-contain rotate-12" />
        <img src="/images/gift.png" alt="Regalos" width="63" height="66" loading="lazy"
          class="absolute -right-2 -bottom-2 object-contain -rotate-12" />
        <div class="flex flex-col justify-center gap-0.5 text-center z-10">
          <UiBaseText size="base" weight="bold" color="secondary" class="leading-tight">
            Disfruta de <span class="bg-[#EFC546] text-secondary px-1.5 py-0.5 rounded-[20px] text-base uppercase"
              style="box-shadow: 0px 4px 4px 0px #00000040;">descuentos</span> en los
          </UiBaseText>
          <UiBaseText size="base" weight="bold" color="white" class="leading-tight">
            <span class="underline decoration-2">mejores comercios</span>
          </UiBaseText>
        </div>
      </div>

      <UiBaseText size="base" color="secondary" as="p" class="text-center leading-5">
        Verificaremos tu operación. Puedes ver su estado en "Mis operaciones".
      </UiBaseText>

      <UiBaseButton label="Volver a inicio" class="w-full" @click="handleGoHome" />
    </div>
  </div>
</template>
