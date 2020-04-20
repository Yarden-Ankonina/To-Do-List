import { deleteTaskHandler, editTaskHandler } from './handlers.js'
import { snapshotHandler } from './storage.js'

const POPUP_EDIT = document.querySelector(".edit-popup");
const POPUP_EDIT_TEXT_INPUT = document.querySelector('#edit-text-input');
const POPUP_EDIT_PRIORITY_SELECT = document.querySelector('#edit-select-input');
const POPUP_EDIT_CLOSE = document.querySelector(".popup-exit");
const POPUP_SUBMIT_BUTTON = document.querySelector(".popup-form-submit");
const POPUP_LANDING = document.querySelector('.first-popup');
const POPUP_DELETE = document.querySelector(".delete-popup");
const POPUP_LANDING_TEXT_INPUT = document.querySelector('#first-text-input');
const FORM_NEW_TITLE_INPUT = document.querySelector("#todoForm-title-input");
const FORM_NEW_PRIORITY_SELECT = document.querySelector("#todoForm-priority-select");
const FORM_NEW_TODO = document.querySelector(".main-content-forms-todoForm");
const FORM_SEARCH = document.querySelector(".main-content-forms-searchForm");
const BUTTON_DELETE_YES = document.querySelector(".yes");
const BUTTON_DELETE_NO = document.querySelector(".no");
const MAIN_HEADER_MENU = document.querySelector(".main-header-navbar-menu");
const MAIN_FLEX = document.querySelector(".main-flex");
const SELECT_TODOLIST = document.querySelector('.main-content-todolist-select');
const SELECT_ADD_PRIORITY = document.querySelector("#todoForm-priority-select");
const INPUT_ADD_TEXT = document.querySelector("#todoForm-title-input");
const INPUT_SEARCH_TEXT = document.querySelector("#search-input");

const DATE_PLACEHOLDER = document.querySelector(".main-content-date-placeHolder");
const CURRENT_TODOLIST = document.querySelector(".main-content-todolist-list");
const SELECT_CURRENT_LIST = document.querySelector(".main-content-todolist-select");
const LANDING_FORM = document.querySelector('.popup-first-form');
const SORT_BUTTON = document.querySelector("#navbar-sort-button");
const MENU_BUTTON = document.querySelector(".fa-bars");
const SEARCH_BUTTON = document.querySelector(".fa-search");
const ADD_FORM_BUTTON = document.querySelector(".fa-plus");
const DRAGGABLE_ZONE = document.querySelector('ul');

function addOptiontoSelect(name) {
    const option = createOption(name);
    SELECT_CURRENT_LIST.appendChild(option);
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
    const element = event.target.parentNode;
    element.classList.add("deleted");
    setTimeout(() => {
        element.remove();
    }, 599);
}

function clearInputs() {
    FORM_NEW_TITLE_INPUT.value = "";
    FORM_NEW_PRIORITY_SELECT.value = "1";
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
}

function displayToogle(domElement) {
    if (domElement.style.display != "flex") {
        domElement.style.display = "flex";
    } else {
        domElement.style.display = "none";
    }
}

function blurToggle() {
    if (!MAIN_FLEX.classList.contains('blurBackground')) {
        MAIN_FLEX.classList.add("blurBackground");
    } else {
        MAIN_FLEX.classList.remove("blurBackground");
    }
}
function clickInMainToggle() {
    if (MAIN_FLEX.style.pointerEvents != "none") {
        MAIN_FLEX.style.pointerEvents = "none";
    } else {
        MAIN_FLEX.style.pointerEvents = "auto";
    }
}

function showDeletePopupHandler() {
    displayToogle(POPUP_DELETE);
    blurToggle();
    clickInMainToggle();
}
function hideDeletePopupHandler() {
    displayToogle(POPUP_DELETE);
    blurToggle();
    clickInMainToggle();
}


function fillEditPopupInputs(event) {
    POPUP_EDIT_TEXT_INPUT.value = getTitleFromEvent(event);
    POPUP_EDIT_PRIORITY_SELECT.value = getPriorityFromEvent(event);
    event.target.parentElement.className.slice(-1);
}
function getTitleFromEvent(event) {
    return event.target.previousElementSibling.textContent;
}
function getPriorityFromEvent(event) {
    return event.target.parentElement.className.slice(-1);
}


function addListsOfTasks() {
    for (let i = 0; i < localStorage.length; i++) {
        addOptiontoSelect(localStorage.key(i));
    }
}
function getEditTitle() {
    const POPUP_EDIT_INPUT_VALUE = document.querySelector('#edit-text-input').value;
    return POPUP_EDIT_INPUT_VALUE;
}
function getEditPriority() {
    const POPUP_EDIT_PRIORITY = document.querySelector('#edit-select-input').value;
    return POPUP_EDIT_PRIORITY;
}
function showEditPopUphandler() {
    displayToogle(POPUP_EDIT);
    fillEditPopupInputs(event);
    blurToggle();
    clickInMainToggle();
}
function hideEditPopUphandler() {
    displayToogle(POPUP_EDIT);
    blurToggle();
    clickInMainToggle();
}

function displayNode(node) {
    node.style.display = "";
}
function hideNode(node) {
    node.style.display = "none";
}
function getAllNotDragging(list) {
    return [...list.querySelectorAll('.draggable:not(.dragging)')];
}
function getIdbyEvent(event) {
    return event.target.parentNode.id;
}

function getUlElement() {
    const UL_TODOLIST = document.querySelector(".main-content-todolist-list");
    return UL_TODOLIST;
}

function getLiNodeList(ul) {
    return ul.querySelectorAll("li");
}
function getFilter() {
    return INPUT_SEARCH_TEXT.value.toUpperCase();
}
function getSpanFromli(li) {
    return li.getElementsByTagName("span")[0];
}
function getTitleFromForm() {
    return INPUT_ADD_TEXT.value;
}

function getPriorityFromForm() {
    return SELECT_ADD_PRIORITY.value;
}
function getCurrentKey() {
    return SELECT_TODOLIST.value;
}

export {
    getEditTitle, getEditPriority,
    addListsOfTasks, setDay, addTask,
    getIdbyEvent, getUlElement,
    getLiNodeList, getFilter, getSpanFromli,
    getTitleFromForm, getPriorityFromForm, getCurrentKey,
    displayToogle, hideEditPopUphandler, showEditPopUphandler,
    clearInputs, removeAllTasks,
    removeTaskNode,
    fillEditPopupInputs, updateTask, addOptiontoSelect,
    displayNode, hideNode, getAllNotDragging, showDeletePopupHandler,
    hideDeletePopupHandler
}



export {
    INPUT_ADD_TEXT, SELECT_ADD_PRIORITY,
    SELECT_TODOLIST, SELECT_CURRENT_LIST,
    POPUP_EDIT_CLOSE, POPUP_SUBMIT_BUTTON, BUTTON_DELETE_YES,
    BUTTON_DELETE_NO, POPUP_LANDING, POPUP_EDIT,
    FORM_NEW_TODO, INPUT_SEARCH_TEXT, SORT_BUTTON, MENU_BUTTON,
    MAIN_HEADER_MENU, SEARCH_BUTTON, FORM_SEARCH, ADD_FORM_BUTTON,
    LANDING_FORM, POPUP_LANDING_TEXT_INPUT, DRAGGABLE_ZONE
}
