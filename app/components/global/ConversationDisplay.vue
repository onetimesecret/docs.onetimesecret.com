<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import MessageBubble from './MessageBubble.vue';
import PromptLogDisplay from './PromptLogDisplay.vue';

interface Message {
  role: 'user' | 'assistant';
  content: string | { type: string; text: string }[];
}

interface PromptLog {
  modelTitle: string;
  prompt: string;
  completion: string;
  completionOptions: {
    model: string;
    maxTokens: number;
  };
}

interface ConversationData {
  title: string;
  sessionId: string;
  workspaceDirectory: string;
  history: {
    message: Message;
    contextItems: any[];
    editorState?: {
      type: string;
      content: { type: string; content: { type: string; text: string }[] }[];
    };
    promptLogs?: PromptLog[];
  }[];
}

interface ConversationDisplayProps {
  jsonUrl: string;
}

const props = withDefaults(defineProps<ConversationDisplayProps>(), {
  jsonUrl: '',
});

const conversation = ref<ConversationData | null>(null);
const error = ref<string | null>(null);
const selectedMessageIndex = ref<number | null>(null);

const fetchConversation = async () => {
  try {
    const response = await axios.get(props.jsonUrl);
    conversation.value = response.data;
  } catch (err) {
    error.value = 'Failed to load conversation data';
    console.error(err);
  }
};

onMounted(fetchConversation);

const togglePromptLogs = (index: number) => {
  selectedMessageIndex.value = selectedMessageIndex.value === index ? null : index;
};
</script>

<template>
  <div class="max-w-4xl mx-auto p-4">
    <template v-if="conversation">
      <h1 class="text-3xl font-bold mb-6 dark:text-white">{{ conversation.title }}</h1>
      <div class="mb-4 text-sm text-gray-600 dark:text-gray-200">
        <p>Session ID: {{ conversation.sessionId }}</p>
        <p>Workspace: {{ conversation.workspaceDirectory }}</p>
      </div>
      <div class="space-y-6">
        <div
          v-for="(item, index) in conversation.history"
          :key="index"
          class="rounded-lg shadow-md overflow-hidden dark:shadow-gray-700"
        >
          <MessageBubble
            :role="item.message.role"
            :content="item.message.content"
            @click="togglePromptLogs(index)"
          />
          <PromptLogDisplay
            v-if="selectedMessageIndex === index && item.promptLogs"
            :prompt-logs="item.promptLogs"
          />
        </div>
      </div>
    </template>
    <div v-else-if="error" class="text-brand-600 dark:text-brand-400 text-center">
      {{ error }}
    </div>
    <div v-else class="flex justify-center items-center h-64">
      <svg class="animate-spin h-8 w-8 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
  </div>
</template>
