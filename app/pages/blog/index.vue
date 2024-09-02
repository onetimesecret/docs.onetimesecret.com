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
  <UContainer class="py-12">
    <UPageHeader
      v-bind="page"
      class="mb-12"
    />

    <UPageBody>
      <UBlogList class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
            index === 0 ? 'col-span-full mb-12' : '',
            'transition-shadow duration-300 hover:shadow-md'
          ]"
          :ui="{
            description: 'line-clamp-2',
            wrapper: index === 0 ? 'md:flex-row items-center' : '',
            image: index === 0 ? 'md:w-1/2' : 'h-48 object-cover',
            content: index === 0 ? 'md:w-1/2 md:pl-8' : 'p-4'
          }"
        />
      </UBlogList>
    </UPageBody>
  </UContainer>
</template>
