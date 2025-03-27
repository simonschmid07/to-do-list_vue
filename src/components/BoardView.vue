<script setup>
import { computed } from "vue";
import { useTodoStore } from "../stores/todo";
import TaskColumn from "./TaskColumn.vue";

const store = useTodoStore();

const currentCategory = computed(() => {
  return store.categories.find((c) => c.id === store.activeCategoryId);
});

const columns = computed(() => {
  if (!currentCategory.value) return [];

  return [
    {
      title: "Zu erledigen",
      status: "todo",
      tasks: currentCategory.value.tasks.filter((t) => t.status === "todo"),
    },
    {
      title: "In Bearbeitung",
      status: "in-progress",
      tasks: currentCategory.value.tasks.filter(
        (t) => t.status === "in-progress"
      ),
    },
    {
      title: "Erledigt",
      status: "done",
      tasks: currentCategory.value.tasks.filter((t) => t.status === "done"),
    },
  ];
});
</script>

<template>
  <div class="row g-4">
    <div class="col-12 col-md-4" v-for="column in columns" :key="column.status">
      <TaskColumn
        :title="column.title"
        :tasks="column.tasks"
        :status="column.status"
        :categoryId="store.activeCategoryId"
      />
    </div>
  </div>
</template>
