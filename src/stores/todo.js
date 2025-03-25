import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useTodoStore = defineStore("todo", () => {
  const storedData = JSON.parse(localStorage.getItem("todoData"));
  const categories = ref(
    storedData?.categories || [
      { id: "schule", name: "Schule", tasks: [] },
      { id: "arbeit", name: "Arbeit", tasks: [] },
      { id: "freizeit", name: "Freizeit", tasks: [] },
    ]
  );
  const activeCategoryId = ref(storedData?.activeCategoryId || "schule");

  function saveToLocalStorage() {
    localStorage.setItem(
      "todoData",
      JSON.stringify({ categories: categories.value, activeCategoryId: activeCategoryId.value })
    );
  }

  function setActiveCategory(categoryId) {
    activeCategoryId.value = categoryId;
    saveToLocalStorage();
  }

  function addTask(categoryId, task) {
    const category = categories.value.find((c) => c.id === categoryId);
    if (category) {
      category.tasks.push({ ...task, id: crypto.randomUUID() });
      saveToLocalStorage();
    }
  }

  function updateTask(taskId, updatedTask) {
    categories.value.forEach((category) => {
      const taskIndex = category.tasks.findIndex((t) => t.id === taskId);
      if (taskIndex !== -1) {
        category.tasks[taskIndex] = { ...category.tasks[taskIndex], ...updatedTask };
        saveToLocalStorage();
      }
    });
  }

  function deleteTask(taskId) {
    categories.value.forEach((category) => {
      category.tasks = category.tasks.filter((task) => task.id !== taskId);
    });
    saveToLocalStorage();
  }

  watch(categories, saveToLocalStorage, { deep: true });
  watch(activeCategoryId, saveToLocalStorage);

  return {
    categories,
    activeCategoryId,
    setActiveCategory,
    addTask,
    updateTask,
    deleteTask,
  };
});
