export default class Task {
    constructor(title, priority, id = Date.parse(new Date())) {
        this.title = title;
        this.priority = priority;
        this.id = id;
    }
    static compare(a, b) {
        if (a.priority === b.priority) {
            return 0;
        } else {
            return a.priority > b.priority ? 1 : -1;
        }
    }
}