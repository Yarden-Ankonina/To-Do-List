
import { deleteTaskHandler, editTaskHandler } from './handlers.js'
import { snapshotHandler } from './store.js'

const DATE_PLACEHOLDER = document.querySelector(".main-content-date-placeHolder");
const CURRENT_TODOLIST = document.querySelector(".main-content-todolist-list");
const TITLE_INPUT = document.querySelector("#todoForm-title-input");
const PRIORITY_SELECT = document.querySelector("#todoForm-priority-select");
const LANDING_PAGE = document.querySelector('.landing-page');
const EDIT_POPUP = document.querySelector(".edit-popup");
const MAIN_FLEX = document.querySelector(".main-flex");
const ADD_FORM = document.querySelector(".main-content-forms-todoForm");
const DELETE_POPUP = document.querySelector(".delete-popup");
const MAIN_HEADER_MENU = document.querySelector(".main-header-navbar-menu");
const SEARCH_BAR = document.querySelector(".main-content-forms-searchForm");
const SELECT_TITLE = document.querySelector(".main-content-todolist-select");
const SELECT = document.querySelector('.main-content-todolist-select');


function addOptiontoSelect(name) {
    const option = createOption(name);
    SELECT_TITLE.appendChild(option);
}
function createOption(name) {
    const option = document.createElement('option');
    option.classList.add('popup-priority-select-option');
    option.value = name;
    option.innerText = name;
    return option;
}

function setDay() {
    const today = new Date();
    DATE_PLACEHOLDER.innerText = today.toDateString();
}
function createTask(taskObj) {
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

    liEventsHandler(li);

    return li;
}
function liEventsHandler(li) {
    li.addEventListener("dragstart", () => {
        li.classList.add("dragging");
    });
    li.addEventListener("dragend", () => {
        li.classList.remove("dragging");
        snapshotHandler(SELECT.value);
    });

    li.firstElementChild.addEventListener("click", (event) => {
        event.preventDefault();
        deleteTaskHandler(event);
    });

    li.lastElementChild.addEventListener("click", (event) => {
        editTaskHandler(event);
    });
}

function addTask(taskObj) {
    CURRENT_TODOLIST.appendChild(createTask(taskObj));
}

function removeTaskNode(event) {
    const title = event.target.nextElementSibling.textContent;
    const element = event.target.parentNode;

    element.classList.add("deleted");

    setTimeout(() => {
        element.remove();
    }, 599);
}

function clearInputs() {
    TITLE_INPUT.value = "";
    PRIORITY_SELECT.value = "1";
}

function removeAllTasks() {
    const tasksArray = [...document.getElementsByClassName("main-content-todolist-list")[0].children,
    ];
    tasksArray.forEach(task => task.remove());
}

function updateTask(taskObj) {
    const tasksNodeList = document.querySelectorAll("li");
    tasksNodeList.forEach(task => {
        if (task.id == taskObj.id) {
            task.firstElementChild.nextElementSibling.innerText = taskObj.title;
            task.classList.add("draggable", `priority-${taskObj.priority}`);
        }
    });
    snapshotHandler();
}

function displayLandingPage() {
    LANDING_PAGE.style.display = 'flex';
}
function hideLandingPage() {
    LANDING_PAGE.style.display = 'hiden';
}

function showEditPopup() {
    EDIT_POPUP.style.visibility = "visible";
    MAIN_FLEX.classList.add("blurBackground");
    MAIN_FLEX.style.pointerEvents = "none";
}
function hideEditPopup() {
    EDIT_POPUP.style.visibility = "hidden";
    MAIN_FLEX.classList.remove("blurBackground");
    MAIN_FLEX.style.pointerEvents = "auto";

}
function showDeletePopup() {
    DELETE_POPUP.style.visibility = "visible";
    MAIN_FLEX.classList.add("blurBackground");
    MAIN_FLEX.style.pointerEvents = "none";

}
function hideDeletePopup() {
    DELETE_POPUP.style.visibility = "hidden";
    MAIN_FLEX.classList.remove("blurBackground");
    MAIN_FLEX.style.pointerEvents = "auto";
}
function fillEditPopupInputs(event) {
    document.querySelector('#popup-title-input').value =
        event.target.previousElementSibling.textContent;
    document.querySelector('#popup-priority-select').value =
        event.target.parentElement.className.slice(-1);
}

function toogleMainHeaderDisplay() {
    if (MAIN_HEADER_MENU.style.display != "flex") {
        MAIN_HEADER_MENU.style.display = "flex";
    } else {
        MAIN_HEADER_MENU.style.display = "none";
    }
}
function toogleSearchBarDisplay() {
    if (SEARCH_BAR.style.display === "none") {
        SEARCH_BAR.style.display = "flex";
    } else SEARCH_BAR.style.display = "none";
}

function toogleAddForm() {
    if (ADD_FORM.style.display === "none") {
        ADD_FORM.style.display = "flex";
    } else ADD_FORM.style.display = "none";
}

function addListsOfTasks() {
    for (let i = 0; i < localStorage.length; i++) {
        addOptiontoSelect(localStorage.key(i));
    }
}

export {
    addListsOfTasks, setDay, addTask, toogleMainHeaderDisplay,
    clearInputs, removeAllTasks, toogleSearchBarDisplay, toogleAddForm,
    showDeletePopup, hideDeletePopup, removeTaskNode, showEditPopup,
    fillEditPopupInputs, hideEditPopup, updateTask, displayLandingPage, addOptiontoSelect
}
