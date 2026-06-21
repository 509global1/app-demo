// Get references to DOM elements
const taskInput = document.getElementById("task-input");
const dueDateInput = document.getElementById("due-date");
const dueTimeInput = document.getElementById("due-time");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const emptyMessage = document.getElementById("empty-message");
const clearBtn = document.getElementById("clear-btn");

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

  // Capture when the task was created
  const createdAt = new Date();

  // Capture the optional due date and time
  const dueDateValue = dueDateInput.value; // e.g. "2025-12-31"
  const dueTimeValue = dueTimeInput.value; // e.g. "14:30"

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

  // Wrapper that holds the label and the meta info below it
  const taskBody = document.createElement("div");
  taskBody.classList.add("task-body");

  // Label showing the task text
  const label = document.createElement("label");
  label.htmlFor = id;
  label.textContent = text;

  // Meta row: created time + optional due date/time
  const meta = document.createElement("div");
  meta.classList.add("task-meta");

  // "Created" timestamp
  const createdSpan = document.createElement("span");
  createdSpan.textContent = "Created: " + formatDateTime(createdAt);
  meta.appendChild(createdSpan);

  // "Due" timestamp (only if the user picked a date)
  if (dueDateValue) {
    const dueSpan = document.createElement("span");
    dueSpan.classList.add("due");

    // Build a Date from the selected date + time (noon if no time chosen)
    const dueDate = new Date(dueDateValue + "T" + (dueTimeValue || "12:00"));
    dueSpan.textContent = "Due: " + formatDateTime(dueDate);

    // Highlight overdue tasks
    if (dueDate < new Date()) {
      dueSpan.classList.add("overdue");
    }

    meta.appendChild(dueSpan);
  }

  taskBody.appendChild(label);
  taskBody.appendChild(meta);

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
  li.appendChild(taskBody);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  // Clear the inputs and update UI
  taskInput.value = "";
  dueDateInput.value = "";
  dueTimeInput.value = "";
  taskInput.focus();
  updateEmptyMessage();
}

// Format a Date object into a readable string like "Jun 20, 2025 at 2:30 PM"
function formatDateTime(date) {
  const dateStr = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const timeStr = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
  return dateStr + " at " + timeStr;
}

clearBtn.addEventListener("click", function () {
  taskList.innerHTML = "";
  updateEmptyMessage();
});

function updateEmptyMessage() {
  const hasTasks = taskList.children.length > 0;
  emptyMessage.style.display = hasTasks ? "none" : "block";
  clearBtn.style.display = hasTasks ? "inline" : "none";
}

// Show the empty message on first load
updateEmptyMessage();
