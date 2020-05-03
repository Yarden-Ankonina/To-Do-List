import { popupFactory } from './factory.js'
import { isStorageEmpty } from './storage.js'
import { liEventsHandler } from './events.js'

const SELECT_CURRENT_LIST = document.querySelector(".main-content-todolist-select");
const INPUT_SEARCH_TEXT = document.querySelector("#search-input");
const MAIN_TODOLIST = document.querySelector(".main-content-todolist-list");


function setDay() {
    const DATE_PLACEHOLDER = document.querySelector(".main-content-date-placeHolder");
    const today = new Date();
    DATE_PLACEHOLDER.innerText = today.toDateString();
}
function renderListsOfKeys() {
    if (isStorageEmpty()) {
        removeAllSelects(); // change
    }
    for (let i = 0; i < localStorage.length; i++) {
        renderOptionToSelect(localStorage.key(i));
    }
}
function removeAllSelects() {
    document.querySelector('.main-content-todolist-select').innerHTML = '';
}

function renderOptionToSelect(name) {
    const option = createOption(name);
    SELECT_CURRENT_LIST.appendChild(option);
}
function renderTask(taskObj) {
    MAIN_TODOLIST.appendChild(createHTMLelement(taskObj));
}
function renderPopup(type) {
    const placeHolder = document.querySelector('.popup-collection');
    placeHolder.appendChild(popupFactory(type));
}
function removePopup() {
    const popup = document.querySelector('.popup');
    popup.remove();
}
function removeTasksNodeList() {
    const tasksArray = [...document.getElementsByClassName("main-content-todolist-list")[0].children,
    ];
    tasksArray.forEach(task => task.remove());
}
function removeTaskNode(event) {

    const element = event.target.parentNode;
    console.log(event.target.parentNode);

    element.classList.add("deleted");
    setTimeout(() => {
        element.remove();
    }, 599);
}
function updateTaskNode(taskObj) {
    const tasksNodeList = document.querySelectorAll("li");
    tasksNodeList.forEach(task => {
        if (task.id == taskObj.id) {
            task.firstElementChild.nextElementSibling.innerText = taskObj.title;
            task.classList.add("draggable", `priority-${taskObj.priority}`);
        }
    });
}
function updateListName(name) {
    const nameList = document.querySelector('.popup-priority-select-option');
    nameList.innerText = name;
}
function updateMain() {
    MAIN_TODOLIST.innerHTML = '';
    SELECT_CURRENT_LIST.innerHTML = '';
}
function clearInputs() {
    const MAIN_FORM_NEW_TITLE_INPUT = document.querySelector("#todoForm-title-input");
    const MAIN_FORM_NEW_PRIORITY_SELECT = document.querySelector("#todoForm-priority-select");
    MAIN_FORM_NEW_TITLE_INPUT.value = "";
    MAIN_FORM_NEW_PRIORITY_SELECT.value = "1";
}
function displayToogle(domElement) {
    if (domElement.style.display != "flex") {
        domElement.style.display = "flex";
    } else {
        domElement.style.display = "none";
    }
}
function blurToggle() {
    const MAIN_FLEX = document.querySelector(".main-flex");
    if (!MAIN_FLEX.classList.contains('blurBackground')) {
        MAIN_FLEX.classList.add("blurBackground");
    } else {
        MAIN_FLEX.classList.remove("blurBackground");
    }
}
function clickInMainToggle() {
    const MAIN_FLEX = document.querySelector(".main-flex");
    if (MAIN_FLEX.style.pointerEvents != "none") {
        MAIN_FLEX.style.pointerEvents = "none";
    } else {
        MAIN_FLEX.style.pointerEvents = "auto";
    }
}
function scrollBarToggle() {
    const BODY = document.querySelector("body");
    if (BODY.style.overflow != "hidden") {
        BODY.style.overflow = "hidden";
    } else {
        BODY.style.overflow = "visible";
    }
}
function selectToggle() {
    const MAIN = document.querySelector('.main-flex');
    if (MAIN.style.userSelect != 'none') {
        MAIN.style.userSelect = 'none';
    } else {
        MAIN.style.userSelect = 'auto';
    }
}


function displayNode(node) {
    node.style.display = "";
}
function hideNode(node) {
    node.style.display = "none";
}
function fillEditPopupInputs(event) {
    const POPUP_TEXT_INPUT = document.querySelector('#form-input');
    const POPUP_SELECT = document.querySelector('#todoForm-priority-select');
    POPUP_TEXT_INPUT.value = getTitleFromEvent(event);
    POPUP_SELECT.value = getPriorityFromEvent(event);
}
function createOption(name) {
    const option = document.createElement('option');
    option.classList.add('popup-priority-select-option');
    option.value = name;
    option.innerText = name;
    return option;
}
function getTitleFromEvent(event) {
    return event.target.previousElementSibling.textContent;
}
function getPriorityFromEvent(event) {
    return event.target.parentElement.className.slice(-1);
}
function getAllNotDragging(list) {
    return [...list.querySelectorAll('.draggable:not(.dragging)')];
}
function getIdByEvent(event) {
    return event.target.parentNode.id;
}
function getUlElement() {
    return MAIN_TODOLIST;
}
function getLiNodeList(ul) {
    return ul.querySelectorAll("li");
}
function getFilter() {
    return INPUT_SEARCH_TEXT.value.toUpperCase();
}
function getSpanFromLi(li) {
    return li.getElementsByTagName("span")[0];
}
function getTitleFromForm() {
    const INPUT_ADD_TEXT = document.querySelector("#todoForm-title-input");
    return INPUT_ADD_TEXT.value;
}

function getPriorityFromForm() {
    const SELECT_ADD_PRIORITY = document.querySelector("#todoForm-priority-select");
    return SELECT_ADD_PRIORITY.value;
}
function getCurrentKey() {
    return SELECT_CURRENT_LIST.value;
}
function getEditTitle() {
    const POPUP_EDIT_INPUT_VALUE = document.querySelector('#form-input').value;
    return POPUP_EDIT_INPUT_VALUE;
}
function getEditPriority() {
    const POPUP_EDIT_PRIORITY = document.querySelector('#todoForm-priority-select').value;
    return POPUP_EDIT_PRIORITY;
}
function getPopUpTextInput() {
    const POPUP_EDIT_INPUT_VALUE = document.querySelector('#form-input').value;
    return POPUP_EDIT_INPUT_VALUE;
}
function fillEditListInput() {
    const input = document.querySelector('.popup-form-input');
    input.value = getCurrentKey();
}

function popupToogle() {
    blurToggle();
    clickInMainToggle();
    scrollBarToggle();
    selectToggle();
}

function createHTMLelement(taskObj) {
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
export {
    clickInMainToggle, fillEditListInput, updateListName,
    getAllNotDragging, getIdByEvent, renderPopup,
    getCurrentKey, displayToogle, clearInputs,
    getEditPriority, getPopUpTextInput, blurToggle,
    getSpanFromLi, getTitleFromForm, getPriorityFromForm,
    getUlElement, getLiNodeList, getFilter,
    removePopup, fillEditPopupInputs, getEditTitle,
    removeTasksNodeList, removeTaskNode, updateTaskNode,
    renderListsOfKeys, setDay, renderTask,
    renderOptionToSelect, displayNode, hideNode,
    updateMain, popupToogle, createHTMLelement

}

export {
    INPUT_SEARCH_TEXT, SELECT_CURRENT_LIST
}

