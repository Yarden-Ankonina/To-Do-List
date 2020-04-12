import Store from "./store.js";
import UI from "./ui.js"
export { showLandingPage, addOptiontoSelect };

const LANDING_PAGE = document.querySelector('.landing-page');
const LANDING_FORM = document.querySelector('.landing-page-form');
const LANDING_TEXT = document.querySelector('#landing-text-input');
const LANDING_SUBMIT = document.querySelector('#landing-submit-input');
const SELECT_TITLE = document.querySelector('.main-content-todolist-select')

SELECT_TITLE.addEventListener('change', (event) => {
    UI.removeAllTasks();
    const array = Store.getTasksArray(SELECT_TITLE.value);
    array.forEach(element => {
        UI.addTask(element)
    })
}
)

LANDING_FORM.addEventListener('submit', (event) => {
    event.preventDefault();
    firstTimeHandler();
})

function firstTimeHandler() {
    Store.allocNewList(LANDING_TEXT.value);
    addOptiontoSelect(LANDING_TEXT.value);
    LANDING_PAGE.style.display = 'none';
}

function showLandingPage() {
    LANDING_PAGE.style.display = 'flex';
}

function createOption(name) {
    const option = document.createElement('option');
    option.classList.add('popup-priority-select-option');
    option.value = name;
    option.innerText = name;
    return option;
}

function addOptiontoSelect(name) {
    const option = createOption(name);
    SELECT_TITLE.appendChild(option);
}

