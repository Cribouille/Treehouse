//Problem: User interaction doesn't provide desired result.
//Solution: Add interactivity so user can manage daily tasks.
var taskInput = document.getElementById("new-task");//new-task
var addButton = document.getElementsByTagName("button")[0];//first button
var incompleteTasksHolder = document.getElementById("incomplete-tasks");//ul #incomplete-tasks
var completeTasksHolder = document.getElementById("completed-tasks"); //ul #complete-tasks

//New task list Item

function createNewTaskElement (taskString) {
   //Create listItem
  var listItem = document.createElement("li");
  //input {checkbox}
  var checkBox = document.createElement("input"); //checkbox
    //label
  var label = document.createElement("label");
    //input {text}
  var editInput = document.createElement("input");//text
    //button.edit
  var editButton = document.createElement("button");
    //button.delete
  var deleteButton = document.createElement("button");
    //each elements need to be modified
  checkBox.type = "checkbox";
  editInput.type = "text";
  
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  
  label.innerText = taskString;
    //each elements need to appended
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  
  return listItem
}


//Add a new task
function addTask() {
  console.log("Add Task...");

  //Create a new list item with the text from new-task:
  var listItem = createNewTaskElement(taskInput.value);
  //append listItem in the incompleteTaskHolder
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
  taskInput.value = "";
}
//Edit a existing part
function editTask() {
  console.log("Edit Task...");
  var listItem = this.parentNode;
  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");
  
  var containsClass = listItem.classList.contains("editMode");
  //If the class of the parent is .editMode
  if (containsClass) {
    //switch form edit mode
    
    //label text become the imput's value
    label.innerText = editInput.value;
  } else {
  //else
    //Swith to .editMode
    //input value becomes the label's text
    editInput.value = label.innerText;
  }
  //Toggle .editMode on the listItem
  listItem.classList.toggle("editMode");
}
//Delete an existing task
function deleteTask() {
  console.log("Delete Task...");
  //remove the parent list item from the ul
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
}
//Mark task are complete
function taskCompleted() {
  console.log("Task Complete...");
    //Append the task list item to #completed-tasks
  var listItem = this.parentNode;
  completeTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskIncomplete);
}
//Mark task are incomplete
function taskIncomplete() {
  console.log("Task Incomplete...");
    //Append the task list item to #incompleted-tasks
   var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
}


function bindTaskEvents(taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");
    //select taskListItem 's children
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");
    //bind editTask to edit button
  editButton.onclick = editTask;
    //bind deleteTask to delete button
  deleteButton.onclick = deleteTask;
    //bind checkBoxEventHandler to checkbox
  checkBox.onchange = checkBoxEventHandler;
}

var ajaxRequest = function() {
  console.log("AJAX request"); 
}
//set the click handler to the addTask function

addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

//Cycle over incompleteTaskholder ul list items
for ( var i = 0; i < incompleteTasksHolder.children.length; i++) {
  
  
    //bind events to list item's children {taskCompleted}
   bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}
//Cycle over completeTaskholder ul list items
  for ( var i = 0; i < completeTasksHolder.children.length; i++) {
  
  
    //bind events to list item's children {taskIncompleted}
   bindTaskEvents(completeTasksHolder.children[i], taskIncomplete);
}





