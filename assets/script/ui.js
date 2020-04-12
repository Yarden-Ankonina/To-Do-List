import Store from './store.js'
import { editTaskHandler } from './todolist.js';
import {init} from "./init.js";

export default class UI {
    static setDay() {
        const placeHolder = document.querySelector(
            ".main-content-date-placeHolder"
        );
        const today = new Date();
        placeHolder.innerHTML = today.toDateString();
    }
    static createTask(taskObj) {
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

        li.addEventListener("dragstart", () => {
            li.classList.add("dragging");
        });
        li.addEventListener("dragend", () => {
            li.classList.remove("dragging");
            Store.setCurrentTasks();
        });

        li.firstElementChild.addEventListener("click", (event) => {
            event.preventDefault();
            if (confirm('Do you want to delete') == true) {
                UI.removeTask(event);
            }
        });

        li.lastElementChild.addEventListener("click", (event) => {
            editTaskHandler(event);
        });
        return li;
    }

    static addTask(taskObj) {
        const ul = document.querySelector(".main-content-todolist-list");
        ul.appendChild(this.createTask(taskObj));
    }

    static removeTask(event) {
        const title = event.target.nextElementSibling.textContent;
        const element = event.target.parentNode;

        element.classList.add("deleted");
        setTimeout(() => {
            Store.removeTaskFromArray(title);
            element.remove();
        }, 599);
    }

    static clearInputs() {
        document.querySelector("#todoForm-title-input").value = "";
        document.querySelector("#todoForm-priority-select").value = "1";
    }

    static removeAllTasks() {
        const tasksArray = [...document.getElementsByClassName("main-content-todolist-list")[0].children,
        ];
        tasksArray.forEach(task => task.remove());
    }

    static updateTask(id, newTitle, newPriority) {
        const tasksArray = document.querySelectorAll("li");
        tasksArray.forEach((task) => {
            if (task.id === id) {
                task.firstElementChild.nextElementSibling.innerHTML = newTitle;
                task.classList.add("draggable", `priority-${newPriority}`);
            }
        });
        Store.setCurrentTasks();
    }
}