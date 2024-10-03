<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref } from 'vue';

interface Props {
  summary: string;
  expanded?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  expanded: false,
});

const isExpanded = ref(props.expanded);

const toggleContent = () => {
  isExpanded.value = !isExpanded.value;
};
</script>

<template>
  <div class="my-4">
    <button @click="toggleContent"
            class="flex items-center justify-between w-full px-4 py-2 text-left text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            :aria-expanded="isExpanded">
      <span class="font-sm">{{ summary }}</span>
      <Icon :icon="isExpanded ? 'heroicons:chevron-down' : 'heroicons:chevron-right'"
            class="w-5 h-5 ml-2 transition-transform duration-200 ease-in-out"

            aria-hidden="true" />
      <!--<svg class="w-5 h-5 ml-2 transition-transform duration-200 ease-in-out"
           :class="{ 'rotate-180': isExpanded }"
           xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 20 20"
           fill="currentColor"
           aria-hidden="true">
        <path fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd" />
      </svg>-->


    </button>
    <transition enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0">
      <div v-if="isExpanded"
           class="mt-2 px-4 py-3 bg-white rounded-lg shadow-sm dark:bg-gray-900 dark:text-gray-200">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>
