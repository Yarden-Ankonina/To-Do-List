/*
CSS => design for priorities classes 1,2,3
*/ 
document.addEventListener("DOMContentLoaded",()=>
{   
    addTasksHandler();
    UI.setDay();
    draggableHandler();
} );
document.querySelector(".main-content-todoForm")
  .addEventListener("submit", event => {
    event.preventDefault();
    createTaskHandler(event);
  });

document.querySelector("#sort-button").addEventListener("click", (event) => {
  event.preventDefault();
  sortTasksHandler();
});

document.querySelector('.edit-form').addEventListener('submit',(event)=>
  {
  event.preventDefault();
  editTaskHandler();
  })

class Task {
  constructor(title, priority, id=Date.parse(new Date())) {
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

class UI {
static setDay() {
    const element = document.querySelector('.date');
    const today = new Date();
    element.innerHTML= today.toDateString();
}
  static addTask(taskObj) {
    const ul = document.querySelector(".todo-list");

    const li = document.createElement("li");
    li.classList.add('draggable');
    li.classList.add(`priority-${taskObj.priority}`);
    li.setAttribute('draggable','true');

    li.id = `${taskObj.id}`;
    li.innerHTML = `
    <i class="fas fa-trash-alt"></i>
     <a href="#">${taskObj.title}</a>
     <i class="far fa-edit"></i>`;
     li.addEventListener('dragstart', () => {
      li.classList.add('dragging')
    })
    li.addEventListener('dragend', () => {
      li.classList.remove('dragging')
      Store.setCurrentTasks();
    })
  
    li.firstElementChild.addEventListener("click", event => {
      event.preventDefault();
      let response = addDeleteWindow(event);
      if(response === true)
      {
        UI.removeTask(event);
      }
    });

    li.lastElementChild.addEventListener("click", event => {
      event.preventDefault();
      addEditWindow(event);     
    });

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


  static removeAllTasks(){
    const elements = [...document.getElementsByClassName("todo-list")[0].children];
    for (let i = 1; i < elements.length; i++) {
      elements[i].remove();
    }
  }

  static updateTask(id,newTitle,newPriority) {
    const tasksArray = document.querySelectorAll('li');
    tasksArray.forEach(task =>{
      if (task.id === id) {
        task.firstElementChild.nextElementSibling.innerHTML = newTitle;
        task.classList.add('draggable', `priority-${newPriority}`);
      }
    })
    Store.setCurrentTasks()
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

  static setCurrentTasks(){
    const tasks= document.querySelectorAll('li');

    let newTaskArray = [];
    
    tasks.forEach((task) => {
      const title = task.querySelector('a').innerHTML;
      const id = task.id;
      const priority= task.classList.value.slice(-1);  
      newTaskArray.push({'title': title,'priority':priority,'id':id});

      Store.setTasksArray(newTaskArray);
  })
}

  static setTasksArray(tasksArray) {
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
  }

}

function addTasksHandler() {
    const tasksArray = Store.getTasksArray();
    tasksArray.forEach(task => UI.addTask(task));
  }

function sortTasksHandler() {
    const tasksArray = Store.getTasksArray();

    tasksArray.sort(Task.compare);

    Store.setTasksArray(tasksArray);

    UI.removeAllTasks();
    addTasksHandler();

    Store.setCurrentTasks();
}

function createTaskHandler(){
  const title = document.querySelector("#title-input").value;
  const priority = document.querySelector("#priority-input").value;
  const task = new Task(title, priority);

  UI.addTask(task);
  
  Store.addTaskToArray(task);
  UI.clearInputs();
}

function editTaskHandler() {
  const newTitle= document.querySelector('#title-update').value;
  const newPriority= document.querySelector('#priority-edit').value;
  const id = event.target.getAttribute('currentid')
  UI.updateTask(id,newTitle,newPriority);
}