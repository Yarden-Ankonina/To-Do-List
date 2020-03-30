// Task Class: Represents a Task
class Task {
  constructor(title, url) {
    this.title = title;
    this.url = url;
  }
}
// UI Class: Handle UI Tasks
class UI {
  static displayTasks() {
    const tasks = Store.getTasks();

    tasks.forEach((task) => UI.addTaskToList(task));
  }

  static addTaskToList(task) {
    const list = document.querySelector('#tasks'); 

    const li = document.createElement('li');

    li.innerHTML = `<a href='${task.url}'">${task.title}</a>
    <a href='#' class='delete'>&#169;</a>`; // add + edit

    li.lastChild.addEventListener('click', (e) => {
      console.log(e.target.parentElement)
      // Remove book from UI
      UI.deleteTask(e.target.parentElement);
    
      // Remove task from store
      console.log(e.target.previousElementSibling.textContent)
      Store.removeTask(e.target.previousElementSibling.textContent);
    
      // Show success message
      UI.showAlert('Task Removed', 'success');
    })

    list.appendChild(li);
  }

  static deleteTask(el) {
      el.remove();
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#form');
    container.insertBefore(div, form);

    // Vanish in 1.5 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 1500);
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#url').value = '';
  }
}

// Store Class: Handles Storage
class Store {
  static getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;
  }

  static addTask(task) {
    const tasks = Store.getTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  static removeTask(title) {
    const tasks = Store.getTasks();

    tasks.forEach((task, index) => {
      if(task.title === title) {
        tasks.splice(index, 1);
      }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

// Event: Display Tasks
document.addEventListener('DOMContentLoaded', UI.displayTasks);

// Event: Add a Task
document.querySelector('#form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  const title = document.querySelector('#title').value;
  const url = document.querySelector('#url').value;

  // Validate
  if(!isValidUrl(url)) {
    UI.showAlert('Please insert full url', 'danger');
  } else if (!url) {
    const task = new Task(title, '#');
    UI.addTaskToList(task);
    Store.addTask(task);
  } else {
    // Instatiate task
    const task = new Task(title, url);

    // Add Task to UI
    UI.addTaskToList(task);

    // Add task to store
    Store.addTask(task);
  }
    // Show success message
    UI.showAlert('Task Added', 'success');

    // Clear fields
    UI.clearFields();
});

// // Event: Remove a task
// document.querySelector('.delete').addEventListener;

function isValidUrl(url) {return true};
