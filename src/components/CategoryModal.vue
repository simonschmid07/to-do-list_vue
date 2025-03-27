<script setup>
import { ref } from "vue";
import { useTodoStore } from "../stores/todo";

const props = defineProps({
  show: Boolean,
});

const emit = defineEmits(["close"]);

const store = useTodoStore();

const newCategoryName = ref("");

const canDeleteCategory = (categoryId) => {
  const category = store.categories.find((cat) => cat.id === categoryId);
  return category && category.tasks.length === 0;
};

function deleteCategory(categoryId) {
  if (canDeleteCategory(categoryId)) {
    store.deleteCategory(categoryId);
  }
}

function addCategory() {
  if (newCategoryName.value.trim()) {
    const newCategory = {
      id: newCategoryName.value.toLowerCase().replace(/\s+/g, "-"),
      name: newCategoryName.value.trim(),
      tasks: [],
    };
    store.addCategory(newCategory);
    newCategoryName.value = "";
  }
}
</script>

<template>
  <div
    v-if="props.show"
    class="modal d-block"
    tabindex="-1"
    style="background-color: rgba(0, 0, 0, 0.5)"
  >
    <div class="modal-dialog" style="z-index: 1050">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Kategorien verwalten</h5>
          <button
            type="button"
            class="btn-close"
            @click="emit('close')"
          ></button>
        </div>
        <div class="modal-body">
          <div>
            <div class="mb-3">
              <label for="newCategoryName" class="form-label"
                >Neue Kategorie</label
              >
              <input
                v-model="newCategoryName"
                type="text"
                class="form-control"
                id="newCategoryName"
                placeholder="Name der neuen Kategorie"
              />
              <button
                @click="addCategory"
                class="btn btn-primary mt-2"
                :disabled="!newCategoryName.trim()"
              >
                Hinzufügen
              </button>
            </div>

            <hr />

            <ul class="list-group">
              <li
                v-for="category in store.categories"
                :key="category.id"
                class="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>{{ category.name }}</span>
                <button
                  v-if="canDeleteCategory(category.id)"
                  @click="deleteCategory(category.id)"
                  class="btn btn-danger btn-sm"
                >
                  Löschen
                </button>
                <span v-else class="text-muted btn-sm"
                  >Kann nicht gelöscht werden</span
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            @click="emit('close')"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-dialog {
  position: relative;
  margin: 1.75rem auto;
  pointer-events: auto;
}
</style>
