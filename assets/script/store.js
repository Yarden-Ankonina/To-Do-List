import Task from './task.js'
export {
    isStoreEmpty, getTasksArray, setTasksArray,
    snapshotHandler, addTaskToTasksArray, removeSpecificTask,
}
function getTasksArray(key) {
    const tasksArray = doesTasksArrayExist(key) ? [] : JSON.parse(localStorage.getItem(key));
    return tasksArray;
}
function isStoreEmpty() {
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
    setTasksArray(tasksArray, key);
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
    setTasksArray(taskArray, key);
}

function setTasksArray(tasksArray = [], key) {
    localStorage.setItem(key, JSON.stringify(tasksArray));
}

