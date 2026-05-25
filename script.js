const addForm = document.getElementById("add-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const filters = document.querySelector(".filters");

let currentFilter = "all";

addForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = taskInput.value.trim();
  if (text === "") {
    return;
  }

  addTask(text);
  taskInput.value = "";
  taskInput.focus();
});

filters.addEventListener("click", function (event) {
  const button = event.target.closest(".filter-btn");
  if (!button) {
    return;
  }

  currentFilter = button.getAttribute("data-filter");

  const filterButtons = filters.querySelectorAll(".filter-btn");
  filterButtons.forEach(function (btn) {
    btn.classList.toggle("active", btn === button);
  });

  applyFilter();
});

function addTask(text) {
  const listItem = document.createElement("li");
  listItem.className = "task-item";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const span = document.createElement("span");
  span.className = "task-text";
  span.textContent = text;

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "Delete";

  checkbox.addEventListener("change", function () {
    listItem.classList.toggle("completed", checkbox.checked);
    applyFilter();
  });

  deleteBtn.addEventListener("click", function () {
    listItem.remove();
    applyFilter();
  });

  listItem.appendChild(checkbox);
  listItem.appendChild(span);
  listItem.appendChild(deleteBtn);
  taskList.appendChild(listItem);

  applyFilter();
}

function isTaskCompleted(taskItem) {
  const checkbox = taskItem.querySelector('input[type="checkbox"]');
  return checkbox.checked;
}

function shouldShowTask(isCompleted) {
  if (currentFilter === "all") {
    return true;
  }
  if (currentFilter === "pending") {
    return !isCompleted;
  }
  if (currentFilter === "completed") {
    return isCompleted;
  }
  return true;
}

function applyFilter() {
  const items = taskList.querySelectorAll(".task-item");

  items.forEach(function (item) {
    const isCompleted = isTaskCompleted(item);
    const show = shouldShowTask(isCompleted);
    item.classList.toggle("hidden-by-filter", !show);
  });

  updateEmptyMessage();
}

function updateEmptyMessage() {
  const items = taskList.querySelectorAll(".task-item");
  const visibleItems = taskList.querySelectorAll(
    ".task-item:not(.hidden-by-filter)"
  );
  const existingMessage = taskList.querySelector(".empty-message");

  let messageText = "";

  if (items.length === 0) {
    messageText = "No tasks yet. Add one above!";
  } else if (visibleItems.length === 0) {
    if (currentFilter === "completed") {
      messageText = "No completed tasks.";
    } else if (currentFilter === "pending") {
      messageText = "No pending tasks.";
    }
  }

  if (messageText) {
    if (existingMessage) {
      existingMessage.textContent = messageText;
    } else {
      const message = document.createElement("p");
      message.className = "empty-message";
      message.textContent = messageText;
      taskList.appendChild(message);
    }
  } else if (existingMessage) {
    existingMessage.remove();
  }
}

applyFilter();
