<script setup lang="ts">
import { joinURL, withoutTrailingSlash } from 'ufo';
import type { BlogPost } from '~/types';

const route = useRoute()

const { data: post } = await useAsyncData(route.path, () => queryContent<BlogPost>(route.path).findOne())
if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => queryContent('/blog')
  .where({ _extension: 'md' })
  .without(['body', 'excerpt'])
  .sort({ date: -1 })
  .findSurround(withoutTrailingSlash(route.path))
, { default: () => [] })

const title = post.value.head?.title || post.value.title
const description = post.value.head?.description || post.value.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

if (post.value.image?.src) {
  const site = useSiteConfig()

  useSeoMeta({
    ogImage: joinURL(site.url, post.value.image.src),
    twitterImage: joinURL(site.url, post.value.image.src)
  })
} else {
  defineOgImage({
    component: 'Saas',
    title,
    description,
    headline: 'Blog'
  })
}
</script>

<template>
  <UContainer v-if="post" class="py-16">
    <div class="mb-8">
      <NuxtLink to="/blog" class="text-sm font-medium text-primary-600 hover:text-primary-500">
        <svg class="inline-block w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        Back to Blog
      </NuxtLink>
    </div>

    <article class="max-w-4xl mx-auto">
      <header class="mb-10">
        <UBadge
          v-bind="post.badge"
          variant="subtle"
          class="mb-4"
        />
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">{{ post.title }}</h1>
        <div class="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
          <time>{{ new Date(post.date).toLocaleDateString('en', { year: 'numeric', month: 'long', day: 'numeric' }) }}</time>
          <span>&middot;</span>
          <span>{{ post.readingTime }} min read</span>
        </div>
      </header>

      <div class="flex flex-wrap items-center gap-3 mb-8">
        <UButton
          v-for="(author, index) in post.authors"
          :key="index"
          :to="author.to"
          color="white"
          target="_blank"
          size="sm"
          class="flex items-center space-x-2"
        >
          <UAvatar
            v-bind="author.avatar"
            :alt="author.name"
            size="xs"
          />
          <span>{{ author.name }}</span>
        </UButton>
      </div>

      <div class="prose dark:prose-invert max-w-none">
        <ContentRenderer
          v-if="post && post.body"
          :value="post"
        />
      </div>

      <hr v-if="surround?.length" class="my-12">

      <UContentSurround :surround="surround" />
    </article>

    <aside class="mt-16">
      <UContentToc
        v-if="post.body && post.body.toc"
        :links="post.body.toc.links"
        class="sticky top-8"
      />
    </aside>
  </UContainer>
</template>
