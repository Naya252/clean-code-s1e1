//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

let taskInput = document.getElementById("new-task");
let addButton = document.querySelector(".add-btn");
let todoTasks = document.getElementById("todo-tasks");
let completedTasks = document.getElementById("completed-tasks");

/**
 * @param {string} taskString The value of tasls input.
 * @return {element} The future child of todo list.
 */
const createNewTaskElement = (taskString) => {
  let listItem = document.createElement("li");
  listItem.className = "tasks__item";

  let checkBox = document.createElement("input");
  let label = document.createElement("label");
  let editInput = document.createElement("input");
  let editButton = document.createElement("button");
  let deleteButton = document.createElement("button");
  let deleteButtonImg = document.createElement("img");

  label.innerText = taskString;
  label.className = "tasks__item_label";

  checkBox.type = "checkbox";
  checkBox.className = "tasks__item_checkbox";
  editInput.type = "text";
  editInput.className = "tasks__item_input";

  editButton.innerText = "Edit";
  editButton.className = "plain-btn edit-btn";

  deleteButton.className = "delete-btn";
  deleteButtonImg.className = "img"
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.alt = "remove";
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}

const addTask = () => {
  if (!taskInput.value.trim()) return;
  console.log("Add Task...");

  let listItem = createNewTaskElement(taskInput.value);

  todoTasks.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
  ajaxRequest();
}

// TODO: change edit to save when you are in edit mode.
const editTask = function() {

  let listItem = this.parentNode;

  let editInput = listItem.querySelector(".tasks__item_input");
  let label = listItem.querySelector(".tasks__item_label");
  let editBtn = listItem.querySelector(".edit-btn");
  let containsClass = listItem.classList.contains("edit-mode");

  if(containsClass) {
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

const deleteTask = function() {
  console.log("Delete Task...");

  let listItem = this.parentNode;
  let ul = listItem.parentNode;
  ul.removeChild(listItem);
}

const taskCompleted = function() {
  console.log("Complete Task...");

  let listItem = this.parentNode;
  completedTasks.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

const taskIncomplete = function () {
  console.log("Incomplete Task...");

  let listItem = this.parentNode;
  todoTasks.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

const ajaxRequest = () => {
  console.log("AJAX Request");
}

//Set the click handler to the addTask function.
addButton.addEventListener("click", addTask);

/**
 * @param {element} taskListItem todo item.
 * @param {function} checkBoxEventHandler change value of checkbox.
 */
const bindTaskEvents = (taskListItem, checkBoxEventHandler) => {
  console.log("bind list item events");
//select ListItems children
  let checkBox = taskListItem.querySelector(".tasks__item_checkbox");
  let editButton = taskListItem.querySelector(".edit-btn");
  let deleteButton = taskListItem.querySelector(".delete-btn");

  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
}

//cycle over todoTasks ul list items
//for each list item
for (let i = 0; i < todoTasks.children.length; i++) {
  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(todoTasks.children[i], taskCompleted);
}

//cycle over completedTasks ul list items
for (let i = 0; i < completedTasks.children.length; i++){
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasks.children[i], taskIncomplete);
}