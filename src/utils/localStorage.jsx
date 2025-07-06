// utils/localStorage.js

export const loadTasks = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading tasks:", error);
    return [];
  }
};

export const saveTasks = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving tasks:", error);
  }
};
