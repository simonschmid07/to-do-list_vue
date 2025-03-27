<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useTodoStore } from '../stores/todo';
import TaskCard from './TaskCard.vue';

const store = useTodoStore();
const searchContainer = ref<HTMLElement | null>(null);

function handleClickOutside(event: MouseEvent) {
  if (searchContainer.value && !searchContainer.value.contains(event.target as Node)) {
    store.searchQuery = '';
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    store.searchQuery = '';
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside);
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside);
  window.removeEventListener('keydown', handleKeydown);
});
</script>

<template>
  <div ref="searchContainer" class="position-relative">
    <div
      v-if="store.searchResults.length > 0"
      class="position-absolute start-0 w-100 bg-white shadow-lg rounded-bottom border p-3"
      style="max-height: 400px; overflow-y: auto; z-index: 1000;"
    >
      <div class="d-flex flex-column gap-2">
        <TaskCard v-for="task in store.searchResults" :key="task.id" :task="task" />
      </div>
    </div>
  </div>
</template>