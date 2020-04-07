/*
CSS => design for priorities classes 1,2,3
*/

const ADD_FORM_BUTTON = document.querySelector(".fa-plus");
let MAIN_HEADER_MENU = document.querySelector(".main-header-menu");
let SEARCH_BAR = document.querySelector(".main-content-forms-searchForm");
let ADD_FORM = document.querySelector(".main-content-forms-todoForm");
let MAIN_FLEX = document.querySelector(".main-flex");
let EDIT_POPUP = document.querySelector(".edit");

class Task {
  constructor(title, priority, id = Date.parse(new Date())) {
    this.title = title;
    this.priority = priority;
    this.id = id;
  }
  static compare(a, b) {
    if (a.priority === b.priority) {
      return 0;
    } else {
      return a.priority > b.priority ? 1 : -1;
    }
  }
}

class UI {
  static setDay() {
    const placeHolder = document.querySelector(
      ".main-content-date-placeHolder"
    );
    const today = new Date();
    placeHolder.innerHTML = today.toDateString();
  }
  static addTask(taskObj) {
    /*
<div class="main-content-todolist">
<h2 class="main-content-todolist-title">My Todo's</h2>
<ul class="main-content-todolist-list">
<li class="main-content-todolist-list-item draggable priority-1" draggable="true" id="1586098611000">
 <i class="fas fa-trash-alt todo-icon" aria-hidden="true"></i>
<span class="main-content-todolist-list-item-title>Title</span>
 <i class="far fa-edit todo-icon" aria-hidden="true"></i></li>
</ul>
</div>
*/
    const ul = document.querySelector(".main-content-todolist-list");

    const li = document.createElement("li");
    li.classList.add("main-content-todolist-list-item");
    li.classList.add("draggable");
    li.classList.add(`priority-${taskObj.priority}`);
    li.setAttribute("draggable", "true");

    li.id = `${taskObj.id}`;
    li.innerHTML = `
    <i class="fas fa-trash-alt todo-icon" aria-hidden="true"></i>
    <span class="main-content-todolist-list-item-title">${taskObj.title}</span>
    <i class="far fa-edit todo-icon" aria-hidden="true"></i>`;

    li.addEventListener("dragstart", () => {
      li.classList.add("dragging");
    });
    li.addEventListener("dragend", () => {
      li.classList.remove("dragging");
      Store.setCurrentTasks();
    });

    li.firstElementChild.addEventListener("click", (event) => {
      event.preventDefault();
      if (addDeleteWindow()) {
        UI.removeTask(event);
      }
    });

    li.lastElementChild.addEventListener("click", (event) => {
      event.preventDefault();
      addEditPopUp();
    });

    ul.appendChild(li);
  }

  static removeTask(event) {
    const title = event.target.nextElementSibling.textContent;
    const element = event.target.parentNode;

    element.classList.add("deleted");
    setTimeout(function () {
      Store.removeTaskFromArray(title);
      element.remove();
    }, 599);
  }

  static clearInputs() {
    document.querySelector("#todoForm-title-input").value = "";
    document.querySelector("#todoForm-priority-select").value = "1";
  }

  static removeAllTasks() {
    const elements = [
      ...document.getElementsByClassName("todo-list")[0].children,
    ];
    for (let i = 1; i < elements.length; i++) {
      elements[i].remove();
    }
  }

  static updateTask(id, newTitle, newPriority) {
    const tasksArray = document.querySelectorAll("li");
    tasksArray.forEach((task) => {
      if (task.id === id) {
        task.firstElementChild.nextElementSibling.innerHTML = newTitle;
        task.classList.add("draggable", `priority-${newPriority}`);
      }
    });
    Store.setCurrentTasks();
  }
}

class Store {
  static getTasksArray() {
    let tasksArray = Store.isEmpty()
      ? []
      : JSON.parse(localStorage.getItem("tasks"));
    return tasksArray;
  }
  static isEmpty() {
    return localStorage.getItem("tasks") === "[]";
  }

  static addTaskToArray(task) {
    const tasksArray = Store.getTasksArray();
    tasksArray.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
  }

  static removeTaskFromArray(title) {
    const tasksArray = Store.getTasksArray();

    tasksArray.forEach((task, index) => {
      if (task.title === title) {
        tasksArray.splice(index, 1);
      }
    });

    localStorage.setItem("tasks", JSON.stringify(tasksArray));
  }

