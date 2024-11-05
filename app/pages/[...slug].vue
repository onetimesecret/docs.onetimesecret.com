<template>
  <div class="max-w-7xl mx-auto px-4 py-12 text-center">
    <NuxtLink to="/">
      <svg width="200"
           height="200"
           viewBox="0 0 24 24"
           fill="none"
           xmlns="http://www.w3.org/2000/svg"
           class="mx-auto mb-8">
        <circle cx="11"
                cy="11"
                r="8"
                stroke="#FF6F61"
                stroke-width="2" />
        <path d="M14.8284 14.8284L20 20"
              stroke="#FF6F61"
              stroke-width="2"
              stroke-linecap="round" />
        <circle cx="9"
                cy="9"
                r="1"
                fill="#FF6F61" />
        <circle cx="13"
                cy="9"
                r="1"
                fill="#FF6F61" />
        <path d="M9 13C9.5 14 10.5 14 11 13"
              stroke="#FF6F61"
              stroke-width="2"
              stroke-linecap="round" />
        <path d="M13 13C13.5 14 14.5 14 15 13"
              stroke="#FF6F61"
              stroke-width="2"
              stroke-linecap="round" />
      </svg>
    </NuxtLink>
    <h1 class="text-2xl font-bold mb-4">404</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      The page you're looking for doesn't exist.
    </p>
    <NuxtLink to="/"
              class="text-orange-600 hover:text-orange-700 font-medium">
      Return Home
    </NuxtLink>
    <div class="absolute bottom-4 right-4 text-gray-500 text-sm italic">
      <a class="underline"
         href="https://blog.onetimesecret.com/posts/2024-10-15-ai-generated-graphics-transparency">* Carefully crafted
        by Copilot GPT-4o</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head';

useHead({
  title: '404'
});
</script>

<style></style>
