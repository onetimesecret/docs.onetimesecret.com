<template>
  <div class="principles-page">
    <div class="max-w-6xl mx-auto flex">
      <!-- Sidebar Navigation -->
      <div class="w-64 pr-8 sticky top-0 h-screen overflow-y-auto">
        <nav>
          <h2 class="text-xl font-bold mb-4">Our Principles</h2>
          <ul class="space-y-2">
            <li v-for="principle in principles" :key="principle._path">
              <NuxtLink
                :to="principle._path"
                class="block py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                :class="{ 'bg-blue-50 dark:bg-blue-900': currentPath === principle._path }"
              >
                {{ principle.title }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>

      <!-- Main Content -->
      <div class="flex-1 pl-8 border-l dark:border-gray-700">
        <div v-if="doc" class="prose dark:prose-invert max-w-4xl">
          <h1 class="text-3xl font-bold mb-6">{{ doc.title }}</h1>
          <ContentRenderer :value="doc" />
        </div>
        <div v-else class="text-center py-16">
          <h1 class="text-2xl font-bold">Principle Not Found</h1>
          <p class="mt-4">The requested principle could not be located.</p>
          <NuxtLink to="/principles" class="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
            Back to Principles
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})

const route = useRoute()
const currentPath = computed(() => route.path)

// Normalize the slug to match content path
const normalizedSlug = route.params.slug.toString().replace(/\/$/, '')

// Fetch all principles for sidebar
const { data: principles } = await useAsyncData('principles-list', () =>
  queryContent('/principles')
    .where({
      _partial: false,
      _path: {
        $ne: '/principles',
        $contains: '/principles/'
      }
    })
    .without(['body', 'excerpt'])
    .find()
)

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
