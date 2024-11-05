<template>
  <div class="my-8 p-6 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
    <div class="flex items-start space-x-4">
      <div class="mt-1">
        <slot name="icon">
          <Icon name="ph:shield-check-bold" class="w-6 h-6 text-orange-600" />
        </slot>
      </div>

      <div class="flex-1">
        <h3 v-if="title" class="text-xl font-semibold mb-2">
          {{ title }}
        </h3>

        <div class="prose dark:prose-invert max-w-none">
          <slot />
        </div>

        <div v-if="$slots.footer" class="mt-4 pt-4 border-t border-orange-100 dark:border-orange-800">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

<!--
Example usage in markdown:

::principle-highlight{title="Privacy by Design"}
Our approach to privacy isn't an afterthought - it's built into every feature from the ground up.

#icon
::icon{name="ph:lock-key"}

#footer
Learn more about our [privacy principles](/principles/privacy-first)
::
-->
