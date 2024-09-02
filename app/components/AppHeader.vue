<script setup lang="ts">
import type { NavItem } from '@nuxt/content';

const navigation = inject<Ref<NavItem[]>>('navigation', ref([]))

const links = [
  {
    label: 'Docs',
    to: '/docs',
  },
  {
    label: 'Pricing',
    to: '/pricing',
  },
  {
    label: 'Blog',
    to: '/blog',
  },
];
</script>

<template>
  <UHeader :links="links"
           class="dark:bg-gray-800">
    <template #logo>
      <OnetimeLogo class="dark:text-white" />
      <span class="font-brand dark:text-white">Onetime Secret</span>
      <UBadge label="Docs"
              color="brandcomp"
              variant="subtle"
              class="mb-0.5 dark:bg-gray-700 dark:text-gray-300" />
    </template>

    <template #right>
      <nav class="flex items-center space-x-4">
        <a href="https://onetimesecret.com/"
           class="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition-colors duration-150 ease-in-out">
          Back to onetimesecret.com
          <Icon name="heroicons:arrow-top-right-on-square"
                class="w-4 h-4 ml-1" />
        </a>
        <UButton label="Sign in"
                 color="white"
                 to="https://onetimesecret.com/signin"
                 class="text-sm font-medium px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors duration-150 ease-in-out" />
        <UButton label="Sign up"
                 icon="i-heroicons-arrow-right-20-solid"
                 trailing
                 color="white"
                 to="https://onetimesecret.com/signup"
                 class="hidden lg:flex text-sm font-medium px-4 py-2 rounded-md bg-brand-600 text-white hover:bg-brand-700 dark:bg-brand-700 dark:text-gray-100 dark:hover:bg-brand-600 transition-colors duration-150 ease-in-out" />
      </nav>
    </template>


    <template #panel>
      <UNavigationTree :links="mapContentNavigation(navigation)"
                       default-open
                       class="dark:bg-gray-800 dark:text-gray-300" />
    </template>
  </UHeader>
</template>
