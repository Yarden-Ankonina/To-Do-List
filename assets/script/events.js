import { toogleMainHeaderDisplay, toogleAddForm, toogleSearchBarDisplay, addOptiontoSelect } from './DOM.js'
import { sortTasksHandler, searchHandler, createTaskHandler, firstTimeHandler } from './handlers.js'
import { setTasksArray } from './store.js'

export function addEventsListenerHandler() {
    const SEARCH_INPUT = document.querySelector('#search-input');
    const ADD_FORM_BUTTON = document.querySelector(".fa-plus");
    const ADD_FORM = document.querySelector(".main-content-forms-todoForm");
    const SORT_BUTTON = document.querySelector("#navbar-sort-button");
    const MENU_BUTTON = document.querySelector(".fa-bars");
    const SEARCH_BUTTON = document.querySelector(".fa-search");
    const SELECT_TITLE = document.querySelector('.main-content-todolist-select')
    const LANDING_FORM = document.querySelector('.landing-page-form');
    const DRAGGABLE_ZONE = document.querySelector('ul');
    const LANDING_TEXT_INPUT = document.querySelector('#landing-text-input');


    SEARCH_INPUT.addEventListener('input', () => {
        searchHandler();
    }
    );

    ADD_FORM.addEventListener("submit", (event) => {
        event.preventDefault();
        createTaskHandler(event);
    });

    SORT_BUTTON.addEventListener("click", (event) => {
        event.preventDefault();
        sortTasksHandler();
    });

    MENU_BUTTON.addEventListener("click",
        () => {
            toogleMainHeaderDisplay()
        });

    SEARCH_BUTTON.addEventListener("click", () => {
        toogleSearchBarDisplay();
    });


    ADD_FORM_BUTTON.addEventListener("click", function (event) {
        event.preventDefault();
        toogleAddForm();
    });

    SELECT_TITLE.addEventListener('change', () => {
        removeAllTasks();
        const array = Store.getTasksArray(SELECT_TITLE.value);
        array.forEach(element => {
            addTask(element)
        })
    })

    LANDING_FORM.addEventListener('submit', (event) => {
        event.preventDefault();
        const newListName = LANDING_TEXT_INPUT.value;
        firstTimeHandler(newListName)
    })


    DRAGGABLE_ZONE.addEventListener('dragover', (event) => {
        swapHandler(draggableZone, event);
    })
}
