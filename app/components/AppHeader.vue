<script setup lang="ts">
import type { NavItem } from '@nuxt/content';

const navigation = inject<Ref<NavItem[]>>('navigation', ref([]))

const links = [{
  label: 'Docs',
  to: '/docs',
}, {
  label: 'Pricing',
  to: '/pricing',
}, {
  label: 'Blog',
  to: '/blog',
}]
</script>

<template>
  <UHeader :links="links">
    <template #logo>
      <OnetimeLogo />
      <span class="font-brand">Onetime Secret</span>
      <UBadge
        label="Docs"
        variant="subtle"
        class="mb-0.5"
      />
    </template>

    <template #right>
      <UButton
        label="Sign in"
        color="gray"
        to="/signin"
      />
      <UButton
        label="Sign up"
        icon="i-heroicons-arrow-right-20-solid"
        trailing
        color="black"
        to="/signup"
        class="hidden lg:flex"
      />
    </template>

    <template #panel>
      <UNavigationTree
        :links="mapContentNavigation(navigation)"
        default-open
      />
    </template>
  </UHeader>
</template>
