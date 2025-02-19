<script>
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
};
</script>

<template>
  <div class="card mb-2">
    <div class="card-body">
      <h2 class="card-title">{{ task.title }}</h2>
      <p class="card-description">{{ task.description }}</p>
      <p class="card-category"><strong>Kategorie:</strong> {{ task.category }}</p>
      <p class="card-priority"><strong>Priorität:</strong> {{ task.priority }}</p>
    </div>
  </div>
</template>

<style scoped>
  .card {
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
  }
  .card-body {
    padding: 1rem;
  }
  .card-title {
    font-size: 1.2rem;
    font-weight: bold;
  }
  .card-description {
    color: #555;
  }
  .card-category,
  .card-priority {
    font-size: 0.9rem;
    color: #666;
  }

</style>
