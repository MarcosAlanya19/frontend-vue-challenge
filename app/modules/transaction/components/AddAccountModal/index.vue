<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { ECurrency } from '~/enums/currency.enum'
import { getBankAccounts } from '~/modules/transaction/services/get-bank-accounts.services'
import { addAccountSchema } from './index.schema'

interface IProps {
  visible: boolean
  currency: ECurrency
}

interface ICreatedAccount {
  label: string
  value: string
  subtitle: string
}

const props = defineProps<IProps>()
const emit = defineEmits<{ close: [], created: [account: ICreatedAccount] }>()

const currencyLabel = computed(() => props.currency === ECurrency.PEN ? 'Soles' : 'Dólares')

const accountTypeOptions = [
  { label: 'Cuenta de Ahorros', value: 'savings' },
  { label: 'Cuenta Corriente', value: 'checking' },
]

const bankOptions = getBankAccounts()

const digitsOnly = (value: string) => value.replace(/\D/g, '')

const { handleSubmit, values, resetForm, meta, setFieldValue } = useForm({
  validationSchema: toTypedSchema(addAccountSchema),
  initialValues: {
    accountType: '',
    accountNumber: '',
    bankId: '',
    alias: '',
    currency: props.currency,
    ownerConfirm: false,
  },
})

watch(() => props.visible, (v) => {
  if (v) {
    resetForm({ values: { currency: props.currency } })
  }
})

const isFormValid = computed(() => meta.value.valid)

