export default 'todolist';

export {
    addTasksHandler,
    deleteTaskHandler,
    editTaskHandler
};


import Store from './store.js';
import UI from './ui.js';

const EDIT_POPUP = document.querySelector(".edit-popup");
const CLOSE_POPUP = document.querySelector("#popup-exit");
const SUBMIT_POPUP = document.querySelector(".edit-submit-update")
const MAIN_FLEX = document.querySelector(".main-flex");
const YES_DELETE_POPUP = document.querySelector(".yes");
const NO_DELETE_POPUP = document.querySelector(".no");
const DELETE_POPUP = document.querySelector(".delete-popup");
// const FAVOR = document.querySelector(".star-item"); //to add promise function .classlist.add("fas")/remove("far")

function editPromise(event) {
    const id = event.target.parentElement.id;
    return new Promise((resolve) => {
        SUBMIT_POPUP.addEventListener('click', (event) => {
            event.preventDefault();
            const newTitle = document.querySelector('#popup-title-input').value;
            const newPriority = document.querySelector('#popup-priority-select').value;
            resolve({ newTitle, newPriority, id });
        });
        CLOSE_POPUP.addEventListener('click', () => {
            resolve(false);
        });
    });
}

function deletePopUpPromise(event) {
    return new Promise((resolve) => {
        YES_DELETE_POPUP.addEventListener('click', () => {
            resolve(true);
        });
        NO_DELETE_POPUP.addEventListener('click', () => {
            resolve(false);
        });
    });
}

function showEditPopup() {
    EDIT_POPUP.style.visibility = "visible";
    MAIN_FLEX.classList.add("blurBackground");
}
function hideEditPopup() {
    EDIT_POPUP.style.visibility = "hidden";
    MAIN_FLEX.classList.remove("blurBackground");

}
function showDeletePopup() {
    DELETE_POPUP.style.visibility = "visible";
    MAIN_FLEX.classList.add("blurBackground");

}

function hideDeletePopup() {
    DELETE_POPUP.style.visibility = "hidden";
    MAIN_FLEX.classList.remove("blurBackground");
}
function fillEditPopupInputs() {
    document.querySelector('#popup-title-input').value =
        event.target.previousElementSibling.textContent;
    document.querySelector('#popup-priority-select').value =
        event.target.parentElement.className.slice(-1);
}
function editTaskHandler(event) {
    showEditPopup();
    fillEditPopupInputs(event);

    editPromise(event).then(response => {
        if (!response) {
            hideEditPopup();
        }
        else {
            UI.updateTask(response.id, response.newTitle, response.newPriority);
            hideEditPopup();
        }
    });
    //
}
function deleteTaskHandler(event) {
    showDeletePopup();
    deletePopUpPromise(event).then(response => {
        if (!response) {
            hideDeletePopup();
        }
        else {
            UI.removeTask(event);
            hideDeletePopup();
        }
    });
}


function addTasksHandler() {
    const tasksArray = Store.getTasksArray();
    tasksArray.forEach((task) => UI.addTask(task));
}


