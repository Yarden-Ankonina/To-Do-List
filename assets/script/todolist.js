export default 'todolist';
export { addTasksHandler };
export { editTaskHandler };

import Store from './store.js';
import UI from './ui.js';

const EDIT_POPUP = document.querySelector(".edit-popup");
const CLOSE_POPUP = document.querySelector("#popup-exit");
const SUBMIT_POPUP = document.querySelector(".edit-submit-update")
const MAIN_FLEX = document.querySelector(".main-flex");

function editPromise(event) {
    const id = event.target.parentElement.id;
    return new Promise((resolve) => {
        SUBMIT_POPUP.addEventListener('click', (event) => {
            event.preventDefault();
            const newTitle = document.querySelector('#popup-title-input').value;
            const newPriority = document.querySelector('#popup-priority-select').value;
            resolve([newTitle, newPriority, id]);
        });
        CLOSE_POPUP.addEventListener('click', () => {
            resolve("");
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
            const newTitle = response[0];
            const newPriority = response[1];
            const id = response[2];
            UI.updateTask(id, newTitle, newPriority);
            hideEditPopup();
        }
    });
    //
}

function addTasksHandler() {
    const tasksArray = Store.getTasksArray();
    tasksArray.forEach((task) => UI.addTask(task));
}

