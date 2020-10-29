//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".icon");
const todoList = document.querySelector(".todo-list");
const dayOfWeek = document.querySelector(".date-txt h2");
const justDate = document.querySelector(".date-txt h3");

const today = new Date();

dayOfWeek.innerText = today.toLocaleString('default', { weekday: 'long' });
justDate.innerText = today.toLocaleString('en-us', { month: 'short' }) + " " + today.getDate() + " " + today.getFullYear();

//Event Listeners
todoList.addEventListener('click', deleteToDoItem);

todoInput.addEventListener('keypress', function(event){
    if(event.key === "Enter"){
        //This is to prevent refresh
        event.preventDefault();

        //Trigger a click event on the button
        addToDoItem();
    }
});

//Functions
function addToDoItem(event){
    //Create ToDo List Variables
    const todoDiv = document.createElement("div");
    const todoListItem = document.createElement("li");
    const completeButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    //Add Classes
    todoDiv.classList.add("todo");

    todoListItem.classList.add("todo-item");
    todoListItem.innerText = todoInput.value;

    //completeButton.innerText = 'Yo';
    completeButton.classList.add("complete-btn");

    deleteButton.innerHTML = '<i class="fas fa-trash"></>';
    deleteButton.classList.add("delete-btn");

    //Append elements to Div
    todoDiv.appendChild(completeButton);
    todoDiv.appendChild(todoListItem);
    todoDiv.appendChild(deleteButton);

    todoList.appendChild(todoDiv);

    saveToLocalStorage(todoInput.value);

    //Clear value after adding
    todoInput.value = null;
}

function deleteToDoItem(e){
    const item = e.target;

    // Delete/Remove ToDo Item
    if(item.classList[0] === "delete-btn"){
        const todo = item.parentElement;
        todo.classList.add("move");
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }

    //Completed
    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function saveToLocalStorage(todo){
    //Check whether a todo is already in
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}