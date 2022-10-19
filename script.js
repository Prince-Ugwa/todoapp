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

let todoArr = [];
const AppTodo = class {
  constructor() {
    // EVENT LISTENER WITH BIND TO HANDLE THIS.
    addTodo.addEventListener("click", this.submitTodo.bind(this));
    todoItems.addEventListener("click", this.clickedTodo.bind(this));
    this.#setDate();
  }
  #setDate() {
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
    this._storeTodo();
    this.renderTodos();
  }

  _storeTodo() {
    // const todoVal = newTodoInput.value;

    const todoVal = prompt("Enter your todo");

    // CHECK IF TODO IS EMPTY
    const emptyTodo = todoVal === "";

    ////
    if (emptyTodo) {
      alert("Please enter a valid Todo");
    } else {
      const todo = {
        value: todoVal,
        checked: false,
      };
      todoArr.push(todo);
      // console.log(todoArr);
    }
  }
  renderTodos() {
    // CLEAR TODO BEFORE A ANOTHER INPUT
    todoItems.innerHTML = "";

    //RENDER TODO ELEMENT
    todoArr.forEach((todo, index) => {
      todoItems.innerHTML += `
      <div class="todo-list" id= ${index}>   
                <i class="fa-regular ${
                  todo.checked ? "fa-circle-check" : "fa-circle"
                }" data-clicked="check"
                ></i>
                <p class="todo-text" data-clicked="check"> ${todo.value}</p>
                <i class="fa-solid fa-trash-can delete-todo" data-clicked="remove"></i>
              </div>  
      `;
    });
  }
  // HANDLE EVENT ON TODO ELEMENT
  clickedTodo(e) {
    const target = e.target;
    const parentEl = target.parentNode;
    if (parentEl.className !== "todo-list") return;

    //////todolist id
    const todoListId = +parentEl.id;
    ///////todo-list buttonclicked
    const clickEl = target.dataset.clicked;
    // console.log(todoListId, clickEl);
    clickEl === "clicked" && crossTodo(todoListId);
  }
  crossTodo(todoListId) {
    let todoArr = todoArr.map((todo, index) => ({
      ...todo,
      checked: index === todoListId ? !todo.checked : todo.checked,
    }));
    this.renderTodos();
  }
};

const testApp = new AppTodo();
