<!-- pages/debug.vue -->
<template>
  <div>
    <h1>Content Debug</h1>
    <pre>{{ content }}</pre>
  </div>
</template>

<script setup>
const { data: content } = await useAsyncData('content', () => queryContent().find())
</script>
