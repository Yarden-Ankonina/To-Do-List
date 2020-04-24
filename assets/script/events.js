import {
    displayToogle, removeTasksNodeList,
    getCurrentKey, getPopUpTextInput, removePopup,
    blurToggle, clickInMainToggle
} from './DOM.js'

import {
    MAIN_FORM, INPUT_SEARCH_TEXT, SORT_BUTTON,
    MENU_BUTTON, MAIN_HEADER_NAVBAR, ADD_FORM_BUTTON,
    SELECT_CURRENT_LIST, DRAGGABLE_ZONE, SEARCH_BUTTON,
    FORM_SEARCH, EDIT_LIST_BUTTON,
    renderOptionToSelect
} from './DOM.js'

import {
    sortTasksHandler, searchHandler,
    createTaskHandler, swapHandler,
    renderTasksArrayHandler, editListHandler
} from './handlers.js'


import { setTasksArray, getTasksArray } from './storage.js'

export function addEventsListenerHandler() {
    INPUT_SEARCH_TEXT.addEventListener('input', () => {
        searchHandler();
    });

    MAIN_FORM.addEventListener("submit", (event) => {
        event.preventDefault();
        createTaskHandler(event);
    });

    SORT_BUTTON.addEventListener("click", (event) => {
        event.preventDefault();
        sortTasksHandler(getCurrentKey());
    });

    MENU_BUTTON.addEventListener("click",
        () => {
            displayToogle(MAIN_HEADER_NAVBAR);
        });

    SEARCH_BUTTON.addEventListener("click", () => {
        displayToogle(FORM_SEARCH);
    });

    ADD_FORM_BUTTON.addEventListener("click", function (event) {
        event.preventDefault();
        displayToogle(MAIN_FORM);
    });

    SELECT_CURRENT_LIST.addEventListener('change', () => {
        removeTasksNodeList();
        renderTasksArrayHandler(getTasksArray(getCurrentKey()));
    })

    DRAGGABLE_ZONE.addEventListener('dragover', (event) => {
        swapHandler(DRAGGABLE_ZONE, event);
    })

    EDIT_LIST_BUTTON.addEventListener('click', () => {
        editListHandler();
    })

}


function deletePopupEventsHandler() {
    const exit = document.querySelector('.popup-exit');
    exit.addEventListener('click', () => {
        blurToggle();
        clickInMainToggle();
        removePopup();
    })
}
function firstTimePopupEventsHandler() {
    const POPUP_FORM = document.querySelector('.popup-form');
    POPUP_FORM.addEventListener('submit', (event) => {
        event.preventDefault();
        const key = getPopUpTextInput();
        setTasksArray(key);
        renderOptionToSelect(key);
        blurToggle();
        clickInMainToggle();
        removePopup();
    })
}

export { deletePopupEventsHandler, firstTimePopupEventsHandler }
