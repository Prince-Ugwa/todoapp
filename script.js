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

// let todoArr = [];

const AppTodo = class {
  #todoArr = [];
  #todoItem;
  constructor() {
    this._getLocalStorage();
    // EVENT LISTENER WITH BIND TO HANDLE THIS.
    addTodo.addEventListener("click", this._newTodo.bind(this));
    todoItems.addEventListener("click", this.clickedTodo.bind(this));
    clearAllTodo.addEventListener("click", this.clearAll.bind(this));
    this._setDate();
  }
  _setDate() {
    // prettier-ignore
    const month = ["Jan.", "Feb", "Mar", "April", "may", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec",];
    // prettier-ignore
    const days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday",];

    const now = new Date();
    todoDayDate.textContent = `${now.getDate()}`;
    todoMonth.textContent = `${month[now.getMonth()]}`;
    todoYear.textContent = `${now.getFullYear()}`;
    todoDay.textContent = `${days[now.getDay()]}`;
  }
  _newTodo(e) {
    e.preventDefault();
    // console.log("clicked");
    this._storeTodo();
    this._renderTodos();
    this._setLocalStorage();
    console.log(this);
    return;
  }

  _storeTodo() {
    this.#todoItem = prompt("Enter your todo");
    if (
      this.#todoItem.trim().length === 0 ||
      this.#todoItem.trim().value === ""
    ) {
      alert("Please enter a valid Todo");
    } else {
      const todo = {
        value: this.#todoItem,
        checked: false,
      };
      this.#todoArr.push(todo);
    }
  }
  _renderTodos() {
    todoItems.innerHTML = ""; //clear todo b4 another input

    //RENDER TODO ELEMENT
    this.#todoArr.forEach((todo, index) => {
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

  _setLocalStorage() {
    localStorage.setItem("todoArr", JSON.stringify(this.#todoArr));
  }
  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem("todoArr"));
    console.log(data);
    if (!data) return;
    this.#todoArr = data;
    this.#todoArr.forEach((todo) => {
      this._renderTodos(todo);
    });
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
    this.#todoArr = this.#todoArr.map((todo, index) => ({
      ...todo,
      checked: index === todoId ? !todo.checked : todo.checked,
    }));
    this.renderTodos();
  }
  removeTodo(todoId) {
    const newArr = this.#todoArr.filter((todo, index) => index !== todoId);
    this.#todoArr = newArr;
    this._renderTodos();
  }
  clearAll(e) {
    e.preventDefault;
    this.#todoArr = [];
    localStorage.removeItem("todoArr");
    this._renderTodos();
  }
};

const app = new AppTodo();
// app._setDate();
