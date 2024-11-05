<template>
  <ul :class="[
    'my-4 space-y-2',
    type === 'primary' ? 'text-blue-600 dark:text-blue-400' :
    type === 'success' ? 'text-green-600 dark:text-green-400' :
    type === 'warning' ? 'text-yellow-600 dark:text-yellow-400' :
    type === 'danger' ? 'text-red-600 dark:text-red-400' :
    'text-gray-600 dark:text-gray-400'
  ]">
    <li v-for="(item, index) in items" :key="index" class="flex items-start">
      <span class="mr-2">•</span>
      <span>{{ item }}</span>
    </li>
  </ul>
</template>

<script setup lang="ts">
const props = defineProps<{
  type?: 'primary' | 'success' | 'warning' | 'danger'
  items?: string[]
}>()

// For MDC content, items will be automatically populated from the content between the tags
</script>
