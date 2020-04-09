export default 'todolist';
export { addTasksHandler };
export { editTaskHandler };

import Store from './store.js';
import UI from './ui.js';

const EDIT_POPUP = document.querySelector(".edit-popup");
const CLOSE_POPUP = document.querySelector("#popup-exit");
const SUBMIT_POPUP = document.querySelector(".edit-submit-update")
const MAIN_FLEX = document.querySelector(".main-flex");

function editTaskHandler(event) {
    let id = event.target.parentElement.id
    EDIT_POPUP.style.visibility = "visible";
    MAIN_FLEX.classList.add("blurBackground");

    document.querySelector('#popup-title-input').value =
        event.target.previousElementSibling.textContent;
    document.querySelector('#popup-priority-select').value =
        event.target.parentElement.classList.value.slice(-1);

    const promise = new Promise((resolve) => {
        SUBMIT_POPUP.addEventListener('click', (event) => {
            event.preventDefault();
            const newTitle = document.querySelector('#popup-title-input').value;
            const newPriority = document.querySelector('#popup-priority-select').value;
            resolve([newTitle, newPriority, id]);
        });
        CLOSE_POPUP.addEventListener('click', (event) => {
            console.log(event)
            resolve("");
        });
    });

    promise.then(response => {
        if (!response) {
            EDIT_POPUP.style.visibility = "hidden";
            MAIN_FLEX.classList.remove("blurBackground");
        }
        else {
            console.log(response)
            const newTitle = response[0];
            const newPriority = response[1];
            const id = response[2];
            UI.updateTask(id, newTitle, newPriority);
            EDIT_POPUP.style.visibility = "hidden";
            MAIN_FLEX.classList.remove("blurBackground");
        }
    });
    //
}

function addTasksHandler() {
    const tasksArray = Store.getTasksArray();
    tasksArray.forEach((task) => UI.addTask(task));
}

