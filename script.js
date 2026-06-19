// Get references to DOM elements
const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const emptyMessage = document.getElementById("empty-message");

// Add a task when the button is clicked
addBtn.addEventListener("click", addTask);

// Also add a task when Enter is pressed in the input
taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

function addTask() {
  const text = taskInput.value.trim();

  if (text === "") return; // Do nothing if the input is empty

  // Create the list item
  const li = document.createElement("li");
  li.classList.add("task-item");

  // Use a unique ID to link the checkbox and label
  const id = "task-" + Date.now();

  // Checkbox to mark complete
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = id;
  checkbox.addEventListener("change", function () {
    li.classList.toggle("completed", checkbox.checked);
  });

  // Label showing the task text
  const label = document.createElement("label");
  label.htmlFor = id;
  label.textContent = text;

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "×";
  deleteBtn.title = "Delete task";
  deleteBtn.addEventListener("click", function () {
    li.remove();
    updateEmptyMessage();
  });

  // Assemble and append the task
  li.appendChild(checkbox);
  li.appendChild(label);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  // Clear the input and update UI
  taskInput.value = "";
  taskInput.focus();
  updateEmptyMessage();
}

function updateEmptyMessage() {
  emptyMessage.style.display = taskList.children.length === 0 ? "block" : "none";
}

// Show the empty message on first load
updateEmptyMessage();
