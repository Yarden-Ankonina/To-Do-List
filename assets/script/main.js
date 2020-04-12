import UI from './ui.js';
import { createDraggableZone } from './draganddrop.js';
import navbar from './navbar.js'
import { addTasksHandler } from './todolist.js';

document.addEventListener("DOMContentLoaded", () => {
  addTasksHandler();
  UI.setDay();
  createDraggableZone();
});

