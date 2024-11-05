<template>
  <div class="max-w-7xl mx-auto px-4 py-12">
    <!-- Optional: Section Header -->
    <header class="mb-8">
      <h1 class="text-3xl font-bold mb-2">Principles</h1>
      <p class="text-gray-600 dark:text-gray-300">
        Core principles that guide Onetime Secret
      </p>
    </header>

    <!-- Page Navigation -->
    <div class="grid md:grid-cols-12 gap-8">
      <!-- Side Navigation -->
      <nav class="md:col-span-3">
        <ContentNavigation
          :query="{
            where: {
              _path: { $contains: 'principles' }
            }
          }"
          v-slot="{ navigation }"
        >
          <div class="space-y-1">
            <NuxtLink
              v-for="link in navigation"
              :key="link._path"
              :to="link._path"
              class="block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              :class="{
                'bg-orange-50 dark:bg-orange-900/20 text-orange-600':
                  $route.path === link._path
              }"
            >
              {{ link.title }}
            </NuxtLink>
          </div>
        </ContentNavigation>
      </nav>

      <!-- Main Content -->
      <main class="md:col-span-9">
        <ContentDoc>
          <template #not-found>
            <div class="text-center py-12">
              <h2 class="text-2xl font-bold mb-4">Page Not Found</h2>
              <p class="text-gray-600 dark:text-gray-400">
                The principle you're looking for doesn't exist.
              </p>
            </div>
          </template>
        </ContentDoc>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
// The layout will automatically handle navigation and content rendering
</script>
