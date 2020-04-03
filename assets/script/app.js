class Task {
  constructor(title, priority, urgency) {
      this.title = title;
      this.priority = priority;
      this.urgency = urgency;
      this.createdTime = Date.parse(new Date());
  }
}

class UI {

  static addTasksHandler() {
      const tasks = Store.getTasksArray();
      tasks.forEach((task) => UI.addTask(task));
  }

  static addTask(task) {
      const list = document.querySelector('.todo-list');

      const li = document.createElement('li');
      li.classList.add(`priority${task.priority}`, `urgency${task.urgency}`)

      li.innerHTML = `<i class="fas fa-trash-alt"></i>
  <a href="#">${task.title}</a>
  <i class="far fa-edit"></i>`;


      li.firstElementChild.addEventListener('click', event => {
          UI.removeTask(event);
      })
      li.lastElementChild.addEventListener('click', event => {
          UI.updateHandler(event);
      })

      list.appendChild(li);
  }

  static removeTask(event) {
      const title = event.target.nextElementSibling.textContent;
      const element = event.target.parentNode;

      element.classList.add("deleted");
      setTimeout(function() {
          Store.removeTaskFromArray(title);
          element.remove();
      }, 599);
  }

  static clearInputs() {
      document.querySelector('#title-input').value = '';
      document.querySelector('#priority-input').value = '1';
      document.querySelector('#urgency-input').value = '1';
  }

  static sortHandler() {
      const tasks = Store.getTasksArray();

      tasks.sort(UI.compareByPriority);

      Store.updateTasksArray(tasks);

      const elements = Array.from(document.getElementsByClassName('todo-list')[0].children);

      for (let i = 1; i < elements.length; i++) {
          elements[i].remove();
      }

      UI.addTasksHandler();
  }

  static updateHandler(event) {
      console.log(event);
      // צריך לממש
  }

  static compareByPriority(a, b) {
      if (a.priority === b.priority) {
          return 0;
      } else {
          return a.priority > b.priority ? 1 : -1;
      }
  }
}

class Store {
  static getTasksArray() {
      let tasks;
      if (localStorage.getItem('tasks') === null) {
          tasks = [];
      } else {
          tasks = JSON.parse(localStorage.getItem('tasks'));
      }
      return tasks;
  }

  static addTaskToArray(task) {
      const tasks = Store.getTasksArray();
      tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  static removeTaskFromArray(title) {
      const tasks = Store.getTasksArray();

      tasks.forEach((task, index) => {
          if (task.title === title) {
              tasks.splice(index, 1);
          }
      });

      localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  static updateTasksArray(tasks) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}


document.addEventListener('DOMContentLoaded', UI.addTasksHandler);

document.querySelector('.main-content-todoForm').addEventListener('submit', (event) => {
  event.preventDefault();

  const title = document.querySelector('#title-input').value;
  const priority = document.querySelector('#priority-input').value;
  const urgency = document.querySelector('#urgency-input').value;

  const task = new Task(title, priority, urgency);
  UI.addTask(task);
  Store.addTaskToArray(task);
  UI.clearInputs();
});

document.querySelector('#a').addEventListener('click', () => {
  UI.sortHandler();
})