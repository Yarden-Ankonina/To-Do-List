import {
    displayToogle, removeTasksNodeList,
    getCurrentKey, getPopUpTextInput, removePopup,
    blurToggle, clickInMainToggle, renderOptionToSelect
} from './DOM.js'

import {
    INPUT_SEARCH_TEXT,
    SELECT_CURRENT_LIST,
} from './DOM.js'

import {
    sortTasksHandler, searchHandler,
    newTaskHandler, swapHandler,
    renderTasksArrayHandler, deleteListHandler,
    addListHandler
} from './handlers.js'


import { setTasksArray, getTasksArray } from './storage.js'

let hueCounter = 0;

export function addEventsListenerHandler() {
    const MAIN_FORM = document.querySelector(".main-content-forms-todoForm");
    const MAIN_HEADER_NAVBAR = document.querySelector(".main-header-navbar-menu");
    const FORM_SEARCH = document.querySelector(".main-content-forms-searchForm");
    const SORT_BUTTON = document.querySelector("#navbar-sort-button");
    const MENU_BUTTON = document.querySelector(".fa-bars");
    const SEARCH_BUTTON = document.querySelector(".fa-search");
    const ADD_FORM_BUTTON = document.querySelector(".fa-plus");
    const DELETE_LIST_BUTTON = document.querySelector('.fas.fa-trash.todo-select-icon');
    const ADD_LIST_BUTTON = document.querySelector('.fas.fa-plus.todo-select-icon');

    const THEME = document.querySelector(".fa-tint");
    const LIGHT = document.querySelector(".fa-lightbulb");
    const HTML = document.querySelector("html");
    const DRAGGABLE_ZONE = document.querySelector('ul');

    INPUT_SEARCH_TEXT.addEventListener('input', () => {
        searchHandler();
    });

    MAIN_FORM.addEventListener("submit", (event) => {
        event.preventDefault();
        newTaskHandler();
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
        swapHandler(event);
    })

    DELETE_LIST_BUTTON.addEventListener('click', (e) => {
        deleteListHandler();

    })
    ADD_LIST_BUTTON.addEventListener('click', (e) => {
        addListHandler();
    })
    THEME.addEventListener('click', function () {
        hueCounter += 30;
        HTML.style.filter = "hue-rotate(" + hueCounter + "deg)";
    });

    LIGHT.addEventListener('click', function () {
        if (HTML.hasAttribute('data-theme')) {
            HTML.removeAttribute('data-theme', 'light');
        }
        else {
            HTML.setAttribute('data-theme', 'light');
        }
        hueCounter = 0;
        HTML.style.filter = "hue-rotate(" + hueCounter + "deg)";
    });

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

export { firstTimePopupEventsHandler }
