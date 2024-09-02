<script setup lang="ts">
import { Icon } from '@iconify/vue';

const { data: page } = await useAsyncData('pricing', () => queryContent('/pricing').findOne())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useSeoMeta({
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description
})

defineOgImage({
  component: 'Saas',
  title: page.value.title,
  description: page.value.description
})

const isYearly = ref(false);
</script>

<template>
  <div v-if="page"
       class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <UPageHero v-bind="page.hero"
               class="bg-sky-50 dark:bg-brandcomp-900">
      <template #links>
        <UPricingToggle v-model="isYearly"
                        class="w-48" />
      </template>
    </UPageHero>

    <UContainer class="py-12">
      <UPricingGrid>
        <UPricingCard v-for="(plan, index) in page.plans"
                      v-bind="plan"
                      :key="index"
                      :price="isYearly ? plan.price.year.label : plan.price.month.label"
                      :cycle="isYearly ? '/year' : '/month'"
                      class="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <template #title>
            <span class="font-brand text-sky-600 dark:text-sky-400">{{ plan.title }}</span>
          </template>
        </UPricingCard>
      </UPricingGrid>
    </UContainer>

    <ULandingSection class="bg-gray-50 dark:bg-gray-800">
      <ULandingLogos :title="page.logos.title"
                     class="text-gray-700 dark:text-gray-300">
        <div class="overflow-hidden">
          <div class="flex animate-scroll">
            <Icon v-for="icon in page.logos.icons"
                  :icon="icon"
                  :name="icon"
                  class="w-12 h-12 flex-shrink-0 text-gray-400 dark:text-gray-500 opacity-50 mx-8" />
          </div>
        </div>
      </ULandingLogos>
    </ULandingSection>

    <ULandingSection :title="page.faq.title"
                     :description="page.faq.description"
                     class="bg-white dark:bg-gray-900">
      <ULandingFAQ :items="page.faq.items"
                   v-html="page.faq.content"
                   multiple
                   class="max-w-4xl mx-auto text-gray-700 dark:text-gray-300" />
    </ULandingSection>
  </div>
</template>


<style lang="css" scoped>
@keyframes scroll {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}

.animate-scroll {
  animation: scroll 20s linear infinite;
}
</style>
