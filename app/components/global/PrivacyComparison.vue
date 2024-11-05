<template>
  <div class="my-8 grid md:grid-cols-2 gap-6">
    <div class="p-6 bg-red-50 dark:bg-red-900/20 rounded-lg">
      <div class="flex items-center space-x-3 mb-4">
        <XCircle class="w-6 h-6 text-red-600" />
        <h3 class="text-lg font-semibold">Industry Standard</h3>
      </div>

      <ul class="space-y-3">
        <li v-for="(item, idx) in industry" :key="idx"
            class="flex items-start space-x-3">
          <XCircle class="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
          <span class="text-gray-600 dark:text-gray-300">{{ item }}</span>
        </li>
      </ul>
    </div>

    <div class="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
      <div class="flex items-center space-x-3 mb-4">
        <CheckCircle class="w-6 h-6 text-green-600" />
        <h3 class="text-lg font-semibold">Onetime Secret</h3>
      </div>

      <ul class="space-y-3">
        <li v-for="(item, idx) in ots" :key="idx"
            class="flex items-start space-x-3">
          <CheckCircle class="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
          <span class="text-gray-600 dark:text-gray-300">{{ item }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { XCircle, CheckCircle } from 'lucide-vue-next'

defineProps<{
  industry: string[]
  ots: string[]
}>()
</script>

<!--
Example usage in markdown:

::privacy-comparison
---
industry:
  - Tracks user behavior
  - Sends marketing emails
  - Uses third-party analytics
  - Stores user data indefinitely
  - Shares data with partners
ots:
  - No tracking
  - Email only for secret delivery
  - No third-party services
  - Immediate data deletion
  - Never shares your data
---
::
-->
