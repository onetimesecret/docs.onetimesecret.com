<script setup lang="ts">
import type { NavItem } from '@nuxt/content';

const navigation = inject<Ref<NavItem[]>>('navigation', ref([]))

const links = [
  {
    label: 'Docs',
    to: 'https://docs.onetimesecret.com/',
  },
  {
    label: 'Pricing',
    to: 'https://onetimesecret.com/pricing',
  },
  {
    label: 'Blog',
    to: '/',
  },
];
</script>

<template>
  <UHeader :links="links"
           class="dark:bg-gray-800">
    <template #logo>
      <OnetimeLogo class="dark:text-white" />
      <span class="font-brand dark:text-white">Onetime Secret</span>
      <UBadge label="Blog"
              color="brandcomp"
              variant="subtle"
              class="mb-0.5 dark:bg-gray-700 dark:text-gray-300" />
    </template>

    <template #right>
      <nav class="flex items-center space-x-4">
        <a href="https://onetimesecret.com/"
          class="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition-colors duration-150 ease-in-out">
          <span class="hidden xl:inline">Back to </span>onetimesecret.com
          <NewWindowIcon />
        </a>
        <a href="https://onetimesecret.com/signin"
          class="hidden lg:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-150 ease-in-out">
          Sign in
        </a>
        <a href="https://onetimesecret.com/signup"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-brand-600 hover:bg-brand-700 dark:bg-brand-700 dark:text-gray-100 dark:hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors duration-150 ease-in-out">
          Sign up
          <svg class="ml-2 -mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </a>
      </nav>
    </template>

    <template #panel>
      <UNavigationTree :links="mapContentNavigation(navigation)"
                       default-open
                       class="dark:bg-gray-800 dark:text-gray-300" />
    </template>
  </UHeader>
</template>
