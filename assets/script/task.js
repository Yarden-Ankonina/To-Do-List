import { deleteTaskHandler, editTaskHandler } from './handlers.js';
import { snapshotHandler } from './storage.js';

export default class Task {
    constructor(title, priority, id = Date.parse(new Date())) {
        this.title = title;
        this.priority = priority;
        this.id = id;
    }
    static compare(taskA, taskB) {
        if (taskA.priority === taskB.priority) {
            return 0;
        } else {
            return taskA.priority > taskB.priority ? 1 : -1;
        }
    }
    static createHTMLelement(taskObj) {
        const li = document.createElement("li");
        li.classList.add("main-content-todolist-list-item");
        li.classList.add("draggable");
        li.classList.add(`priority-${taskObj.priority}`);
        li.setAttribute("draggable", "true");

        li.id = `${taskObj.id}`;
        li.innerHTML = `
        <i class="fas fa-trash-alt todo-icon" aria-hidden="true"></i>
        <span class="main-content-todolist-list-item-title">${taskObj.title}</span>
        <i class="far fa-edit todo-icon" aria-hidden="true"></i>`;

        this.liEventsHandler(li);

        return li;
    }
    static liEventsHandler(li) {
        li.addEventListener("dragstart", () => {
            li.classList.add("dragging");
        });
        li.addEventListener("dragend", () => {
            li.classList.remove("dragging");
            snapshotHandler(SELECT.value);
        });

        li.firstElementChild.addEventListener("click", (event) => {
            event.preventDefault();
            deleteTaskHandler(event);
        });

        li.lastElementChild.addEventListener("click", (event) => {
            editTaskHandler(event);
        });
    }
}