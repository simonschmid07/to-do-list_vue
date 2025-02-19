<script>
import TaskCard from "./TaskCard.vue";

export default {
  components: {
    TaskCard,
  },
  data() {
    return {
      tasks: [
        {
          title: "Einkaufen",
          description: "Milch, Brot und Eier kaufen",
          category: "Haushalt",
          priority: "Hoch",
        },
        {
          title: "Lernen",
          description: "Vue.js lernen",
          category: "Bildung",
          priority: "Mittel",
        },
        {
          title: "Sport",
          description: "Joggen gehen",
          category: "Gesundheit",
          priority: "Niedrig",
        },
      ],
    };
  },
};
</script>

<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2>Dashboard</h2>
      <button class="btn btn-primary">Create New +</button>
    </div>
    <div class="row">
      <div class="col-md-4">
        <h4>To-Do</h4>
        <TaskCard v-for="task in tasks" :key="task.title" :task="task" />
      </div>
      <div class="col-md-4">
        <h4>In Progress</h4>
        <TaskCard v-for="task in tasks" :key="task.title" :task="task" />
      </div>
      <div class="col-md-4">
        <h4>Finished</h4>
        <TaskCard v-for="task in tasks" :key="task.title" :task="task" />
      </div>
    </div>
  </div>
</template>
