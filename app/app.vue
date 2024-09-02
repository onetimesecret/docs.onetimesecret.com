<script setup lang="ts">
const colorMode = useColorMode()

const color = computed(() => colorMode.value === 'dark' ? '#111827' : 'white')

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

useSeoMeta({
  titleTemplate: '%s - Onetime Secret - Share Secrets Securely',
  ogImage: '/onetime-socialcard-20240823-2.png',
  twitterImage: '/onetime-socialcard-20240823-2.png',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div>
    <NuxtLoadingIndicator />


    <NuxtPage />


    <UNotifications />
  </div>
</template>
