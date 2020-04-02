class Task {
  constructor(title, priority,urgency) {
    this.title = title;
    this.priority = priority;
    this.urgency = urgency;
    this.createdTime = Date.parse(new Date());
  }
}

class UI {

  static displayTasks() {
    const tasks = Store.getTasks();

    tasks.forEach((task) => UI.addTaskToList(task));
  }

  static addTaskToList(task) {
    const list = document.querySelector('.todo-list'); 

    const li = document.createElement('li');

    li.innerHTML = `<i class="fas fa-trash-alt"></i>
    <a href="#">${task.title}</a>
    <i class="far fa-edit"></i>`;

    li.firstElementChild.addEventListener('click', (event) => {
      UI.removeTaskFromList(event); })
    // edit feature must be added
    list.appendChild(li);
  }
  
  static removeTaskFromList(event) {
    const title = event.target.nextElementSibling.textContent;
    const element = event.target.parentNode;
    element.classList.add("deleted");
    setTimeout(function(){
      Store.removeTask(title);
      element.remove();
    },599);
  }

  // static showAlert(message, className) {
  //   // DISCUSSE LOGIC WITH YARDEN
  //   // Vanish in 1.5 seconds
  //   setTimeout(() => document.querySelector('.alert').remove(), 1500);
  // }

  static clearFields() {
    document.querySelector('#title-input').value = '';
    document.querySelector('#priority-input').value = '1';
    document.querySelector('#urgency-input').value = '1';
  }

  static updateTask() {
    const tasks = Store.getTasks();
    tasks.sort(UI.compare);
    console.log(tasks[0].priority)
    console.log(tasks[1].priority)

    Store.updateTasks(tasks);

    const elements = Array.from(document.getElementsByClassName('todo-list')[0].children);
    for ( let i= 1; i< elements.length; i++) {
      elements[i].remove();
    }
    UI.displayTasks();
  }


  static compare(a,b) {
    if (a.priority === b.priority) {
      return 0;
    } else {
    return a.priority > b.priority ? 1: -1;
  }
}
}

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

  static updateTasks(tasks){
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}


document.addEventListener('DOMContentLoaded', UI.displayTasks);

document.querySelector('.main-content-todoForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.querySelector('#title-input').value;
  const priority = document.querySelector('#priority-input').value;
  const urgency = document.querySelector('#urgency-input').value;
    
  const task = new Task(title,priority,urgency);
  UI.addTaskToList(task);
  Store.addTask(task);
  UI.clearFields();
});

document.querySelector('#a').addEventListener('click',()=>
{
  UI.updateTask();})
