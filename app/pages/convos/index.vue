<script setup lang="ts">

const { data: page } = await useAsyncData('convos', () => queryContent('/convos').findOne())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found2', fatal: true })
}

</script>

<template>
  <UContainer class="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 dark:bg-gray-900">
    <UPageHeader v-bind="page"
                 class="mb-16" />

    <UPageBody>

    </UPageBody>

  </UContainer>
</template>
