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
        <div v-if="page" class="prose dark:prose-invert max-w-4xl">
          <h1 class="text-3xl font-bold mb-6">{{ page.title }}</h1>
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
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const currentPath = computed(() => route.path)

const { data: page } = await useAsyncData('principles-index', () =>
  queryContent('/principles')
    .where({ _path: '/principles' })
    .findOne()
)

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

// Throw a 404 if no page is found
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Principles Page Not Found'
  })
}
</script>
