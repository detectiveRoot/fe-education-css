let todoForm = document.querySelector(".todo");
let input = todoForm.querySelector(".enter");
let addButton = todoForm.querySelector(".button_action_add");
let resetButton = todoForm.querySelector(".button_action_reset");
let taskList = todoForm.querySelector(".tasks");

function createTask(taskText) {
  let newTask = document.createElement("li");
  newTask.classList.add("task");
  newTask.draggable = true;
  newTask.textContent = taskText;
  taskList.appendChild(newTask);
}

function addTask() {
  let taskText = input.value.trim();

  if (taskText) {
    createTask(taskText);
    input.value = "";
    saveTasks();
  }
}

function addTaskOnEnter(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addTask();
  }
}

function toggleTaskCompleted(event) {
  let li = event.target;

  if (li.classList.contains("task")) {
    li.classList.toggle("task_completed");
    saveTasks();
  }
}

function resetTasks() {
  if (taskList.innerHTML) {
    taskList.innerHTML = "";
    saveTasks();
  }
}

function saveTasks() {
  let tasks = [...taskList.children].map(task => ({
    text: task.textContent,
    completed: task.classList.contains("task_completed")
  }));

  localStorage.setItem("taskList", JSON.stringify(tasks));
}

function renderTasks(localTask) {
  let task = document.createElement("li");
  task.classList.add("task");
  task.draggable = true;
  if (localTask.completed) task.classList.add("task_completed");
  task.textContent = localTask.text;
  taskList.appendChild(task);
}

function loadTasks() {
  let localTasks = JSON.parse(localStorage.getItem("taskList")) || [];
  taskList.innerHTML = "";

  localTasks.forEach(localTask => {
    renderTasks(localTask);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
  todoForm.style.display = "block";
});
addButton.addEventListener("click", addTask);
input.addEventListener("keydown", addTaskOnEnter);
resetButton.addEventListener("click", resetTasks);
taskList.addEventListener("click", toggleTaskCompleted);

/* ------Drag’n’Drop------ */

taskList.addEventListener("dragstart", (event) => {
  event.target.classList.add('dragging');
});

taskList.addEventListener("dragend", (event) => {
  event.target.classList.remove('dragging');
});

taskList.addEventListener("dragover", (event) => {
  event.preventDefault();

  let activeElement = taskList.querySelector(".dragging");

  let currentElement = event.target;

  let isMoveable = activeElement !== currentElement &&
    currentElement.classList.contains("task");

  if (!isMoveable) return;

  let nextElement = (currentElement === 
    activeElement.nextElementSibling) ?
    currentElement.nextElementSibling : currentElement;
  
  taskList.insertBefore(activeElement, nextElement);

  saveTasks();
});