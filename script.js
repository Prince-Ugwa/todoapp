// SELECT ELEMENT
"use strict";

const addTodo = document.querySelector(".add-todo-btn");
const deleteTodo = document.querySelector(".delete-todo");
const clearAllTodo = document.querySelector(".clear-all-todo");
const todoItems = document.querySelector(".todo-items");
const todoDayDate = document.querySelector(".todo-day-date");
const todoMonth = document.querySelector(".todo-month");
const todoYear = document.querySelector(".todo-year");
const todoDay = document.querySelector(".todo-day");
const todoList = document.querySelectorAll(".todo-list");

let todoArr = [];

const AppTodo = class {
  constructor() {
    // EVENT LISTENER WITH BIND TO HANDLE THIS.
    addTodo.addEventListener("click", this.newTodo.bind(this));
    todoItems.addEventListener("click", this.clickedTodo.bind(this));
    clearAllTodo.addEventListener("click", this.clearAll.bind(this));
    this._setDate();
  }
  _setDate() {
    const month = [
      "Jan.",
      "Feb",
      "Mar",
      "April",
      "may",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const now = new Date();
    todoDayDate.textContent = `${now.getDate()}`;
    todoMonth.textContent = `${month[now.getMonth()]}`;
    todoYear.textContent = `${now.getFullYear()}`;
    todoDay.textContent = `${days[now.getDay()]}`;
  }
  newTodo(e) {
    e.preventDefault();
    // console.log("clicked");
    this._storeTodo();
    this.renderTodos();
    this._setLocalStorage(todoArr);
    todoItems.classList.remove("remove-todo");
    return;
  }

  _storeTodo() {
    // const todoItem = newTodoInput.value;
    const todoItem = prompt("Enter your todo");
    if (todoItem.length === 0) {
      alert("Please enter a valid Todo");
    } else {
      const todo = {
        value: todoItem,
        checked: false,
      };
      todoArr.push(todo);
      // console.log(todoArr);
    }
  }
  renderTodos() {
    todoItems.innerHTML = ""; //clear todo b4 another input

    //RENDER TODO ELEMENT
    todoArr.forEach((todo, index) => {
      todoItems.innerHTML += `
      <div class="todo-list" id= ${index}>  
        <i class="bi ${
          todo.checked ? "bi-check-circle-fill" : "bi-circle"
        }" data-action="check"></i>
        <p class=" ${
          todo.checked ? "todo-checked" : ""
        }" data-action="check"> ${todo.value}</p>
        <i class="bi bi-trash-fill" data-action="remove"></i>
     </div>  
     `;
    });
  }

  _setLocalStorage(arr) {
    localStorage.setItem("todoArr", JSON.stringify(arr));
  }
  getLocalStorage() {
    const todos = JSON.parse(localStorage.getItem(todoArr));
  }
  // HANDLE EVENT ON TODO ELEMENT
  clickedTodo(e) {
    const target = e.target;
    // console.log(target);
    const parentEl = target.parentElement;

    ///guard clause
    if (parentEl.className !== "todo-list") return;

    const todoId = +parentEl.id;
    const action = target.dataset.action;
    action === "check" && this.checkTodo(todoId);
    action === "remove" && this.removeTodo(todoId);
  }
  checkTodo(todoId) {
    todoArr = todoArr.map((todo, index) => ({
      ...todo,
      checked: index === todoId ? !todo.checked : todo.checked,
    }));
    this.renderTodos();
    localStorage.setItem("todoArr", JSON.stringify(todoArr));
  }
  removeTodo(todoId) {
    const newArr = todoArr.filter((todo, index) => index !== todoId);
    todoArr = newArr;
    this.renderTodos();
    localStorage.setItem("todoArr", JSON.stringify(todoArr));
  }
  clearAll(e) {
    e.preventDefault;
    todoArr = [];
    this.renderTodos();
  }
};

const app = new AppTodo();
// app._setDate();
