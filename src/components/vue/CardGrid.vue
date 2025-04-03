<template>
  <div class="my-8">
    <!-- Optional root slot content -->
    <slot name="root" />

    <!-- Grid of cards -->
    <div :class="gridClasses">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  columns?: 1 | 2 | 3 | 4
}>(), {
  columns: undefined
})

const slots = useSlots()
const cardCount = computed(() => slots.default?.().length || 0)

const gridClasses = computed(() => {
  const columnOptions = {
    1: 'grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4'
  }

  const columns = props.columns ??
    (cardCount.value > 3 ? 4 :
     cardCount.value > 2 ? 3 :
     cardCount.value > 1 ? 2 : 1)

  return [
    'grid',
    'gap-6',
    columnOptions[columns] || 'md:grid-cols-2 lg:grid-cols-3'
  ]
})
</script>
