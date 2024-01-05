//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

let taskInput = document.querySelector(".new-task__input");
let addButton = document.querySelector(".new-task__add-btn");
let todoTasks = document.getElementById("todo-tasks");
let completedTasks = document.getElementById("completed-tasks");

/**
 * @param {string} taskString The value of tasls input.
 * @return {element} The future child of todo list.
 */
const createNewTaskElement = (taskString) => {
  let listItem = document.createElement("li");
  listItem.className = "task";

  let checkBox = document.createElement("input");
  let label = document.createElement("label");
  let editInput = document.createElement("input");
  let editButton = document.createElement("button");
  let deleteButton = document.createElement("button");
  let deleteButtonImg = document.createElement("img");

  label.innerText = taskString;
  label.className = "task__label";

  checkBox.type = "checkbox";
  checkBox.className = "task__checkbox";
  editInput.type = "text";
  editInput.className = "task__input";

  editButton.innerText = "Edit";
  editButton.className = "task__edit-btn plain-btn";

  deleteButton.className = "task__delete-btn";
  deleteButtonImg.className = "task__delete-btn_img";
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.alt = "remove";
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};

const addTask = () => {
  if (!taskInput.value.trim()) return;
  console.log("Add Task...");

  let listItem = createNewTaskElement(taskInput.value);

  todoTasks.appendChild(listItem);
  bindTaskEvents(listItem, finishTask);

  taskInput.value = "";
  ajaxRequest();
};

// TODO: change edit to save when you are in edit mode.
const editTask = function () {
  let listItem = this.parentNode;

  let editInput = listItem.querySelector(".task__input");
  let label = listItem.querySelector(".task__label");
  let editBtn = listItem.querySelector(".task__edit-btn");
  let containsClass = listItem.classList.contains("edit-mode");

  if (containsClass) {
    console.log("Change 'edit' to 'save'");
    //switch to .edit-mode
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    console.log("Edit Task...");
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  //toggle .edit-mode on the parent.
  listItem.classList.toggle("edit-mode");
};

const deleteTask = function () {
  console.log("Delete Task...");

  let listItem = this.parentNode;
  let ul = listItem.parentNode;
  ul.removeChild(listItem);
};

const finishTask = function () {
  console.log("Complete Task...");

  let listItem = this.parentNode;
  completedTasks.appendChild(listItem);
  bindTaskEvents(listItem, unfinishTask);
};

const unfinishTask = function () {
  console.log("Incomplete Task...");

  let listItem = this.parentNode;
  todoTasks.appendChild(listItem);
  bindTaskEvents(listItem, finishTask);
};

const ajaxRequest = () => {
  console.log("AJAX Request");
};

/**
 * @param {element} taskListItem todo item.
 * @param {function} checkBoxEventHandler change value of checkbox.
 */
const bindTaskEvents = (taskListItem, checkBoxEventHandler) => {
  console.log("bind list item events");
  let checkBox = taskListItem.querySelector(".task__checkbox");
  let editButton = taskListItem.querySelector(".task__edit-btn");
  let deleteButton = taskListItem.querySelector(".task__delete-btn");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

addButton.addEventListener("click", addTask);

/**
 * @param {element} tasks parent of todo items.
 * @param {function} event change value of checkbox.
 */
function bindEventstoExistTasks(tasks, event) {
  for (let i = 0; i < tasks.children.length; i++) {
    bindTaskEvents(tasks.children[i], event);
  }
}

bindEventstoExistTasks(todoTasks, finishTask);
bindEventstoExistTasks(completedTasks, unfinishTask);
