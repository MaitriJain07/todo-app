const TASKS_KEY = "todo-tasks";
const THEME_KEY = "todo-dark-mode";

const addForm = document.getElementById("add-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const themeToggle = document.getElementById("theme-toggle");

let tasks = [];

addForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = taskInput.value.trim();
  if (text === "") {
    return;
  }

  const task = {
    id: Date.now(),
    text: text,
    completed: false,
  };

  tasks.push(task);
  taskList.appendChild(createTaskElement(task));
  saveTasks();

  taskInput.value = "";
  taskInput.focus();
  updateEmptyMessage();
});

themeToggle.addEventListener("click", function () {
  const isDark = document.body.classList.toggle("dark-mode");
  themeToggle.textContent = isDark ? "Light mode" : "Dark mode";
  localStorage.setItem(THEME_KEY, isDark);
});

function createTaskElement(task) {
  const listItem = document.createElement("li");
  listItem.className = "task-item";
  if (task.completed) {
    listItem.classList.add("completed");
  }

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;

  const span = document.createElement("span");
  span.className = "task-text";
  span.textContent = task.text;

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "Delete";

  checkbox.addEventListener("change", function () {
    task.completed = checkbox.checked;
    listItem.classList.toggle("completed", checkbox.checked);
    saveTasks();
  });

  deleteBtn.addEventListener("click", function () {
    tasks = tasks.filter(function (item) {
      return item.id !== task.id;
    });
    listItem.remove();
    saveTasks();
    updateEmptyMessage();
  });

  listItem.appendChild(checkbox);
  listItem.appendChild(span);
  listItem.appendChild(deleteBtn);

  return listItem;
}

function saveTasks() {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

function loadTasks() {
  const saved = localStorage.getItem(TASKS_KEY);

  if (!saved) {
    return;
  }

  tasks = JSON.parse(saved);

  tasks.forEach(function (task) {
    taskList.appendChild(createTaskElement(task));
  });
}

function loadTheme() {
  const isDark = localStorage.getItem(THEME_KEY) === "true";

  if (isDark) {
    document.body.classList.add("dark-mode");
    themeToggle.textContent = "Light mode";
  }
}

function updateEmptyMessage() {
  const taskItems = taskList.querySelectorAll(".task-item");
  const existingMessage = taskList.querySelector(".empty-message");

  if (taskItems.length === 0) {
    if (!existingMessage) {
      const message = document.createElement("p");
      message.className = "empty-message";
      message.textContent = "No tasks yet. Add one above!";
      taskList.appendChild(message);
    }
  } else if (existingMessage) {
    existingMessage.remove();
  }
}

loadTheme();
loadTasks();
updateEmptyMessage();
