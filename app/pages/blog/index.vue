<script setup lang="ts">
import type { BlogPost } from '~/types';

const { data: page } = await useAsyncData('blog', () => queryContent('/blog').findOne())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const { data: posts } = await useAsyncData('posts', () => queryContent<BlogPost>('/blog')
  .where({ _extension: 'md' })
  .sort({ date: -1 })
  .find())

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

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' });
};
</script>

<template>
  <UContainer class="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 dark:bg-gray-900">
    <UPageHeader
      v-bind="page"
      class="mb-16"
    />

    <UPageBody>
      <UBlogList class="grid gap-12 sm:grid-cols-1 md:grid-cols-2">
        <UBlogPost
          v-for="(post, index) in posts"
          :key="index"
          :to="post._path"
          :title="post.title"
          :description="post.description"
          :image="post.image"
          :date="formatDate(post.date)"
          :authors="post.authors"
          :badge="post.badge"
          :orientation="index === 0 ? 'horizontal' : 'vertical'"
          :class="[
            index === 0 ? 'col-span-full mb-16' : '',
            'transition-all duration-300 hover:shadow-lg dark:hover:shadow-gray-700 rounded-lg overflow-hidden'
          ]"
          :ui="{
            description: 'line-clamp-2 text-gray-600 dark:text-gray-300',
            wrapper: index === 0 ? 'md:flex-row md:items-center' : '',
            image: index === 0 ? 'md:w-1/2 h-64 md:h-auto object-cover' : 'h-48 object-cover',
            content: index === 0 ? 'md:w-1/2 md:pl-10 p-6' : 'p-6',
            title: 'text-xl font-semibold text-gray-900 dark:text-white mb-2',
            date: 'text-sm text-gray-500 dark:text-gray-400'
          }"
        />
      </UBlogList>
    </UPageBody>
  </UContainer>
</template>
