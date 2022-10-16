// SELECT ELEMENT
"use strict";

const addTodo = document.querySelector(".add-todo-btn");
const newTodoInput = document.querySelector("#todo-input");
const deleteTodo = document.querySelector(".delete-todo");
const clearAllTodo = document.querySelector(".clear-all-todo");
const todoItems = document.querySelector(".todo-items");
const todoDayDate = document.querySelector(".todo-day-date");
const todoMonth = document.querySelector(".todo-month");
const todoYear = document.querySelector(".todo-year");
const todoDay = document.querySelector(".todo-day");
const form = document.querySelector("#todo-form");

let todoArr = [];

const AppTodo = class {
  constructor() {
    // EVENT LISTENER WITH BIND TO HANDLE THIS.
    addTodo.addEventListener("click", this.submitTodo.bind(this));
    todoItems.addEventListener("click", this.clickedTodo.bind(this));
    this.setDate();
  }
  setDate() {
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
  submitTodo(e) {
    e.preventDefault();
    // console.log("clicked");
    this.storeTodo();
    this.renderTodos();
  }
  // HANDLE EVENT ON TODO ELEMENT
  clickedTodo(e) {
    const target = e.target;
    const parentEl = target.parentNode;
    console.log(parentEl);
  }
  storeTodo() {
    const todoVal = newTodoInput.value;

    // CHECK IF TODO IS EMPTY
    const todovalIsEmpty = todoVal === "";

    ////
    if (todovalIsEmpty) {
      alert("Please enter Todo");
    } else {
      const todo = {
        value: todoVal,
        checked: false,
      };
      todoArr.push(todo);
      newTodoInput.value = "";
      // console.log(todoArr);
    }
  }
  renderTodos() {
    // CLEAR TODO BEFORE A ANOTHER INPUT
    todoItems.innerHTML = "";

    //RENDER TODO ELEMENT
    todoArr.forEach((todo, index) => {
      todoItems.innerHTML += `
      <div class="todo-check-text" id= ${index}>
                 
                <i class="fa-solid ${
                  todo.checked ? "fa-circle-check" : "fa-circle"
                }"
                ></i>
                <p class="todo-text"> ${todo.value}</p>
              </div>
              <div class="delete-todo">
                <i class="fa-solid fa-trash-can"></i>
              </div>
      `;
    });
  }
};

const testApp = new AppTodo();
