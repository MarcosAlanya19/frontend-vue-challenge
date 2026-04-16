<script setup lang="ts">
interface IProps {
  label: string
  value?: string
}

defineProps<IProps>()
</script>

<template>
  <div class="grid lg:flex items-center justify-between  py-1 lg:py-1.5">
    <!-- Label: más pequeño en mobile, normal en desktop -->
    <UiBaseText size="sm" color="gray-60" weight="bold">{{ label }}</UiBaseText>

    <slot>
      <!-- Value: negrita siempre, ajustando tamaño según pantalla -->
      <UiBaseText v-if="value" size="base" class="pl-2 lg:pl-0" weight="bold" color="secondary">
        {{ value }}
      </UiBaseText>
    </slot>
  </div>
</template>