const onSubmit = handleSubmit((submittedValues) => {
  emit('created', {
    label: submittedValues.alias,
    value: `acc-${Date.now()}`,
    subtitle: submittedValues.accountNumber,
  })
  emit('close')
})
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="visible" class="fixed inset-0 bg-black/40 z-50 flex items-end lg:items-start justify-end"
        @click.self="emit('close')">
        <!-- Mobile: bottom sheet | Desktop: right panel -->
        <div class="w-full bg-white flex flex-col overflow-y-auto
                    rounded-t-2xl max-h-[92vh]
                    lg:rounded-none lg:max-h-none lg:max-w-5xl lg:h-full">

          <!-- Header desktop -->
          <div class="hidden lg:flex items-center justify-between px-6 lg:px-11 py-5 border-b border-gray-25">
            <UiBaseText size="xl" weight="bold" color="secondary">
              Agregar cuenta - {{ currencyLabel }}
            </UiBaseText>
            <button type="button" @click="emit('close')">
              <Icon name="heroicons:x-mark" class="w-6 h-6 text-secondary" />
            </button>
          </div>

          <!-- Header mobile -->
          <div class="flex lg:hidden flex-col px-6 pt-6 pb-0 gap-4">
            <div class="flex items-center justify-between">
              <UiBaseText size="xl" weight="bold" color="secondary">
                Agregar cuenta {{ currencyLabel }}
              </UiBaseText>
              <button type="button" @click="emit('close')">
                <Icon name="heroicons:x-mark" class="w-6 h-6 text-secondary" />
              </button>
            </div>
            <div class="h-px bg-gray-25" />
          </div>

          <!-- Body -->
          <form class="flex-1  px-6 lg:px-11  py-6 flex flex-col gap-6" @submit.prevent="onSubmit">
            <!-- Notice -->
            <UiBaseText as="p" size="md" class="lg:text-lg" color="secondary">
              La cuenta que registres <UiBaseText weight="bold" size="md" class="lg:text-lg">debe estar a tu nombre
              </UiBaseText> (titular de este
              perfil en Kambista)
            </UiBaseText>

            <!-- Desktop: two explicit columns -->
            <div class="hidden lg:flex gap-5">
              <!-- Left column -->
              <div class="flex-1 flex flex-col gap-5">
                <FormSelect name="accountType" label="Tipo de cuenta" sheet-title="Tipo de cuenta"
                  :options="accountTypeOptions" placeholder="Selecciona" />
                <FormSelect name="bankId" label="Banco" sheet-title="Selecciona tu banco" :options="bankOptions"
                  placeholder="Selecciona" />
                <UiBaseHighlight variant="info">
                  <UiBaseText color="blue" size="sm" weight="medium">
                    Operamos en Lima con todos los bancos. Y en provincia con el BCP y cuentas digitales Interbank.
                  </UiBaseText>
                </UiBaseHighlight>
                <div class="flex flex-col gap-2">
                  <UiBaseText size="base" weight="medium" color="gray-60">Moneda</UiBaseText>
                  <div class="grid grid-cols-2  gap-3">
                    <button type="button" class="h-10 px-8 rounded-lg transition-colors"
                      :class="values.currency === ECurrency.PEN ? 'bg-secondary' : 'border border-gray-25 bg-white'"
                      @click="setFieldValue('currency', ECurrency.PEN)">
                      <UiBaseText size="sm" weight="medium"
                        :color="values.currency === ECurrency.PEN ? 'white' : 'gray-40'">SOLES</UiBaseText>
                    </button>
                    <button type="button" class="h-10 px-8 rounded-lg transition-colors"
                      :class="values.currency === ECurrency.USD ? 'bg-secondary' : 'border border-gray-25 bg-white'"
                      @click="setFieldValue('currency', ECurrency.USD)">
                      <UiBaseText size="sm" weight="medium"
                        :color="values.currency === ECurrency.USD ? 'white' : 'gray-40'">DÓLARES</UiBaseText>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Right column -->
              <div class="flex-1 flex flex-col gap-5">
                <FormInput name="accountNumber" label="Número de cuenta" placeholder="Escribe tu cuenta destino"
                  :formatter="digitsOnly" />
                <FormInput name="alias" label="Ponle nombre a tu cuenta" placeholder="Escribe un alias" />
                <FormCheckbox name="ownerConfirm">
                  <UiBaseText size="sm" weight="bold" color="secondary">
                    Declaro que esta cuenta es mía y NO de un tercero
                  </UiBaseText>
                  <br />
                  <UiBaseText size="sm" color="gray-60">
                    *Es obligatorio que la cuenta esté a tu nombre para que el cambio sea exitoso
                  </UiBaseText>
                </FormCheckbox>
                <UiBaseButton label="Agregar y usar" type="submit" :disabled="!isFormValid" />
              </div>
            </div>

            <!-- Mobile: single column -->
            <div class="flex lg:hidden flex-col gap-5">
              <FormSelect name="accountType" label="Tipo de cuenta bancaria" sheet-title="Tipo de cuenta"
                :options="accountTypeOptions" placeholder="Selecciona" />
              <FormSelect name="bankId" label="Entidad financiera" sheet-title="Selecciona tu banco"
                :options="bankOptions" placeholder="Selecciona" />
              <UiBaseHighlight variant="info">
                <UiBaseText color="blue" size="sm" weight="medium">
                  Operamos en Lima con todos los bancos. Y en provincia con el BCP y cuentas digitales Interbank.
                </UiBaseText>
              </UiBaseHighlight>
              <div class="flex flex-col gap-2">
                <UiBaseText size="base" weight="medium" color="gray-60">Moneda</UiBaseText>
                <div class="grid grid-cols-2 gap-3">
                  <button type="button" class="flex-1 h-12 rounded-lg transition-colors"
                    :class="values.currency === ECurrency.PEN ? 'bg-secondary' : 'border border-gray-25 bg-white'"
                    @click="setFieldValue('currency', ECurrency.PEN)">
                    <UiBaseText size="sm" weight="medium"
                      :color="values.currency === ECurrency.PEN ? 'white' : 'gray-40'">SOLES</UiBaseText>
                  </button>
                  <button type="button" class="flex-1 h-12 rounded-lg transition-colors"
                    :class="values.currency === ECurrency.USD ? 'bg-secondary' : 'border border-gray-25 bg-white'"
                    @click="setFieldValue('currency', ECurrency.USD)">
                    <UiBaseText size="sm" weight="medium"
                      :color="values.currency === ECurrency.USD ? 'white' : 'gray-40'">DÓLARES</UiBaseText>
                  </button>
                </div>
              </div>
              <FormInput name="accountNumber" label="Número de cuenta" placeholder="Escribe tu cuenta de destino"
                :formatter="digitsOnly" />
              <FormInput name="alias" label="Ponle nombre a tu cuenta" placeholder="Escribe un alias" />
              <FormCheckbox name="ownerConfirm">
                <UiBaseText size="sm" color="secondary">Declaro que esta cuenta es mia</UiBaseText>
              </FormCheckbox>
              <UiBaseButton label="Guardar cuenta" type="submit" :disabled="!isFormValid" />
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
