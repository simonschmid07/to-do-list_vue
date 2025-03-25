<script setup>
import { ref } from "vue";
import { useTodoStore } from "./stores/todo";
import BoardView from "./components/BoardView.vue";
import CreateTaskModal from "./components/CreateTaskModal.vue";

const store = useTodoStore();
const showCreateModal = ref(false);
</script>

<template>
  <div class="min-vh-100 bg-light">
    <header class="bg-white shadow">
      <div class="container py-4 d-flex justify-content-between align-items-center">
        <h1 class="h3 mb-0">ToDo Liste</h1>

        <select v-model="store.activeCategoryId" @change="store.setActiveCategory($event.target.value)" class="form-select w-auto">
          <option v-for="category in store.categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>

        <button @click="showCreateModal = true" class="btn btn-primary">
          Aufgabe erstellen
        </button>
      </div>
    </header>

    <main class="container py-4">
      <div class="mb-4">
        <BoardView :categoryId="store.activeCategoryId" />
      </div>
    </main>

    <CreateTaskModal
      :show="showCreateModal"
      :categoryId="store.activeCategoryId"
      @close="showCreateModal = false"
    />
  </div>
</template>
