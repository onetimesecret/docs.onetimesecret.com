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
          <div v-if="doc" class="pt-6">
            <!-- Page Header -->
            <div class="mb-8">
              <h1 class="text-3xl font-semibold">{{ doc.title }}</h1>
              <p v-if="doc.description" class="mt-2 text-gray-500 dark:text-gray-400">
                {{ doc.description }}
              </p>
            </div>

            <!-- Page Content -->
            <div class="prose dark:prose-invert max-w-none">
              <ContentRenderer :value="doc" />
            </div>
          </div>
          <UAlert
            v-else
            title="Principle Not Found"
            description="The requested principle could not be located."
            icon="i-heroicons-exclamation-triangle"
            color="red"
          >
            <template #actions>
              <UButton
                to="/principles"
                icon="i-heroicons-arrow-left"
                color="white"
                variant="solid"
              >
              Back to Principles
              </UButton>
            </template>

          </UAlert>
        </main>
      </div>
    </UContainer>
  </div>
</template>

<style scoped>
.docs-page {
  padding-top: 1rem;
  min-height: calc(100vh - var(--header-height));
}
</style>

<script setup>
definePageMeta({
  layout: 'default'
})

const route = useRoute()
const currentPath = computed(() => route.path)

const normalizedSlug = route.params.slug.toString().replace(/\/$/, '')


// Modify the principles query to include sorting if needed
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

// SEO
useSeoMeta({
  title: doc.value?.title,
  ogTitle: doc.value?.title,
  description: doc.value?.description,
  ogDescription: doc.value?.description
})

if (!doc.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Principle Not Found',
    fatal: true
  })
}
</script>
