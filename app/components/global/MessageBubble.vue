<script setup lang="ts">
import markdownParser from "@nuxt/content/transformers/markdown";
import { ref, watchEffect } from 'vue';

interface MessageBubbleProps {
  role: 'user' | 'assistant';
  content: string | { type: string; text: string }[];
}

const props = defineProps<MessageBubbleProps>();

const isUser = props.role === 'user';
const parsedContent = ref("");

watchEffect(async () => {
  if (typeof props.content === 'string') {
    await markdownParser.parse("custom.md", props.content).then((md) => parsedContent.value = md);
  } else {
    const markdownString = props.content
      .filter(item => item.type === 'text')
      .map(item => item.text)
      .join('\n\n');
    await markdownParser.parse("custom.md", markdownString).then((md) => parsedContent.value = md);
  }
});
</script>

<template>
  <div
    class="p-4 cursor-pointer transition-colors duration-200 dark:text-gray-200"
    :class="{
      'bg-brandcompdim-100 dark:bg-brandcompdim-900': isUser,
      'bg-brandcomp-300 dark:bg-brandcomp-800': !isUser
    }"
  >
    <div class="font-semibold mb-2 dark:text-gray-300">
      {{ isUser ? 'User' : 'Assistant' }}
    </div>
    <ContentRendererMarkdown :value="parsedContent" v-if="parsedContent" />
  </div>
</template>
