import UI from './ui.js';
import { createDraggableZone } from './draganddrop.js';
import navbar from './navbar.js'
import { addTasksHandler } from './todolist.js';
import Store from './store.js';
import { showLandingPage } from './ladingpage.js';


if (Store.isStoreEmpty()) {
  showLandingPage();
}
else {
  UI.renderStore();
  UI.setDay();
  createDraggableZone();
}

