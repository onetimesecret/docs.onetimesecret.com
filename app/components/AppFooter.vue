<script setup lang="ts">
const links = [
  {
    label: 'Resources',
    children: [
      { label: 'Docs', to: '/docs' },
      { label: 'Blog', to: 'https://blog.onetimesecret.com' },
      { label: 'Issues', to: 'https://github.com/onetimesecret/onetimesecret/issues' },
      { label: 'Status', to: 'https://status.onetimesecret.com/' },
    ]
  },
  {
    label: 'Features',
    children: [
      { label: 'Custom Domains', to: '/docs/custom-domains' },
      { label: 'Single-use links', to: '/docs/secret-links' },
      { label: 'API', to: '/docs/rest-api' },
      { label: 'Docker', to: 'https://github.com/onetimesecret/onetimesecret/pkgs/container/onetimesecret' },
    ]
  },
  {
    label: 'Company',
    children: [
      { label: 'About', to: '/about' },
      { label: 'Pricing', to: 'https://onetimesecret.com/pricing' },
      { label: 'Sponsors', to: 'https://github.com/sponsors/onetimesecret' },
      { label: 'Principles', to: '/principles' },
      { label: 'Careers', to: '/careers' },
    ]
  }
]
</script>

<template>
  <UFooter class="bg-white dark:bg-gray-900">
    <template #top>
      <UFooterColumns :links="links"
                      class="dark:text-gray-300" />
    </template>

    <template #left>
      <p class="text-gray-500 dark:text-gray-400 text-sm">
        Copyright © {{ new Date().getFullYear() }}. All rights reserved.
        <span class="ml-2">
          <ULink to="https://onetimesecret.com/info/terms" class="hover:underline">Terms</ULink>
          <span class="mx-1">·</span>
          <ULink to="https://onetimesecret.com/info/privacy" class="hover:underline">Privacy</ULink>
          <span class="mx-1">·</span>
          <ULink to="https://onetimesecret.com/info/security" class="hover:underline">Security</ULink>
        </span>
      </p>
    </template>

    <template #right>
      <UButton to="https://onetimesecret.com"
               target="_blank"
               aria-label="OneTimeSecret.com"
               color="gray"
               variant="ghost"
               class="hover:bg-gray-100 dark:hover:bg-gray-800 mr-2 text-sm">
        OnetimeSecret.com
      </UButton>

      <UColorModeButton size="sm"
                        class="mr-2" />

      <UButton to="https://github.com/onetimesecret/docs.onetimesecret.com"
               target="_blank"
               icon="i-simple-icons-github"
               aria-label="GitHub"
               color="gray"
               variant="ghost"
               class="hover:bg-gray-100 dark:hover:bg-gray-800" />
    </template>
  </UFooter>
</template>
