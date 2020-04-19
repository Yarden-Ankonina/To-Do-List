import {
    toogleMainHeaderDisplay, toogleAddForm,
    toogleSearchBarDisplay, addOptiontoSelect,
    hideLandingPopUp, removeAllTasks,
    addTask
} from './DOM.js'
import { sortTasksHandler, searchHandler, createTaskHandler, swapHandler } from './handlers.js'
import { setTasksArray, getTasksArray } from './storage.js'

export function addEventsListenerHandler() {
    const LANDING_FORM = document.querySelector('.popup-first-form');
    const POPUP_LANDING_TEXT_INPUT = document.querySelector('#first-text-input');


    const SEARCH_INPUT = document.querySelector('#search-input');
    const ADD_FORM_BUTTON = document.querySelector(".fa-plus");
    const ADD_FORM = document.querySelector(".main-content-forms-todoForm");
    const SORT_BUTTON = document.querySelector("#navbar-sort-button");
    const MENU_BUTTON = document.querySelector(".fa-bars");
    const SEARCH_BUTTON = document.querySelector(".fa-search");
    const SELECT_TITLE = document.querySelector('.main-content-todolist-select')



    const DRAGGABLE_ZONE = document.querySelector('ul');




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
        sortTasksHandler(SELECT_TITLE.value);
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
        const array = getTasksArray(SELECT_TITLE.value);
        array.forEach(element => {
            addTask(element)
        })
    })

    LANDING_FORM.addEventListener('submit', (event) => {
        event.preventDefault();
        hideLandingPopUp();
        const key = getPopUpLandingInput();
        setTasksArray(key);
        addOptiontoSelect(key);
    })

    function getPopUpLandingInput() {
        return POPUP_LANDING_TEXT_INPUT.value;
    }

    DRAGGABLE_ZONE.addEventListener('dragover', (event) => {
        swapHandler(DRAGGABLE_ZONE, event);
    })


}

    // LANDING_PAGE.addEventListener('click', instructionsHandler);

 // const picsArray = ["'/assets/styles/resources/LandingPage/Tips.jpg'",
    //     "'/assets/styles/resources/LandingPage/addTodo.jpg'",
    //     "'/assets/styles/resources/LandingPage/search.jpg'",
    //     "'/assets/styles/resources/LandingPage/openMenu.jpg'",
    //     "'/assets/styles/resources/LandingPage/createList.jpg'"
    // ]
    // let indexPicsArray = 0;

    // function instructionsHandler() {
    //     if (indexPicsArray < 4) {
    //         LANDING_PAGE.style.backgroundImage = `url(${picsArray[indexPicsArray++]})`;
    //     }
    //     else if (indexPicsArray === 4) {
    //         LANDING_PAGE.style.backgroundImage = `url(${picsArray[indexPicsArray++]})`;
    //         displayLandingPopUPForm();
    //     }
    //     else {
    //         LANDING_PAGE.removeEventListener('click', instructionsHandler)
    //     }
    // }