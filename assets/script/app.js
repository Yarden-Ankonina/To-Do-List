import { isStorageEmpty, getTasksArray } from './storage.js';

import { renderTasksArrayHandler } from './handlers.js';

import {
  popupToogle, renderPopup,
  renderListsOfKeys, setDay
} from './DOM.js'

import {
  addEventsListenerHandler, firstTimePopupEventsHandler,
} from './events.js';


onLoad();

function onLoad() {
  if (isStorageEmpty()) {
    renderPopup('firstTime');
    popupToogle();
    firstTimePopupEventsHandler();
  }
  else {
    renderListsOfKeys();
    renderTasksArrayHandler(getTasksArray(localStorage.key(0)));
  }
  setDay();
  addEventsListenerHandler();
}


