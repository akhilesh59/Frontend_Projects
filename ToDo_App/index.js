let todoDataList = document.getElementById("todo-data-list");
let saveButton = document.getElementById("save-todo");
let todoInputBar = document.getElementById("todo-input-bar");
let getPendingTodosButton = document.getElementById("get-todos");
let todos = [];

todoInputBar.addEventListener("keyup", function toggleSaveButton() {
    let todoText = todoInputBar.value;
    if(todoText.length == 0) {
        if(saveButton.classList.contains("disabled")) return;
        saveButton.classList.add("disabled");
    }
    else if(saveButton.classList.contains("disabled")) {
        saveButton.classList.remove("disabled");
    }
});

// This function will fetch the input text and add a todo 
function getTextAndAddTodo() {
    let todoText = todoInputBar.value;
    if(todoText.length == 0) return;
    let todo = {text: todoText, status: 'In progress', finishButtonText: 'Finished'};
    todos.push(todo);
    addTodo(todo, todos.length);
    todoInputBar.value = "";
    if(!saveButton.classList.contains("disabled")) {
        saveButton.classList.add("disabled");
    }
}

saveButton.addEventListener("click", getTextAndAddTodo);

todoInputBar.addEventListener("keyup", function(event) {
    if(event.key === "Enter") {
        getTextAndAddTodo();
    }
});

getPendingTodosButton.addEventListener("click", ()=> {
    todos = todos.filter((element) => element.status != "Finished");
    reRenderTodos();
});

function reRenderTodos() {
    todoDataList.innerHTML = '';
    todos.forEach((element,idx) => {
        addTodo(element, idx+1);
    });
}

function removeTodo(event) {
    console.log("deleting todo", event.target.parentElement.parentElement);
    let deleteButtonPressed = event.target;
    let indexToBeRemoved = Number(deleteButtonPressed.getAttribute('todo-idx'));
    todos.splice(indexToBeRemoved, 1);
    reRenderTodos();
}

function finishTodo(event) {
    console.log("Finishing this todo: ", event.target.parentElement.parentElement);
    let finishButtonPressed = event.target;
    let indexToBeFinished = Number(finishButtonPressed.getAttribute("todo-idx"));

    // Toggle the finish button text:
    if(todos[indexToBeFinished].status == "Finished") {
        todos[indexToBeFinished].status = "In progress";
        todos[indexToBeFinished].finishButtonText = "Finished";
    } else {
        todos[indexToBeFinished].status = "Finished";
        todos[indexToBeFinished].finishButtonText = "Undo";
    }

    todos.sort((a,b)=>{
        if(a.status == "Finished") {
            return 1; // placed in the end of array
        } else {
            return -1; // placed in the beginning of the array
        }
    });

    reRenderTodos();
}

function editTodo(event) {
    let editButtonPressed = event.target;
    let indexToEdit = Number(editButtonPressed.getAttribute("todo-idx"));
    let detailDiv = document.querySelector(`div[todo-idx="${indexToEdit}"]`);
    let input = document.querySelector(`input[todo-idx="${indexToEdit}"]`);

    detailDiv.style.display = "none";
    input.type = "text";
    input.value = detailDiv.textContent;
}

function saveEditedTodo(event) {
    let input = event.target;
    let indexToEdit = Number(input.getAttribute("todo-idx"));
    let detailDiv = document.querySelector(`div[todo-idx="${indexToEdit}"]`);
    
    if(event.keyCode == 13) {
        detailDiv.textContent = input.value;
        detailDiv.style.display="block";
        input.value = '';
        input.type="hidden";
    }
}


function addTodo(todo, todoCount) {
    let rowDiv = document.createElement("div");
    let todoNumber = document.createElement("div");
    let todoItem = document.createElement("div");
    let todoDetail = document.createElement("div");
    let todoStatus = document.createElement("div");
    let todoAction = document.createElement("div");
    let deleteButton = document.createElement("button");
    let finishedButton = document.createElement("button");
    let editButton = document.createElement("button");
    let hiddenInput = document.createElement("input");
    let hr = document.createElement("hr");

    // adding classes:
    rowDiv.classList.add("row");
    todoItem.classList.add("todo-item", "d-flex", "flex-row", "justify-content-between", "align-items-center");
    todoNumber.classList.add("todo-no");
    todoDetail.classList.add("todo-detail", "text-muted");
    todoStatus.classList.add("todo-status", "text-muted");
    todoAction.classList.add("todo-action", "d-flex", "justify-content-start", "gap-2");
    deleteButton.classList.add("btn", "btn-danger", "delete-todo");
    finishedButton.classList.add("btn", "btn-success", "finish-todo");
    editButton.classList.add("btn", "btn-warning", "edit-todo");
    hiddenInput.classList.add("form-control", "todo-detail");

    // setting custom attributes:
    deleteButton.setAttribute("todo-idx", todoCount-1);
    finishedButton.setAttribute("todo-idx", todoCount-1);
    todoDetail.setAttribute("todo-idx", todoCount-1);
    editButton.setAttribute("todo-idx", todoCount-1);
    hiddenInput.setAttribute("todo-idx", todoCount-1);
    hiddenInput.type = "hidden";
    
    // Button onclick actions
    deleteButton.onclick = removeTodo;
    finishedButton.onclick = finishTodo;
    editButton.onclick = editTodo;
    hiddenInput.addEventListener("keypress", saveEditedTodo);

    
    // adding text content:
    todoDetail.textContent = todo.text;
    todoNumber.textContent = `${todoCount}.`;
    todoStatus.textContent = todo.status;
    deleteButton.textContent = "Delete";
    finishedButton.textContent = todo.finishButtonText;
    editButton.textContent = "Edit";

    todoAction.appendChild(deleteButton);
    todoAction.appendChild(finishedButton);
    todoAction.appendChild(editButton);

    todoItem.appendChild(todoNumber);
    todoItem.appendChild(todoDetail);
    todoItem.appendChild(hiddenInput);
    todoItem.appendChild(todoStatus);
    todoItem.appendChild(todoAction);

    rowDiv.appendChild(todoItem);
    rowDiv.appendChild(hr);

    todoDataList.appendChild(rowDiv);
}

































// Reference:
// let getTodosButton = document.getElementById('get-todos');
// getTodosButton.addEventListener("click", () => {console.log("Button Clicked")});