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
}