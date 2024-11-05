<template>
  <div class="principle-page">
    <div v-if="doc" class="max-w-4xl mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-4">{{ doc.title }}</h1>
      <div class="prose dark:prose-invert">
        <ContentRenderer :value="doc" />
      </div>
    </div>
    <div v-else class="text-center py-16">
      <h1 class="text-2xl font-bold">Principle Not Found</h1>
      <p class="mt-4">The requested principle could not be located.</p>
      <NuxtLink to="/principles" class="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
        Back to Principles
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})

const route = useRoute()

// Normalize the slug to match content path
const normalizedSlug = route.params.slug.toString().replace(/\/$/, '')

// Fetch the specific principle content
const { data: doc } = await useAsyncData(`principle-${normalizedSlug}`, async () => {
  try {
    return await queryContent('/principles')
      .where({
        _path: {
          $contains: normalizedSlug
        }
      })
      .findOne()
  } catch (error) {
    console.error('Principle fetch error:', error)
    return null
  }
})

// If no document is found, throw a 404 error
if (!doc.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Principle Not Found',
    fatal: true
  })
}
</script>
