<script setup lang="ts">
const links = [{
  label: 'Resources',
  children: [{
    label: 'Docs',
    to: '/docs',
  }, {
    label: 'Issues',
    to: 'https://github.com/onetimesecret/onetimesecret/issues',
  },{
    label: 'Sponsors',
    to: 'https://github.com/sponsors/onetimesecret',
  },{
    label: 'Status',
    to: 'https://status.onetimesecret.com/',
  }]
}, {
  label: 'Features',
  children: [{
    label: 'Custom Domains',
    to: '/',
  }, {
    label: 'Single-use links',
    to: '/',
  },{
    label: 'Packages',
    to: 'https://github.com/onetimesecret/onetimesecret/pkgs/container/onetimesecret',
  }]
}, {
  label: 'Company',
  children: [{
    label: 'About',
    to: '/about',
  }, {
    label: 'Pricing',
    to: '/pricing',
  }, {
    label: 'Careers',
    to: '/careers',
  }, {
    label: 'Blog',
    to: '/blog',
  }]
}]

const toast = useToast()

const email = ref('')
const loading = ref(false)

function onSubmit() {
  loading.value = true

  setTimeout(() => {
    toast.add({
      title: 'Subscribed!',
      description: 'You\'ve been subscribed to our newsletter.'
    })

    loading.value = false
  }, 1000)
}
</script>

<template>
  <UFooter>
    <template #top>
      <UFooterColumns :links="links">
        <template #right>
          <form @submit.prevent="onSubmit">
            <UFormGroup
              label="Subscribe to our newsletter"
              :ui="{ container: 'mt-3' }"
            >
              <UInput
                v-model="email"
                type="email"
                placeholder="Enter your email"
                :ui="{ icon: { trailing: { pointer: '' } } }"
                required
                size="xl"
                autocomplete="off"
                class="max-w-sm"
                input-class="rounded-full"
              >
                <template #trailing>
                  <UButton
                    type="submit"
                    size="xs"
                    color="primary"
                    :label="loading ? 'Subscribing' : 'Subscribe'"
                    :loading="loading"
                  />
                </template>
              </UInput>
            </UFormGroup>
          </form>
        </template>
      </UFooterColumns>
    </template>

    <template #left>
      <p class="text-gray-500 dark:text-gray-400 text-sm">
        Copyright © {{ new Date().getFullYear() }}. All rights reserved.
      </p>
    </template>

    <template #right>
      <UColorModeButton size="sm" />

      <UButton
        to="https://github.com/nuxt-ui-pro/saas"
        target="_blank"
        icon="i-simple-icons-github"
        aria-label="GitHub"
        color="gray"
        variant="ghost"
      />
    </template>
  </UFooter>
</template>