  static setCurrentTasks() {
    const tasks = document.querySelectorAll("li");

    let newTaskArray = [];

    tasks.forEach((task) => {
      const title = task.querySelector("a").innerHTML;
      const id = task.id;
      const priority = task.classList.value.slice(-1);
      newTaskArray.push({ title: title, priority: priority, id: id });

      Store.setTasksArray(newTaskArray);
    });
  }

  static setTasksArray(tasksArray) {
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
  }
}

function addTasksHandler() {
  const tasksArray = Store.getTasksArray();
  tasksArray.forEach((task) => UI.addTask(task));
}

function sortTasksHandler() {
  const tasksArray = Store.getTasksArray();

  tasksArray.sort(Task.compare);

  Store.setTasksArray(tasksArray);

  UI.removeAllTasks();
  addTasksHandler();

  Store.setCurrentTasks();
}

function createTaskHandler() {
  const title = document.querySelector("#todoForm-title-input").value;
  const priority = document.querySelector("#todoForm-priority-select").value;
  const task = new Task(title, priority);

  UI.addTask(task);

  Store.addTaskToArray(task);
  UI.clearInputs();
}

function editTaskHandler() {
  const newTitle = document.querySelector("#title-update").value;
  const newPriority = document.querySelector("#priority-edit").value;
  const id = event.target.getAttribute("currentid");
  UI.updateTask(id, newTitle, newPriority);
}

function searchHandler() {
  let input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("search-input");
  filter = input.value.toUpperCase();
  ul = document.querySelector(".main-content-todolist-list");
  li = ul.getElementsByTagName("li");
  for (i = 0; i < li.length; i++) {
    span = li[i].getElementsByTagName("span")[0];
    txtValue = span.textContent || span.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

function emptyStoreHandler() {
  document.querySelector(".addTodoAdd").addEventListener("click", function () {
    document.querySelector(".addTodoAdd").style.display = "none";
    ADD_FORM.style.display = "flex";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  addTasksHandler();
  UI.setDay();
  draggableHandler();
});

document
  .querySelector(".main-content-forms-todoForm")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    createTaskHandler(event);
  });

document.querySelector("#sort-button").addEventListener("click", (event) => {
  event.preventDefault();
  sortTasksHandler();
});

document.querySelector(".edit-form").addEventListener("submit", (event) => {
  event.preventDefault();
  editTaskHandler();
});

//exit save button
document
  .querySelector(".edit-submit-update")
  .addEventListener("click", function () {
    EDIT_POPUP.style.visibility = "hidden";
    MAIN_FLEX.classList.remove("blurBackground");
  });

//exit edit window
document.querySelector(".exit-editForm").addEventListener("click", function () {
  EDIT_POPUP.style.visibility = "hidden";
  MAIN_FLEX.classList.remove("blurBackground");
});

//bar menu
document.querySelector(".fa-bars").addEventListener("click", function () {
  if (MAIN_HEADER_MENU.style.display === "none") {
    MAIN_HEADER_MENU.style.display = "flex";
  } else {
    MAIN_HEADER_MENU.style.display = "none";
  }
});

//add a search bar
document.querySelector(".fa-search").addEventListener("click", function () {
  if (SEARCH_BAR.style.display === "none") {
    SEARCH_BAR.style.display = "flex";
  } else SEARCH_BAR.style.display = "none";
});

ADD_FORM_BUTTON.addEventListener("click", function () {
  if (ADD_FORM.style.display === "none") {
    ADD_FORM.style.display = "flex";
  } else ADD_FORM.style.display = "none";
});

function addDeleteWindow() {
  return confirm("ARE YOU SURE YOU WANT TO DELETE THIS TODO?");
}

function addEditPopUp() {
  EDIT_POPUP.style.visibility = "visible";
  MAIN_FLEX.classList.add("blurBackground");

  const title = event.target.previousElementSibling.textContent;
  const priority = event.target.parentElement.classList.value.slice(-1);
  const id = event.target.parentElement.id;
  document.querySelector("#title-update").value = title;
  document.querySelector("#priority-edit").value = priority;
  document.querySelector(".edit-form").setAttribute("currentId", id);
}
