<!-- components/OnetimeSecretOg.vue -->
<template>
  <div class="og-container">
    <div class="og-content">
      <h1 class="og-title">{{ title }}</h1>
      <p v-if="description" class="og-description">{{ description }}</p>
      <p v-if="headline" class="og-headline">{{ headline }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description?: string
  headline?: string
}>()
</script>

<style>
.og-container {
  width: 1200px;
  height: 630px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f9fa;
  font-family: system-ui, -apple-system, sans-serif;
}

.og-content {
  padding: 60px;
  max-width: 90%;
}

.og-title {
  font-size: 64px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #1c1c1c;
}

.og-description {
  font-size: 32px;
  color: #4a4a4a;
  margin-bottom: 16px;
}

.og-headline {
  font-size: 24px;
  font-weight: 600;
  color: #dc4a22;
}
</style>
