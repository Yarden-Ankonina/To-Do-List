import Task from './task.js';

import {
    getTasksArray, setTasksArray, snapshotHandler,
    removeSpecificTask, addTaskToTasksArray,
} from './storage.js';

import {
    renderListsOfKeys, removeTasksNodeList, getAllNotDragging,
    displayNode, hideNode,
    renderTask, getUlElement, getLiNodeList, getFilter, getSpanFromLi,
    getCurrentKey, removeTaskNode,
    renderPopup, removePopup, updateTaskNode, fillEditPopupInputs,
    getEditTitle, getEditPriority, getIdByEvent,
    getTitleFromForm, getPriorityFromForm, clearInputs,
    blurToggle, clickInMainToggle, updateMain,
    renderOptionToSelect, popupToogle

} from './DOM.js'


function renderTasksArrayHandler(tasksArray) {
    if (tasksArray) {
        tasksArray.forEach(task => {
            renderTask(task);
        })
    }
}

function newTaskHandler() {
    const newTask = (new Task(getTitleFromForm(), getPriorityFromForm()));
    renderTask(newTask);
    addTaskToTasksArray(newTask, getCurrentKey());
    clearInputs();
}

function sortTasksHandler(key) {
    const tasksArray = getTasksArray(key);
    tasksArray.sort(Task.compare);
    setTasksArray(key, tasksArray);
    removeTasksNodeList();
    renderTasksArrayHandler(tasksArray);
    snapshotHandler(getCurrentKey());
}

function searchHandler() {
    const filter = getFilter();
    const ul = getUlElement();
    const liNodeList = getLiNodeList(ul)
    searchByFilter(liNodeList, filter);
}

function searchByFilter(nodeList, filter) {
    let span, i, txtValue;
    for (i = 0; i < nodeList.length; i++) {
        span = getSpanFromLi(nodeList[i]);
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

function editTaskHandler(event) {
    renderPopup('editTask');
    popupToogle();
    fillEditPopupInputs(event);
    editPopupHandler(event);
}

function editTaskPromise(event) {
    const POPUP_SUBMIT_BUTTON = document.querySelector('.popup-form-submit');
    const POPUP_EDIT_CLOSE = document.querySelector('.popup-exit');

    return new Promise((resolve) => {
        POPUP_SUBMIT_BUTTON.addEventListener('click', (e) => {
            e.preventDefault();
            resolve(new Task(getEditTitle(), getEditPriority()
                , getIdByEvent(event)));
        });
        POPUP_EDIT_CLOSE.addEventListener('click', () => {
            resolve(false);
        });

    });
}

function editPopupHandler(event) {
    editTaskPromise(event).then(response => {
        if (!response) {
            popupToogle();
            removePopup();
        }
        else {
            updateTaskNode(response);
            popupToogle();
            removePopup();
            snapshotHandler(getCurrentKey());
        }
    });
}

function deletePopUpPromise() {
    const BUTTON_DELETE_YES = document.querySelector('.yes');
    const BUTTON_DELETE_NO = document.querySelector('.no');
    const POPUP_EDIT_CLOSE = document.querySelector('.popup-exit');
    return new Promise((resolve) => {
        BUTTON_DELETE_YES.addEventListener('click', () => {
            resolve(true);
        });
        BUTTON_DELETE_NO.addEventListener('click', () => {
            resolve(false);
        });
        POPUP_EDIT_CLOSE.addEventListener('click', () => {
            resolve(false);
        });
    });
}
function deleteTaskHandler(event) {
    popupToogle();
    renderPopup('yesNo');
    deleteTaskPopupHandler(event);
}
function deleteTaskPopupHandler(event) {
    deletePopUpPromise().then(response => {
        if (!response) {
            popupToogle();
            removePopup();
        } else {
            removeTaskNode(event);
            removeSpecificTask(getIdByEvent(event), getCurrentKey());
            popupToogle();
            removePopup();
        }
    });

}

function deleteListHandler() {
    popupToogle();
    renderPopup('yesNo');

    deletePopUpPromise().then(response => {
        if (!response) {
            popupToogle();
            removePopup();
        } else {
            removeSpecificList();
            popupToogle();
            removePopup();
        }
    })
}

function removeSpecificList() {
    localStorage.removeItem(getCurrentKey());
    updateMain();
    renderListsOfKeys();
    renderTasksArrayHandler(getTasksArray(localStorage.key(0)));
}

function addListHandler() {
    renderPopup('addList');
    blurToggle();
    clickInMainToggle();

    addListPromise(event).then(response => {
        if (!response) {
            blurToggle();
            clickInMainToggle();
            removePopup();
        }
        else {
            renderOptionToSelect(response);
            setTasksArray(response);
            blurToggle();
            clickInMainToggle();
            removePopup();
        }
    });
}

function addListPromise() {
    const POPUP_SUBMIT_BUTTON = document.querySelector('.popup-form-submit');
    const POPUP_EDIT_CLOSE = document.querySelector('.popup-exit');

    return new Promise((resolve) => {
        POPUP_SUBMIT_BUTTON.addEventListener('click', (event) => {
            event.preventDefault();
            resolve(getEditTitle());
        });
        POPUP_EDIT_CLOSE.addEventListener('click', () => {
            resolve(false);
        });
    });
}


export {
    newTaskHandler, swapHandler,
    sortTasksHandler, searchHandler,
    deleteTaskHandler, editTaskHandler,
    renderTasksArrayHandler, deleteListHandler,
    addListHandler
}