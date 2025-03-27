import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";

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
  const searchQuery = ref("");

  const searchResults = computed(() => {
    if (!searchQuery.value.trim()) return [];

    const query = searchQuery.value.toLowerCase();
    const results = [];

    categories.value.forEach((category) => {
      category.tasks.forEach((task) => {
        if (
          task.title.toLowerCase().includes(query) ||
          task.content?.toLowerCase().includes(query)
        ) {
          results.push(task);
        }
      });
    });

    return results;
  });

  function saveToLocalStorage() {
    localStorage.setItem(
      "todoData",
      JSON.stringify({
        categories: categories.value,
        activeCategoryId: activeCategoryId.value,
      })
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
        category.tasks[taskIndex] = {
          ...category.tasks[taskIndex],
          ...updatedTask,
        };
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

  function addCategory(category) {
    categories.value.push(category);
    saveToLocalStorage();
  }

  function updateCategory(categoryId, newCategoryName) {
    const category = categories.value.find((c) => c.id === categoryId);
    if (category) {
      category.name = newCategoryName;
      saveToLocalStorage();
    }
  }

  function deleteCategory(categoryId) {
    const categoryIndex = categories.value.findIndex(
      (c) => c.id === categoryId
    );
    if (categoryIndex !== -1) {
      categories.value.splice(categoryIndex, 1);
      saveToLocalStorage();
    }
  }

  watch(categories, saveToLocalStorage, { deep: true });
  watch(activeCategoryId, saveToLocalStorage);

  return {
    categories,
    activeCategoryId,
    searchQuery,
    searchResults,
    setActiveCategory,
    addTask,
    updateTask,
    deleteTask,
    addCategory,
    updateCategory,
    deleteCategory,
  };
});
