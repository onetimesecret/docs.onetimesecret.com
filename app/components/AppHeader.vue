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
    label: 'Back home',
    to: 'https://onetimesecret.com',
  },
  //{
  //  label: 'Blog',
  //  to: '/blog',
  //},
];
</script>

<template>
  <UHeader :links="links" class="dark:bg-gray-800">
    <template #logo>
      <OnetimeLogo class="dark:text-white" />
      <span class="font-brand dark:text-white">Onetime Secret</span>
      <UBadge
        label="Docs"
        color="brandcomp"
        variant="subtle"
        class="mb-0.5 dark:bg-gray-700 dark:text-gray-300"
      />
    </template>

    <template #right>
      <UButton
        label="Sign in"
        color="gray"
        to="https://onetimesecret.com/signin"
        class="dark:bg-brandcompdim-900 dark:text-gray-200 dark:hover:bg-brandcompdim-700"
      />
      <UButton
        label="Sign up"
        icon="i-heroicons-arrow-right-20-solid"
        trailing
        color="brandcomp"
        to="https://onetimesecret.com/signup"
        class="hidden lg:flex dark:bg-brand-700 dark:text-gray-100 dark:hover:bg-brand-600"
      />
    </template>

    <template #panel>
      <UNavigationTree
        :links="mapContentNavigation(navigation)"
        default-open
        class="dark:bg-gray-800 dark:text-gray-300"
      />
    </template>
  </UHeader>
</template>
