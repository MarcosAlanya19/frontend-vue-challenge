<script setup lang="ts">
interface IProps {
  label: string
  value: string
  strikethroughValue?: string
}

defineProps<IProps>()
</script>

<template>
  <div class="flex items-center justify-between">
    <UiBaseText size="base" class="lg:text-md" color="secondary">{{ label }}</UiBaseText>
    <div class="flex items-center gap-2">
      <UiBaseText v-if="strikethroughValue" size="base" color="red" class="line-through lg:text-md">
        {{ strikethroughValue }}
      </UiBaseText>
      <UiBaseText size="base" class="lg:text-md" weight="bold" color="secondary">{{ value }}</UiBaseText>
    </div>
  </div>
</template>
