const todoInput = document.querySelector(".input");
const todoButton = document.querySelector(".btn");
const todoList = document.querySelector(".list");
const todoFilter = document.querySelector(".todos");

document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTask);
todoList.addEventListener("click", deleteTask);
todoFilter.addEventListener("change", filterTodo);

function addTask(e) {
  e.preventDefault();
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("item");
  todoDiv.appendChild(newTodo);

  saveTodos(todoInput.value);

  const completeButton = document.createElement("button");
  completeButton.innerHTML = '<i class="fas fa-check-circle"></li>';
  completeButton.classList.add("complete-btn");
  todoDiv.appendChild(completeButton);

  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></li>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  todoList.appendChild(todoDiv);
  todoInput.value = "";
}

function deleteTask(e) {
  const item = e.target;

  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.classList.add("swipe");
    removeTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("Completed");
  }
}
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "All Tasks":
        todo.style.display = "flex";
        break;
      case "Completed":
        if (todo.classList.contains("Completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}
function saveTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("item");
    todoDiv.appendChild(newTodo);

    const completeButton = document.createElement("button");
    completeButton.innerHTML = '<i class="fas fa-check-circle"></li>';
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></li>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
  });

}

function removeTodos(todo){
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
      } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const index=todo.children[0].innerText;
    todos.splice(todos.indexOf(index),1);
    localStorage.setItem("todos", JSON.stringify(todos));
}
