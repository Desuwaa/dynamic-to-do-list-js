"use strict";

// Retrieve tasks from localStorage or default to an empty array
let storage = JSON.parse(localStorage.getItem("tasks")) || {};

document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  // Load existing tasks onto the page
  loadTasks(taskList);

  // Handle adding a new task
  const addTask = () => {
    const taskText = taskInput.value.trim();
    if (!taskText) {
      alert("Please, enter a task to add.");
    } else {
      addTaskToThePage(taskText, taskList);
      taskInput.value = "";
      addTaskToStorage(taskText);
    }
  };

  // Event listeners for the add button and Enter key
  addButton.addEventListener("click", addTask);
  taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") addTask();
  });
});

// Adds a task to the visible task list
const addTaskToThePage = (task, pageList) => {
  const addNewTask = document.createElement("li");
  addNewTask.textContent = task;

  // Create the remove button
  const removeTaskButton = document.createElement("button");
  removeTaskButton.classList.add("remove-btn");
  removeTaskButton.textContent = "Remove";

  // Remove task from page and storage when button is clicked
  removeTaskButton.onclick = function () {
    this.parentElement.remove();
    removeTaskFromStorage(task);
  };

  // Append elements to the DOM
  pageList.appendChild(addNewTask);
  addNewTask.appendChild(removeTaskButton);
};

// Adds a task to localStorage function
const addTaskToStorage = (task) => {
  const uniqueID = crypto.randomUUID();
  storage[uniqueID] = task;
  localStorage.setItem("tasks", JSON.stringify(storage));
};

// Removes a task from localStorage
const removeTaskFromStorage = (task) => {
  Object.keys(storage).forEach((key) => {
    if (storage[key] === task) delete storage[key];
  });
  localStorage.setItem("tasks", JSON.stringify(storage));
};

// A function to loads tasks from storage into the page
const loadTasks = (displayContainer) => {
  Object.keys(storage).forEach((task) =>
    addTaskToThePage(storage[task], displayContainer)
  );
};
