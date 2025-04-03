<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg">
    <div class="flex items-start mb-4">
      <div v-if="icon" class="text-4xl mr-4 opacity-70">
        <span>{{ icon }}</span>
      </div>
      <h3 v-if="title" class="text-xl font-semibold dark:text-white">{{ title }}</h3>
    </div>
    <p v-if="description" class="text-gray-600 dark:text-gray-300">{{ description }}</p>
    <slot />
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  icon?: string | null
  title?: string | null
  description?: string | null
}>(), {
  icon: null,
  title: null,
  description: null
})
</script>
