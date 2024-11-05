<template>
  <div class="ellipsis">
    <slot />
  </div>
</template>

<script setup lang="ts">
// You can add any necessary script here
</script>

<style scoped>
.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
