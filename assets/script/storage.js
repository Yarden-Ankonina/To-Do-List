import Task from './task.js'
import { getCurrentKey } from './DOM.js';

function getTasksArray(key) {
    const tasksArray = doesTasksArrayExist(key) ? [] : JSON.parse(localStorage.getItem(key));
    return tasksArray;
}
function isStorageEmpty() {
    return window.localStorage.length === 0;
}
function doesTasksArrayExist(key) {
    return JSON.parse(localStorage.getItem(key) === []);
}
function addTaskToTasksArray(task, key) {
    const tasksArray = getTasksArray(key);
    tasksArray.push(task);
    localStorage.setItem(key, JSON.stringify(tasksArray));
}

function removeSpecificTask(id, key) {
    const tasksArray = getTasksArray(key);
    tasksArray.forEach((task, index) => {
        if (task.id == id) {
            tasksArray.splice(index, 1);
        }
    });
    setTasksArray(key, tasksArray);
}

function createTasksArrayFromList(tasksNodeList) {
    const taskArray = [];
    tasksNodeList.forEach((task) => {
        const title = task.querySelector("span").innerHTML;
        const id = task.id;
        const priority = task.classList.value.slice(-1);
        taskArray.push(new Task(title, priority, id));
    })
    return taskArray;
}

function snapshotHandler(key) {
    const tasksNodeList = document.querySelectorAll("li");
    const taskArray = createTasksArrayFromList(tasksNodeList);
    setTasksArray(key, taskArray);
}

function setTasksArray(key, taskArray = []) {
    console.log(taskArray);
    localStorage.setItem(key, JSON.stringify(taskArray));
}
function editKey(name) {
    const currentArray = getTasksArray(localStorage.key(0));
    localStorage.removeItem(getCurrentKey());

    setTasksArray(name, currentArray);
}

export {
    isStorageEmpty, getTasksArray, setTasksArray,
    snapshotHandler, addTaskToTasksArray, removeSpecificTask,
    editKey
}