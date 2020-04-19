import Task from './task.js';

import {
    addTaskToTasksArray,
    getTasksArray,
    removeSpecificTask,
    setTasksArray,
    snapshotHandler,
} from './storage.js';

import {
    displayLandingPopUP, hideDeletePopup, showDeletePopup,
    removeTaskNode, displayEditPopup, fillEditPopupInputs,
    updateTask, addListsOfTasks,
    removeAllTasks, clearInputs,
    getEditTitle, getEditPriority,
    showPopUphandler, hidePopUphandler, getAllNotDragging,
    displayNode, hideNode, hideEditPopup, setDay,
    addTask, getIdbyEvent, getUlElement, getLiNodeList, getFilter,
    getSpanFromli, getTitleFromForm,
    getPriorityFromForm, getCurrentKey,
} from './DOM.js'

import {
    POPUP_EDIT_CLOSE,
    POPUP_SUBMIT_BUTTON, BUTTON_DELETE_YES, BUTTON_DELETE_NO
} from './DOM.js'
import { addEventsListenerHandler } from './events.js';

function firstTimeHandler() {
    setDay();
    addEventsListenerHandler();
    displayLandingPopUP();
}

function notFirstTimeHandler() {
    setDay();
    addEventsListenerHandler();
    addListsOfTasks();
    addTasksHandler(getTasksArray(localStorage.key(0)));
}

function editPromise(event) {
    return new Promise((resolve) => {
        POPUP_SUBMIT_BUTTON.addEventListener('click', (e) => {
            e.preventDefault();
            resolve(new Task(getEditTitle(), getEditPriority()
                , getIdbyEvent(event)));
        });
        POPUP_EDIT_CLOSE.addEventListener('click', () => {
            resolve(false);
        });
    });
}
function editTaskHandler(event) {
    displayEditPopup();
    showPopUphandler();
    fillEditPopupInputs(event);

    editPromise(event).then(response => {
        if (!response) {
            hideEditPopup();
            hidePopUphandler();
        }
        else {
            updateTask(response);
            hideEditPopup();
            hidePopUphandler();
            snapshotHandler(getCurrentKey());
        }
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

function deleteTaskHandler(event) {
    showDeletePopup();
    showPopUphandler();
    deletePopUpPromise().then(response => {
        if (!response) {
            hideDeletePopup();
        }
        else {
            removeTaskNode(event);
            removeSpecificTask(getIdbyEvent(event), getCurrentKey());
            hidePopUphandler();
            hideDeletePopup();
        }
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
    search(liNodeList, filter);

}

function search(nodeList, filter) {
    let span, i, txtValue;
    for (i = 0; i < nodeList.length; i++) {
        span = getSpanFromli(nodeList[i]);
        txtValue = span.textContent || span.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            displayNode(nodeList[i]);
        } else {
            hideNode(nodeList[i]);
        }
    }
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

function getDragAfterElement(list, y) {
    const draggableElements = getAllNotDragging(list);

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




export {
    deleteTaskHandler, editTaskHandler, firstTimeHandler,
    notFirstTimeHandler, swapHandler,
    sortTasksHandler, searchHandler, createTaskHandler
}