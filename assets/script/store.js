export default class Store {
    static allocNewList(listName) {
        this.setTasksArray([], listName);
    }
    static getTasksArray(currentList) {
        let tasksArray = Store.isListEmpty(currentList)
            ? []
            : JSON.parse(localStorage.getItem(currentList));
        return tasksArray;
    }
    static isStoreEmpty() {
        return window.localStorage.length == 0;
        ;
    }
    static isListEmpty(currentList) {
        return JSON.parse(localStorage.getItem(currentList) == []);
    }

    static addTaskToArray(task) {
        const tasksArray = Store.getTasksArray();
        tasksArray.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasksArray));
    }

    static removeSpecificTask(title, tasksArray) {
        tasksArray.forEach((task, index) => {
            if (task.title === title) {
                tasksArray.splice(index, 1);
            }
        });
    }
    static deleteTaskHandler(title) {
        const tasksArray = Store.getTasksArray();
        this.removeSpecificTask(title, tasksArray);
        localStorage.setItem("tasks", JSON.stringify(tasksArray));
    }
    static createTaskArrayFromList(tasks) {
        const taskArray = [];
        tasks.forEach((task) => {
            const title = task.querySelector("span").innerHTML;
            const id = task.id;
            const priority = task.classList.value.slice(-1);
            taskArray.push({ title: title, priority: priority, id: id });
        })
        return taskArray;
    }

    static setCurrentTasks() {
        const tasks = document.querySelectorAll("li");
        const newTaskArray = this.createTaskArrayFromList(tasks);
        Store.setTasksArray(newTaskArray);
    }

    static setTasksArray(tasksArray, listName) {
        localStorage.setItem(listName, JSON.stringify(tasksArray));
    }
}
