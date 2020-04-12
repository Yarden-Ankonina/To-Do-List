export default 'navbar';

import Task from './task.js'
import UI from './ui.js'
import Store from './store.js'
import {initNav} from "./init_nav.js";


import { addTasksHandler } from './todolist.js';

const ADD_FORM_BUTTON = document.querySelector(".fa-plus");
const MAIN_HEADER_MENU = document.querySelector(".main-header-navbar-menu");
const SEARCH_BAR = document.querySelector(".main-content-forms-searchForm");
const ADD_FORM = document.querySelector(".main-content-forms-todoForm");

initNav();
document.querySelector('#search-input').addEventListener('click',
    () => {
        searchHandler();
    }
)

document
    .querySelector(".main-content-forms-todoForm")
    .addEventListener("submit", (event) => {
        event.preventDefault();
        createTaskHandler(event);
    });

document.querySelector("#navbar-sort-button").addEventListener("click", (event) => {
    event.preventDefault();
    sortTasksHandler();
});

document.querySelector(".fa-bars").addEventListener("click", function () {
    if (MAIN_HEADER_MENU.style.display === "none") {
        MAIN_HEADER_MENU.style.display = "flex";
    } else {
        MAIN_HEADER_MENU.style.display = "none";
    }
});

document.querySelector(".fa-search").addEventListener("click", function () {
    if (SEARCH_BAR.style.display === "none") {
        SEARCH_BAR.style.display = "flex";
    } else SEARCH_BAR.style.display = "none";
});

ADD_FORM_BUTTON.addEventListener("click", function (event) {
    event.preventDefault();
    if (ADD_FORM.style.display === "none") {
        ADD_FORM.style.display = "flex";
    } else ADD_FORM.style.display = "none";
});

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


function searchHandler() {
    let input = document.querySelector("#search-input");
    let filter = input.value.toUpperCase();
    let ul = document.querySelector(".main-content-todolist-list");
    let li = ul.querySelectorAll("li");
    let span, i, txtValue;

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

