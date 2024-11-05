<template>
  <div class="principles-index">
    <div v-if="page" class="max-w-4xl mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-4">{{ page.title }}</h1>
      <ContentRenderer :value="page" />

      <div class="principle-links grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <NuxtLink
          v-for="principle in principles"
          :key="principle._path"
          :to="principle._path"
          class="principle-link bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-all"
        >
          <h2 class="text-xl font-bold mb-2">{{ principle.title }}</h2>
          <p class="text-gray-600 dark:text-gray-300">{{ principle.description }}</p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const { data: page } = await useAsyncData('principles-index', () =>
  queryContent('/principles')
    .where({ _path: '/principles' })
    .findOne()
)

const { data: principles } = await useAsyncData('principles-list', () =>
  queryContent('/principles')
    .where({
      _partial: false,
      _path: { $ne: '/principles' }
    })
    .without(['body', 'excerpt'])
    .find()
)

// Throw a 404 if no page is found
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Principles Page Not Found'
  })
}
</script>
