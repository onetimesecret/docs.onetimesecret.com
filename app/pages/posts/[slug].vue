<script setup lang="ts">
import { joinURL, withoutTrailingSlash } from 'ufo';
import type { BlogPost } from '~/types';
import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'

const route = useRoute()

const { data: post } = await useAsyncData(route.path, () => queryContent<BlogPost>(route.path).findOne())
if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => queryContent('/posts')
  .where({ _extension: 'md' })
  .without(['body', 'excerpt'])
  .sort({ date: -1 })
  .findSurround(withoutTrailingSlash(route.path))
, { default: () => [] })

const title = post.value.head?.title || post.value.title
const description = post.value.head?.description || post.value.description

// Computed property for formatted date
const formattedDate = computed(() => {
  if (!post.value.date) {
    return 'No date';
  }
  const dateParts = post.value.date.split('-');
  const year = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10) - 1; // Months are 0-based in JavaScript
  const day = parseInt(dateParts[2], 10);
  const date = new Date(year, month, day);

  //if (isNaN(date.getTime())) {
  //  return 'Invalid date';
  //}

  return format(date, 'MMMM d, yyyy', { locale: enUS });
});

// Alternative formats
//const dateFormats = computed(() => ({
//  short: format(parseISO(post.date), 'MMM d, yyyy'),
//  iso: format(parseISO(post.date), 'yyyy-MM-dd'),
//  full: format(parseISO(post.date), 'EEEE, MMMM d, yyyy')
//}))

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
    component: 'OgImageOnetimeSecretOg',
    title,
    description,
    headline: 'Blog'
  })
}
</script>

<template>
  <UContainer v-if="post" class="py-8 sm:py-16">
    <div class="mb-8">
      <NuxtLink to="/" class="text-sm font-medium text-primary-600 hover:text-primary-500">
        <svg class="inline-block w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        Back to Blog
      </NuxtLink>
    </div>

    <article class="max-w-3xl mx-auto prose">
      <header class="mb-12">

          <div v-if="post.image?.src" class="mb-6">
            <img
              :src="post.image.src"
              :alt="post.title"
              class="w-full rounded-lg shadow-sm object-cover max-h-80 mx-auto"
              loading="lazy"
            />
          </div>

        <UBadge
          v-bind="post.badge"
          variant="subtle"
          class="mb-4"
        />
        <h1 class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          {{ post.title }}
        </h1>
        <div class="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
          <time>{{ formattedDate }}</time>
          <span>&middot;</span>
          <span>{{ post.readingTime }} min read</span>
        </div>
        <div class="mt-6 flex flex-wrap items-center gap-4">
          <UButton
            v-for="(author, index) in post.authors"
            :key="index"
            :to="author.to"
            color="white"
            target="_blank"
            size="sm"
            class="inline-flex items-center px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            <UAvatar
              v-bind="author.avatar"
              :alt="author.name"
              size="xs"
              class="mr-2"
            />
            {{ author.name }}
          </UButton>
        </div>
      </header>

      <UPage class="relative">
        <UPageBody prose class="dark:prose-invert max-w-none">
          <ContentRenderer
            v-if="post && post.body"
            :value="post"
          />

          <UContentSurround :surround="surround" class="mt-12" />
        </UPageBody>

        <aside class="hidden xl:block xl:pl-8 xl:w-64 xl:fixed xl:right-10 xl:top-24">
          <UContentToc
            v-if="post.body && post.body.toc"
            :links="post.body.toc.links"
            class="sticky top-24 max-h-(screen-24) overflow-y-auto text-sm text-gray-600 dark:text-gray-400"
          />
        </aside>
      </UPage>
    </article>

  </UContainer>
</template>
