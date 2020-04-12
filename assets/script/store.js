export default class Store {
    static getTasksArray() {
        let tasksArray = Store.isEmpty()
            ? []
            : JSON.parse(localStorage.getItem("tasks"));
        return tasksArray;
    }
    static isEmpty() {
        return localStorage.getItem("tasks") === "[]";
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
    static fillCurrentTasksArray(tasks) {
        tasks.forEach((task) => {
            const title = task.querySelector("span").innerHTML;
            const id = task.id;
            const priority = task.classList.value.slice(-1);
            newTaskArray.push({ title: title, priority: priority, id: id });
        })

    }

    static setCurrentTasks() {
        const tasks = document.querySelectorAll("li");
        let newTaskArray = this.fillCurrentTasksArray(tasks);
        Store.setTasksArray(newTaskArray);
    }

    static setTasksArray(tasksArray) {
        localStorage.setItem("tasks", JSON.stringify(tasksArray));
    }
}
