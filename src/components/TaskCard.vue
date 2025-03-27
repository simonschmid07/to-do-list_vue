<script setup>
import { ref } from "vue";
import CreateTaskModal from "./CreateTaskModal.vue";
import { useTodoStore } from "../stores/todo";

const props = defineProps({
  task: Object,
});
const store = useTodoStore();

const showModal = ref(false);
</script>

<template>
  <div class="card">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <h4 class="card-title h6 mb-0">{{ task.title }}</h4>
        <span
          class="badge"
          :class="{
            'bg-danger': task.priority === 'high',
            'bg-warning': task.priority === 'medium',
            'bg-success': task.priority === 'low',
          }"
        >
          {{
            task.priority === "high"
              ? "Hoch"
              : task.priority === "low"
              ? "Niedrig"
              : "Medium"
          }}
        </span>
      </div>

      <div v-if="task.content" class="mt-2 text-muted">
        {{ task.content }}
      </div>

      <div style="text-align: right">
        <i
          class="bi bi-pencil-square text-primary"
          style="cursor: pointer; font-size: 1.2rem"
          @click="showModal = true"
        ></i>

        <i
          class="bi bi-trash text-danger"
          style="cursor: pointer; font-size: 1.2rem; margin-left: 1.2rem"
          @click="store.deleteTask(task.id)"
        ></i>
      </div>
    </div>
  </div>

  <CreateTaskModal :show="showModal" :task="task" @close="showModal = false" />
</template>
