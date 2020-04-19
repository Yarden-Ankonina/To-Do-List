import { deleteTaskHandler, editTaskHandler } from './handlers.js'
import { snapshotHandler } from './storage.js'

const POPUP_EDIT = document.querySelector(".edit-popup");
const POPUP_LANDING = document.querySelector('.first-popup');
const POPUP_EDIT_TEXT_INPUT = document.querySelector('#edit-text-input');
const POPUP_EDIT_PRIORITY_SELECT = document.querySelector('#edit-select-input');
const POPUP_DELETE = document.querySelector(".delete-popup");
const DATE_PLACEHOLDER = document.querySelector(".main-content-date-placeHolder");
const CURRENT_TODOLIST = document.querySelector(".main-content-todolist-list");
const FORM_NEW_TITLE_INPUT = document.querySelector("#todoForm-title-input");
const FORM_NEW_PRIORITY_SELECT = document.querySelector("#todoForm-priority-select");
const ADD_FORM = document.querySelector(".main-content-forms-todoForm");
const MAIN_FLEX = document.querySelector(".main-flex");
const MAIN_HEADER_MENU = document.querySelector(".main-header-navbar-menu");
const INPUT_SEARCH = document.querySelector(".main-content-forms-searchForm");
const SELECT_CURRENT_LIST = document.querySelector(".main-content-todolist-select");
const SELECT = document.querySelector('.main-content-todolist-select');
const LANDING_FORM = document.querySelector('.landing-page-form');
const INPUT_ADD_TEXT = document.querySelector("#todoForm-title-input");
const SELECT_ADD_PRIORITY = document.querySelector("#todoForm-priority-select");
const INPUT_SEARCH_TEXT = document.querySelector("#search-input");
const SELECT_TODOLIST = document.querySelector('.main-content-todolist-select');
const POPUP_EDIT_CLOSE = document.querySelector(".popup-exit");
const POPUP_SUBMIT_BUTTON = document.querySelector(".popup-form-submit");
const BUTTON_DELETE_YES = document.querySelector(".yes");
const BUTTON_DELETE_NO = document.querySelector(".no");

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
    const title = event.target.nextElementSibling.textContent;
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

function displayLandingPopUP() {
    POPUP_LANDING.style.display = 'flex';
}
function hideLandingPopUp() {
    POPUP_LANDING.style.display = 'none';
}
function displayLandingPopUPForm() {
    LANDING_FORM.style.visibility = 'visible';
}

function displayEditPopup() {
    POPUP_EDIT.style.display = "flex";

}
function hideEditPopup() {
    POPUP_EDIT.style.display = "none";
}
function blurMain() {
    MAIN_FLEX.classList.add("blurBackground");
}
function deblurMain() {
    MAIN_FLEX.classList.remove("blurBackground");
}
function disableClickInMain() {
    MAIN_FLEX.style.pointerEvents = "none";
}
function enableClickInMain() {
    MAIN_FLEX.style.pointerEvents = "auto";
}

function showDeletePopup() {
    POPUP_DELETE.style.display = "flex";
}
function hideDeletePopup() {
    POPUP_DELETE.style.display = "none";
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

function toogleMainHeaderDisplay() {
    if (MAIN_HEADER_MENU.style.display != "flex") {
        MAIN_HEADER_MENU.style.display = "flex";
    } else {
        MAIN_HEADER_MENU.style.display = "none";
    }
}

function toogleSearchBarDisplay() {
    if (INPUT_SEARCH.style.display === "none") {
        INPUT_SEARCH.style.display = "flex";
    } else INPUT_SEARCH.style.display = "none";
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
function getEditTitle() {
    const POPUP_EDIT_INPUT_VALUE = document.querySelector('#edit-text-input').value;
    return POPUP_EDIT_INPUT_VALUE;
}
function getEditPriority() {
    const POPUP_EDIT_PRIORITY = document.querySelector('#edit-select-input').value;
    return POPUP_EDIT_PRIORITY;
}
function showPopUphandler() {
    blurMain();
    disableClickInMain();
}
function hidePopUphandler() {
    deblurMain();
    enableClickInMain();
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
    addListsOfTasks, setDay, addTask, toogleMainHeaderDisplay, getIdbyEvent, getUlElement, getLiNodeList, getFilter, getSpanFromli, getTitleFromForm,
    getPriorityFromForm, getCurrentKey,
    clearInputs, removeAllTasks, toogleSearchBarDisplay, toogleAddForm,
    showDeletePopup, hideDeletePopup, removeTaskNode, displayEditPopup,
    fillEditPopupInputs, hideEditPopup, updateTask, displayLandingPopUP, addOptiontoSelect,
    displayLandingPopUPForm, hideLandingPopUp, blurMain, deblurMain, enableClickInMain, disableClickInMain
    , getEditTitle, getEditPriority, showPopUphandler, hidePopUphandler, displayNode, hideNode, getAllNotDragging
}



export {
    INPUT_ADD_TEXT, SELECT_ADD_PRIORITY, INPUT_SEARCH_TEXT, SELECT_TODOLIST, POPUP_EDIT_CLOSE,
    POPUP_SUBMIT_BUTTON, BUTTON_DELETE_YES, BUTTON_DELETE_NO
}
