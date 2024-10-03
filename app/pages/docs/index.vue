<script setup lang="ts">
import { Icon } from '@iconify/vue';

const { data: page } = await useAsyncData('docs', () => queryContent('/docs').findOne())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useSeoMeta({
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description
})

defineOgImage({
  component: 'Saas',
  title: page.value.title,
  description: page.value.description
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' });
};
</script>

<template>
  <UContainer class="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 dark:bg-gray-900">
    <UPageHeader v-bind="page"
                 class="mb-16" />

    <UPageBody>
      <NuxtLink to="/docs/introduction"
                class="inline-flex items-center text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 transition-colors duration-150 ease-in-out">
        <Icon :icon="page.cta.icon"
              class="w-5 h-5 mr-2" />
        <span class="text-lg font-medium">Start here: {{ page.cta.text }}</span>
      </NuxtLink>
    </UPageBody>

  </UContainer>
</template>
