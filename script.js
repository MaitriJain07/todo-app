const addForm = document.getElementById("add-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

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
  });

  deleteBtn.addEventListener("click", function () {
    listItem.remove();
    updateEmptyMessage();
  });

  listItem.appendChild(checkbox);
  listItem.appendChild(span);
  listItem.appendChild(deleteBtn);
  taskList.appendChild(listItem);

  updateEmptyMessage();
}

function updateEmptyMessage() {
  const existingMessage = taskList.querySelector(".empty-message");

  if (taskList.children.length === 0) {
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

updateEmptyMessage();
