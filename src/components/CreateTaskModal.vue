<script setup>
import { ref, watch } from "vue";
import { useTodoStore } from "../stores/todo";

const props = defineProps({
  show: Boolean,
  categoryId: String,
  task: Object,
});

const emit = defineEmits(["close"]);

const store = useTodoStore();

const title = ref("");
const content = ref("");
const priority = ref("medium");
const status = ref("todo");
const selectedCategoryId = ref(props.task?.categoryId || props.categoryId);

watch(
  () => props.task,
  (newTask) => {
    if (newTask) {
      title.value = newTask.title;
      content.value = newTask.content;
      priority.value = newTask.priority;
      status.value = newTask.status;
      selectedCategoryId.value = newTask.categoryId || props.categoryId;
    } else {
      resetForm();
      selectedCategoryId.value = props.categoryId;
    }
  },
  { immediate: true }
);

function saveTask() {
  if (title.value.trim()) {
    const updatedTask = {
      title: title.value.trim(),
      content: content.value.trim(),
      priority: priority.value,
      status: status.value,
      categoryId: selectedCategoryId.value,
    };

    if (props.task) {
      if (props.task.categoryId === selectedCategoryId.value) {
        store.updateTask(props.task.id, updatedTask);
      } else {
        store.deleteTask(props.task.id);
        const newTask = { ...updatedTask, id: props.task.id };
        const newCategory = store.categories.find(
          (c) => c.id === selectedCategoryId.value
        );
        if (newCategory) {
          newCategory.tasks.push(newTask);
        }
      }
    } else {
      store.addTask(selectedCategoryId.value, updatedTask);
    }
    resetForm();
    emit("close");
  }
}

function resetForm() {
  title.value = "";
  content.value = "";
  priority.value = "medium";
  status.value = "todo";
}
</script>

<template>
  <div
    v-if="show"
    class="modal d-block"
    tabindex="-1"
    style="background-color: rgba(0, 0, 0, 0.5)"
  >
    <div class="modal-dialog" style="z-index: 1050">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            {{ task ? "Aufgabe bearbeiten" : "Neue Aufgabe erstellen" }}
          </h5>
          <button
            type="button"
            class="btn-close"
            @click="emit('close')"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label">Titel</label>
            <input
              v-model="title"
              type="text"
              class="form-control"
              placeholder="Aufgaben Titel"
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Beschreibung</label>
            <textarea
              v-model="content"
              rows="3"
              class="form-control"
              placeholder="Aufgabe beschreiben"
            ></textarea>
          </div>

          <div class="row mb-3">
            <div class="col">
              <label class="form-label">Priorität</label>
              <select v-model="priority" class="form-select">
                <option value="low">Niedrig</option>
                <option value="medium">Medium</option>
                <option value="high">Hoch</option>
              </select>
            </div>

            <div class="col">
              <label class="form-label">Status</label>
              <select v-model="status" class="form-select">
                <option value="todo">Zu erledigen</option>
                <option value="in-progress">In Bearbeitung</option>
                <option value="done">Erledigt</option>
              </select>
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label">Kategorie</label>
            <select v-model="selectedCategoryId" class="form-select">
              <option
                v-for="category in store.categories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            @click="emit('close')"
          >
            Abbrechen
          </button>
          <button type="button" class="btn btn-primary" @click="saveTask">
            {{ task ? "Speichern" : "Aufgabe erstellen" }}
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
