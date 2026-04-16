<template>
  <div class="grid lg:grid-cols-2 min-h-screen">
    <!-- Left panel -->
    <div class="hidden lg:flex flex-col items-center justify-center px-16"
      style="background: linear-gradient(20.06deg, #182233 26.91%, #1D2744 45.75%, #293571 83.1%, #344197 110.93%)">
      <div class="max-w-md w-full">
        <!-- Logo -->
        <div class="mb-20 grid justify-items-center">
          <IconsLogoSvg :width="310" :height="85" color="white" />
        </div>

        <!-- Features -->
        <div class="flex flex-col gap-12">
          <div class="flex items-start gap-6">
            <img src="/images/quote-operation.png" alt="Cotiza" width="70" height="60" class="object-contain" loading="lazy" />
            <div>
              <UiBaseText as="p" size="xl" weight="bold" color="white" class="mb-1">Cotiza tu operación</UiBaseText>
              <UiBaseText as="p" size="md" color="white" weight="semibold">
                Utiliza la calculadora para verificar el
                <UiBaseText as="span" size="md" color="primary" weight="bold">Tipo de Cambio</UiBaseText>
                en tiempo real
              </UiBaseText>
            </div>
          </div>

          <div class="flex items-start gap-6">
            <img src="/images/make-transfer.png" alt="Transfiere" width="70" height="60" class="object-contain" loading="lazy" />
            <div>
              <UiBaseText as="p" size="xl" weight="bold" color="white" class="mb-1">Realiza la transferencia
              </UiBaseText>
              <UiBaseText as="p" size="md" color="white" weight="semibold">
                Envía desde tu banco el <UiBaseText as="span" size="md" weight="bold" color="primary">dinero
                </UiBaseText>
                que desees cambiar a la <UiBaseText as="span" size="md" weight="bold" color="primary">cuenta
                </UiBaseText>
                de Kambista indicada
              </UiBaseText>
            </div>
          </div>

          <div class="flex items-start gap-6">
            <img src="/images/get-money.png" alt="Recibe" width="70" height="60" class="object-contain" loading="lazy" />
            <div>
              <UiBaseText as="p" size="xl" color="white" weight="bold" class="mb-1">Obtén tu dinero</UiBaseText>
              <UiBaseText as="p" size="md" color="white" weight="semibold">
                El dinero será
                <UiBaseText as="span" size="md" weight="bold" color="primary">depositado</UiBaseText>
                en tu cuenta de destino
              </UiBaseText>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right panel -->
    <div class="bg-gray-background flex flex-col items-center justify-center px-6 py-12 lg:p-8 min-h-screen">
      <!-- Logo mobile (oculto en desktop) -->
      <div class="flex lg:hidden items-center gap-3 justify-center mb-8">
        <IconsLogoSvg :width="138" :height="32" color="#060F26" />
      </div>

      <slot />
    </div>
  </div>
</template>
