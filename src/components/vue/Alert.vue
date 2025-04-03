<template>
  <div :class="[
    'my-4 p-4 rounded-lg',
    type === 'info' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200' :
    type === 'success' ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200' :
    type === 'warning' ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200' :
    type === 'danger' ? 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200' :
    'bg-gray-50 dark:bg-gray-900/20 text-gray-800 dark:text-gray-200'
  ]">
    <div class="prose dark:prose-invert max-w-none">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  type?: 'info' | 'success' | 'warning' | 'danger'
}>()
</script>
