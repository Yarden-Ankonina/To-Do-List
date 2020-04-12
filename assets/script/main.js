import {init} from "./init.js";
import UI from './ui.js';
import { draggableHandler } from './draganddrop.js';
import navbar from './navbar.js'
import { addTasksHandler } from './todolist.js';

init();
document.addEventListener("DOMContentLoaded", () => {
  addTasksHandler();
  UI.setDay();
  draggableHandler();
});

