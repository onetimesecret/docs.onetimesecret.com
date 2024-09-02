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
  <NuxtLayout>
  <div v-if="page">
    <UPageHero v-bind="page.hero">
      <template #links>
        <UPricingToggle v-model="isYearly"
                        class="w-48" />
      </template>
    </UPageHero>

    <UContainer>
      <UPricingGrid>
        <UPricingCard v-for="(plan, index) in page.plans"
                      v-bind="plan"
                      :key="index"
                      :price="isYearly ? plan.price.year.label : plan.price.month.label"
                      :cycle="isYearly ? '/year' : '/month'">
          <template #title>
            <span class="font-brand">{{ plan.title }}</span>
          </template>
        </UPricingCard>
      </UPricingGrid>
    </UContainer>

    <ULandingSection>
      <ULandingLogos :title="page.logos.title">
        <div class="overflow-hidden">
          <div class="flex animate-scroll">
            <Icon v-for="icon in page.logos.icons"
                  :icon="icon"
                  :name="icon"
                  class="w-12 h-12 flex-shrink-0 text-gray-400 dark:text-gray-400 opacity-50" />
          </div>
        </div>
      </ULandingLogos>
    </ULandingSection>


    <ULandingSection :title="page.faq.title"
                     :description="page.faq.description">
      <ULandingFAQ :items="page.faq.items"
                   v-html="page.faq.content"
                   multiple
                   class="max-w-4xl mx-auto" />
    </ULandingSection>
  </div>
  </NuxtLayout>
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
