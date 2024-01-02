//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

let taskInput = document.getElementById("new-task");//Add a new task.
let addButton = document.getElementsByTagName("button")[0];//first button
let todoTasks = document.getElementById("todo-tasks");//ul of main__todo
let completedTasks = document.getElementById("completed-tasks");//completed-tasks

//New task list item
const createNewTaskElement = function(taskString) {
  let listItem = document.createElement("li");
  listItem.className = "tasks__item";

  //input (checkbox)
  let checkBox = document.createElement("input");//checkbx
  //label
  let label = document.createElement("label");//label
  //input (text)
  let editInput = document.createElement("input");//text
  //button.edit-btn
  let editButton = document.createElement("button");//edit button

  //button.delete-btn
  let deleteButton = document.createElement("button");//delete button
  let deleteButtonImg = document.createElement("img");//delete button image

  label.innerText = taskString;
  label.className = "tasks__item_label";

  //Each elements, needs appending
  checkBox.type = "checkbox";
  checkBox.className = "tasks__item_checkbox";
  editInput.type = "text";
  editInput.className = "tasks__item_input";

  editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
  editButton.className = "plain-btn edit-btn";

  deleteButton.className = "delete-btn";
  deleteButtonImg.className = "img"
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.alt = "remove";
  deleteButton.appendChild(deleteButtonImg);

  //and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

const addTask = function() {
  console.log("Add Task...");
  //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  let listItem = createNewTaskElement(taskInput.value);

  //Append listItem to todoTasks
  todoTasks.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
}

//Edit an existing task.
const editTask = function() {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  let listItem = this.parentNode;

  let editInput = listItem.querySelector(".tasks__item_input");
  let label = listItem.querySelector(".tasks__item_label");
  let editBtn = listItem.querySelector(".edit-btn");
  let containsClass = listItem.classList.contains("edit-mode");
  //If class of the parent is .edit-mode
  if(containsClass) {
    //switch to .edit-mode
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  //toggle .edit-mode on the parent.
  listItem.classList.toggle("edit-mode");
};


//Delete task.
const deleteTask = function () {
  console.log("Delete Task...");

  let listItem = this.parentNode;
  let ul = listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);
}

//Mark task completed
const taskCompleted = function() {
  console.log("Complete Task...");

  //Append the task list item to the #completed-tasks
  let listItem = this.parentNode;
  completedTasks.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

const taskIncomplete = function () {
  console.log("Incomplete Task...");
//Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the main__todo.
  let listItem = this.parentNode;
  todoTasks.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
}

const ajaxRequest = function() {
  console.log("AJAX Request");
}

//The glue to hold it all together.

//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);

const bindTaskEvents = function(taskListItem,checkBoxEventHandler) {
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

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.