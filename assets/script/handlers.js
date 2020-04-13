import Task from './task.js';
import {
    setTasksArray,
    snapshotHandler,
    addTaskToTasksArray,
    removeSpecificTask,
    getTasksArray
} from './store.js';
import {
    removeAllTasks,
    addTask,
    clearInputs,
    showDeletePopup,
    removeTaskNode,
    showEditPopup,
    fillEditPopupInputs,
    hideEditPopup,
    updateTask,
    addListsOfTasks, setDay,
    displayLandingPage,
} from './DOM.js'
import { addEventsListenerHandler } from './events.js';


const TODO_TITLE_INPUT = document.querySelector("#todoForm-title-input");
const TODO_PRIORITY_SELECT = document.querySelector("#todoForm-priority-select");
const SEARCH_INPUT = document.querySelector("#search-input");
const SELECT = document.querySelector('.main-content-todolist-select');
const CLOSE_POPUP = document.querySelector("#popup-exit");
const SUBMIT_POPUP = document.querySelector(".edit-submit-update");
const YES_DELETE_POPUP = document.querySelector(".yes");
const NO_DELETE_POPUP = document.querySelector(".no");


function firstTimeHandler(newListName) {
    setTasksArray(newListName);
    addOptiontoSelect(newListName);
    setDay();
    addEventsListenerHandler();
}

function notFirstTimeHandler() {
    addListsOfTasks();
    addTasksHandler(getTasksArray(localStorage.key(0)));
    setDay();
    addEventsListenerHandler();
}


function editPromise(event) {
    return new Promise((resolve) => {
        SUBMIT_POPUP.addEventListener('click', (e) => {
            e.preventDefault();
            resolve(new Task(getEditTitle(), getEditPriority()
                , getIdbyEvent(event)));
        });
        CLOSE_POPUP.addEventListener('click', () => {
            resolve(false);
        });
    });
}

function deletePopUpPromise() {
    return new Promise((resolve) => {
        YES_DELETE_POPUP.addEventListener('click', () => {
            resolve(true);
        });
        NO_DELETE_POPUP.addEventListener('click', () => {
            resolve(false);
        });
    });
}

function addTasksHandler(tasksArray) {
    tasksArray.forEach(task => {
        addTask(task);
    })
}

function sortTasksHandler() {
    const tasksArray = getTasksArray();

    tasksArray.sort(Task.compare);

    setTasksArray(tasksArray, getCurrentKey());

    removeAllTasks();

    addTasksHandler();

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
    return document.querySelector('#popup-title-input').value;
}
function getEditPriority() {
    return document.querySelector('#popup-priority-select').value;
}
function getIdbyEvent(event) {
    return event.target.parentNode.id;
}

function getUlElement() {
    return document.querySelector(".main-content-todolist-list");
}
function getLiNodeList(ul) {
    return ul.querySelectorAll("li");
}
function getFilter() {
    return SEARCH_INPUT.value.toUpperCase();
}
function getSpanFromli(li) {
    return li.getElementsByTagName("span")[0];
}
function getTitleFromForm() {
    return TODO_TITLE_INPUT.value;
}

function getPriorityFromForm() {
    return TODO_PRIORITY_SELECT.value;
}
function getCurrentKey() {
    return SELECT.value;
}

export {
    sortTasksHandler, searchHandler, createTaskHandler,
    deleteTaskHandler, editTaskHandler, firstTimeHandler,
    notFirstTimeHandler
}