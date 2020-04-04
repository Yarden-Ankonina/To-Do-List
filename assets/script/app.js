/*
CSS => design for priorities classes 1,2,3
*/ 

class Task {
  constructor(title, priority, id=Date.parse(new Date())) {
    this.title = title;
    this.priority = priority;
    this.id = id;
  }
}

class UI {
static setDay() {
    const element = document.querySelector('.date');
    const today = new Date();
    element.innerHTML= today.toDateString();
}
  static addTasksHandler() {
    const tasksArray = Store.getTasksArray();
    tasksArray.forEach(task => UI.addTask(task));
  }

  static addTask(task) {
    const ul = document.querySelector(".todo-list");

    const li = document.createElement("li");
    li.classList.add('draggable');
    li.classList.add(`priority-${task.priority}`);
    li.setAttribute('draggable','true');

    li.id = `${task.id}`;
    li.innerHTML = `
    <i class="fas fa-trash-alt"></i>
     <a href="#">${task.title}</a>
     <i class="far fa-edit"></i>`;

    li.firstElementChild.addEventListener("click", event => {
      event.preventDefault();
      UI.removeTask(event);
    });
    // li.lastElementChild.addEventListener("click", event => {
    //   event.preventDefault();
    //   UI.updateTaskHandler(event);
    // });

    ul.appendChild(li);
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
    document.querySelector("#title-input").value = "";
    document.querySelector("#priority-input").value = "1";
  }

  static sortHandler() {
    const tasksArray = Store.getTasksArray();

    tasksArray.sort(UI.compareByPriority);

    Store.updateTasksArray(tasksArray);

    const elements = Array.from(document.getElementsByClassName("todo-list")[0].children);

    for (let i = 1; i < elements.length; i++) {
      elements[i].remove();
    }

    UI.addTasksHandler();
  }
//fixxxxxxxxxxxxxxxxxxxxxx
  // static updateTaskHandler(event) {
  //   const title = document.querySelector("#title-update").value;
  //   const priority = document.querySelector("#priority-edit").value;
 
  //   UI.updateTask(element, title, priority,id);

  //   Store.updateTask(id,title,priority);
  // }

  static updateTask(element, title, priority,id) {
    element.outerHTML = `<li class="priority-${priority}id="${id}">
    <i class="fas fa-trash-alt"></i>
    <a href="#">${title}</a>
    <i class="far fa-edit"></i>
    </li>`;
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
    let tasksArray;
    if (localStorage.getItem("tasks") === null) {
        tasksArray = [];
    } else {
        tasksArray = JSON.parse(localStorage.getItem("tasks"));
    }
    return tasksArray;
  }

  static addTaskToArray(task) {
    const tasksArray = Store.getTasksArray();
    tasksArray.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
  }

  static removeTaskFromArray(title) {
    const tasksArray = Store.getTasksArray();

    tasksArray.forEach((task, index) => {
      if (task.title === title) {
        tasksArray.splice(index, 1);
      }
    });

    localStorage.setItem("tasks", JSON.stringify(tasksArray));
  }
  static swap(){
    const tasks= document.querySelectorAll('li');

    let newTaskArray = [];
    
    tasks.forEach((task) => {
      const title = task.querySelector('a').innerHTML;
      const id = task.id;
      const priority= task.classList.value.slice(-1);  
      newTaskArray.push(new Task(title,priority,id))})

      Store.updateTasksArray(newTaskArray);
  }

  static updateTasksArray(tasksArray) {
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
  }

  static updateTask(id, title, priority) {
    const tasksArray = Store.getTasksArray();
    const index = tasksArray.findIndex(
      task => task.createdTime === id
    );
    tasksArray[index].title = title;
    tasksArray[index].priority = priority;

    Store.updateTasksArray(tasksArray)
  }
}

document.addEventListener("DOMContentLoaded",()=>
{   
    UI.addTasksHandler();
    UI.setDay();
    draggableHandler();
} );

document
  .querySelector(".main-content-todoForm")
  .addEventListener("submit", event => {
    event.preventDefault();

    const title = document.querySelector("#title-input").value;
    const priority = document.querySelector("#priority-input").value;

    const task = new Task(title, priority);
    UI.addTask(task);
    Store.addTaskToArray(task);
    UI.clearInputs();
  });

document.querySelector("#a").addEventListener("click", () => {
  UI.sortHandler();
});


