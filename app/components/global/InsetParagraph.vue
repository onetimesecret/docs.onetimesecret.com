<script setup lang="ts">
interface Props {
  label?: string;
  image?: string;
  imageAlt?: string;
  imagePosition?: 'left' | 'right';
}

withDefaults(defineProps<Props>(), {
  label: 'An aside',
  imagePosition: 'left',
})
</script>

<template>
  <div class="my-8 px-4 sm:px-6 lg:px-8">
    <div class="relative overflow-hidden rounded-lg bg-gray-50 dark:bg-gray-800/50 shadow-md">
      <div class="absolute inset-y-0 left-0 w-1 bg-branddim-500/70 dark:bg-branddim-400/70"></div>
      <div class="px-4 py-5 sm:p-6">
        <div class="mb-4 text-xl font-medium text-branddim-600 dark:text-branddim-400">
          {{ label }}
        </div>
        <div :class="[
          'sm:flex items-start',
          imagePosition === 'right' ? 'sm:flex-row-reverse' : 'sm:flex-row'
        ]">
          <div
            v-if="image"
            :class="[
              'shrink-0 mb-4 sm:mb-0',
              imagePosition === 'right' ? 'sm:ml-6' : 'sm:mr-6'
            ]"
          >
            <img
              :src="image"
              :alt="imageAlt"
              class="w-full sm:w-48 h-auto object-cover rounded-lg"
            >
          </div>
          <div class="flex-1 space-y-4 text-base text-gray-700 dark:text-gray-300">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
