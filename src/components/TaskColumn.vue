<script setup>
import TaskCard from './TaskCard.vue';

defineProps({
  title: {
    type: String,
    required: true
  },
  tasks: {
    type: Array,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  categoryId: {
    type: String,
    required: true
  }
});
</script>

<template>
  <div class="bg-light p-3 rounded">
    <h3 class="h5 mb-3">{{ title }}</h3>
    <div class="d-flex flex-column gap-3">
      <div v-for="task in tasks" :key="task.id">
        <TaskCard :task="task" />
      </div>
    </div>
  </div>
</template>