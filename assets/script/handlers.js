import Task from './task.js';

import {
    addTaskToTasksArray,
    getTasksArray,
    removeSpecificTask,
    setTasksArray,
    snapshotHandler,
} from './storage.js';

import {
    displayLandingPage, hideDeletePopup, showDeletePopup,
    removeTaskNode, showEditPopup, fillEditPopupInputs,
    hideEditPopup, updateTask, addListsOfTasks, setDay,
    removeAllTasks, addTask, clearInputs,
} from './DOM.js'

import { addEventsListenerHandler } from './events.js';


const INPUT_ADD_TEXT = document.querySelector("#todoForm-title-input");
const SELECT_ADD_PRIORITY = document.querySelector("#todoForm-priority-select");
const INPUT_SEARCH_TEXT = document.querySelector("#search-input");
const SELECT_TODOLIST = document.querySelector('.main-content-todolist-select');
const BUTTON_POPUP_CLOSE = document.querySelector("#popup-exit");
const BUTTON_POPUP_SUBMIT = document.querySelector(".edit-submit-update");
const BUTTON_DELETE_YES = document.querySelector(".yes");
const BUTTON_DELETE_NO = document.querySelector(".no");


function firstTimeHandler() {
    setDay();
    addEventsListenerHandler();
    displayLandingPage();
}

function notFirstTimeHandler() {
    setDay();
    addEventsListenerHandler();
    addListsOfTasks();
    addTasksHandler(getTasksArray(localStorage.key(0)));
}


function editPromise(event) {
    return new Promise((resolve) => {
        BUTTON_POPUP_SUBMIT.addEventListener('click', (e) => {
            e.preventDefault();
            resolve(new Task(getEditTitle(), getEditPriority()
                , getIdbyEvent(event)));
        });
        BUTTON_POPUP_CLOSE.addEventListener('click', () => {
            resolve(false);
        });
    });
}

function deletePopUpPromise() {
    return new Promise((resolve) => {
        BUTTON_DELETE_YES.addEventListener('click', () => {
            resolve(true);
        });
        BUTTON_DELETE_NO.addEventListener('click', () => {
            resolve(false);
        });
    });
}

function addTasksHandler(tasksArray) {
    tasksArray.forEach(task => {
        addTask(task);
    })
}

function sortTasksHandler(key) {
    const tasksArray = getTasksArray(key);

    tasksArray.sort(Task.compare);

    setTasksArray(key, tasksArray);

    removeAllTasks();

    addTasksHandler(tasksArray);

    snapshotHandler(getCurrentKey());
}

function createTaskHandler() {
    const newTask = (new Task(getTitleFromForm(), getPriorityFromForm()));
    addTask(newTask);
    addTaskToTasksArray(newTask, getCurrentKey());
    clearInputs();
}


function searchHandler() {
    const filter = getFilter();
    const ul = getUlElement();
    const liNodeList = getLiNodeList(ul)
    let span, i, txtValue;
    for (i = 0; i < liNodeList.length; i++) {
        span = getSpanFromli(liNodeList[i]);
        txtValue = span.textContent || span.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            liNodeList[i].style.display = "";
        } else {
            liNodeList[i].style.display = "none";
        }
    }
}

function deleteTaskHandler(event) {
    showDeletePopup();
    deletePopUpPromise().then(response => {
        if (!response) {
            hideDeletePopup();
        }
        else {
            removeTaskNode(event);
            removeSpecificTask(getIdbyEvent(event), getCurrentKey());
            hideDeletePopup();
        }
    });
}



function editTaskHandler(event) {
    showEditPopup();
    fillEditPopupInputs(event);

    editPromise(event).then(response => {
        if (!response) {
            hideEditPopup();
        }
        else {
            updateTask(response);
            hideEditPopup();
            snapshotHandler(getCurrentKey());
        }
    });
}

function swapHandler(draggableZone, event) {
    const afterElement = getDragAfterElement(draggableZone, event.clientY);
    const draggable = document.querySelector('.dragging');
    if (afterElement == null) {
        draggableZone.appendChild(draggable)
    } else {
        draggableZone.insertBefore(draggable, afterElement)
    }
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        } else {
            return closest
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element
}

function getEditTitle() {
    const VALUE_TEXT_EDIT = document.querySelector('#popup-title-input').value;
    return VALUE_TEXT_EDIT;
}
function getEditPriority() {
    const VALUE_EDIT_PRIORITY = document.querySelector('#popup-priority-select').value;
    return VALUE_EDIT_PRIORITY;
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
    deleteTaskHandler, editTaskHandler, firstTimeHandler,
    notFirstTimeHandler, swapHandler,
    sortTasksHandler, searchHandler, createTaskHandler,
}