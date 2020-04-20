import {
    displayToogle, addOptiontoSelect,
    removeAllTasks, addTask, getPopUpLandingInput
} from './DOM.js'

import {
    FORM_NEW_TODO, INPUT_SEARCH_TEXT, SORT_BUTTON,
    MENU_BUTTON, MAIN_HEADER_MENU, SEARCH_BUTTON,
    FORM_SEARCH, ADD_FORM_BUTTON, SELECT_CURRENT_LIST,
    LANDING_FORM, POPUP_LANDING, DRAGGABLE_ZONE
} from './DOM.js'

import {
    sortTasksHandler, searchHandler,
    createTaskHandler, swapHandler
} from './handlers.js'

import { setTasksArray, getTasksArray } from './storage.js'

export function addEventsListenerHandler() {
    INPUT_SEARCH_TEXT.addEventListener('input', () => {
        searchHandler();
    });

    FORM_NEW_TODO.addEventListener("submit", (event) => {
        event.preventDefault();
        createTaskHandler(event);
    });

    SORT_BUTTON.addEventListener("click", (event) => {
        event.preventDefault();
        sortTasksHandler(SELECT_TITLE.value);
    });

    MENU_BUTTON.addEventListener("click",
        () => {
            displayToogle(MAIN_HEADER_MENU);
        });

    SEARCH_BUTTON.addEventListener("click", () => {
        displayToogle(FORM_SEARCH);
    });


    ADD_FORM_BUTTON.addEventListener("click", function (event) {
        event.preventDefault();
        displayToogle(FORM_NEW_TODO);
    });

    SELECT_CURRENT_LIST.addEventListener('change', () => {
        removeAllTasks();
        const array = getTasksArray(SELECT_TITLE.value);
        array.forEach(element => {
            addTask(element)
        })
    })

    LANDING_FORM.addEventListener('submit', (event) => {
        event.preventDefault();
        displayToogle(POPUP_LANDING);
        const key = getPopUpLandingInput();
        setTasksArray(key);
        addOptiontoSelect(key);
    })

    DRAGGABLE_ZONE.addEventListener('dragover', (event) => {
        swapHandler(DRAGGABLE_ZONE, event);
    })
}
