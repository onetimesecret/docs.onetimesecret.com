<template>
  <div>
    <NuxtImg
      :src="props.src"
      :alt="props.alt"
      :width="props.width"
      :height="props.height"
      @click="openModal"
      class="rounded-lg border border-gray-300 shadow-lg dark:opacity-75 cursor-pointer"
    />
    <teleport to="body">
      <div v-if="isModalOpen" @click="closeModal" class="modal">
        <NuxtImg :src="props.src" :alt="props.alt" class="modal-image" />
      </div>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

interface Props {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
}

const props = defineProps<Props>();
const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isModalOpen.value) {
    closeModal();
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown);
});
</script>


<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-image {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  transform: scale(1.2);
  transition: transform 0.3s ease-in-out;
}

.modal-image:hover {
  transform: scale(1.5);
}
</style>
