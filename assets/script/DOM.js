import Task from './task.js';
import { PopupFactory } from './factory.js'

const MAIN_FORM = document.querySelector(".main-content-forms-todoForm");
const FORM_SEARCH = document.querySelector(".main-content-forms-searchForm");
const SELECT_CURRENT_LIST = document.querySelector(".main-content-todolist-select");
const MAIN_HEADER_NAVBAR = document.querySelector(".main-header-navbar-menu");
const INPUT_SEARCH_TEXT = document.querySelector("#search-input");
const SORT_BUTTON = document.querySelector("#navbar-sort-button");
const MENU_BUTTON = document.querySelector(".fa-bars");
const SEARCH_BUTTON = document.querySelector(".fa-search");
const ADD_FORM_BUTTON = document.querySelector(".fa-plus");
const DRAGGABLE_ZONE = document.querySelector('ul');

const EDIT_LIST_BUTTON = document.querySelector('.editList');

function setDay() {
    const DATE_PLACEHOLDER = document.querySelector(".main-content-date-placeHolder");
    const today = new Date();
    DATE_PLACEHOLDER.innerText = today.toDateString();
}
function renderListsOfKeys() {
    for (let i = 0; i < localStorage.length; i++) {
        renderOptionToSelect(localStorage.key(i));
    }
}
function renderOptionToSelect(name) {
    const option = createOption(name);
    SELECT_CURRENT_LIST.appendChild(option);
}
function renderTask(taskObj) {
    const CURRENT_TODOLIST = document.querySelector(".main-content-todolist-list");
    CURRENT_TODOLIST.appendChild(Task.createHTMLelement(taskObj));
}
function renderPopup(type) {
    const placeHolder = document.querySelector('.popup-placeholder');
    placeHolder.appendChild(new PopupFactory().create(type));
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
    const UL_TODOLIST = document.querySelector(".main-content-todolist-list");
    return UL_TODOLIST;
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

export {
    renderListsOfKeys, setDay, renderTask,
    getUlElement, getLiNodeList, getFilter,
    getSpanFromLi, getTitleFromForm, getPriorityFromForm,
    getCurrentKey, displayToogle, clearInputs,
    removeTasksNodeList, removeTaskNode, updateTaskNode,
    renderOptionToSelect, displayNode, hideNode,
    getAllNotDragging, getIdByEvent, renderPopup,
    removePopup, fillEditPopupInputs, getEditTitle,
    getEditPriority, getPopUpTextInput, blurToggle,
    clickInMainToggle, fillEditListInput, updateListName
}

export {
    SELECT_CURRENT_LIST, MAIN_FORM,
    INPUT_SEARCH_TEXT, SORT_BUTTON, MENU_BUTTON,
    MAIN_HEADER_NAVBAR, SEARCH_BUTTON, FORM_SEARCH,
    ADD_FORM_BUTTON, DRAGGABLE_ZONE, EDIT_LIST_BUTTON
}

