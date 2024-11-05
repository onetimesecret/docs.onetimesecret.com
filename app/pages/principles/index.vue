<template>
  <div class="docs-page">
    <UContainer class="max-w-8xl mx-auto">
      <div class="flex">
        <!-- Left Sidebar -->
        <aside class="w-64 flex-none hidden lg:block pr-8">
          <div class="sticky top-24 pt-6">
            <nav class="space-y-2">
              <h2 class="font-semibold text-lg mb-4">Our Commitments</h2>
              <!-- Replace UVerticalNavigation with simpler navigation -->
              <ul class="space-y-2">
                <li v-for="principle in principles" :key="principle._path">
                  <NuxtLink
                    :to="principle._path"
                    class="block px-3 py-2 rounded-md text-sm"
                    :class="{
                      'bg-gray-100 dark:bg-gray-800 text-brand-500 dark:text-brand-400': currentPath === principle._path,
                      'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800': currentPath !== principle._path
                    }"
                  >
                    {{ principle.title }}
                  </NuxtLink>
                </li>
              </ul>
            </nav>
          </div>
        </aside>


        <!-- Main Content -->
        <main class="flex-1 min-w-0 pl-8 border-l border-gray-200 dark:border-gray-800">
          <div v-if="page" class="pt-6">
            <!-- Page Header -->
            <div class="mb-8">
              <h1 class="text-3xl font-semibold">{{ page.title }}</h1>
              <p class="mt-2 text-gray-500 dark:text-gray-400">{{ page.description }}</p>
            </div>

            <!-- Page Content -->
            <div class="prose dark:prose-invert max-w-none">
              <ContentRenderer :value="page" />

            </div>
          </div>
        </main>
      </div>
    </UContainer>
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
    //.sort({ title: 1 }) // Optional: Sort by title
    .without(['body', 'excerpt'])
    .find()
)

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Principles Page Not Found'
  })
}

// SEO
useSeoMeta({
  title: page.value?.title,
  ogTitle: page.value?.title,
  description: page.value?.description,
  ogDescription: page.value?.description
})
</script>

<style scoped>
.docs-page {
  padding-top: 1rem;
  min-height: calc(100vh - var(--header-height));
}
</style>
