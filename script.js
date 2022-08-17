const addTaskInLocalstorage = (taskValue) => {
  let tasks = JSON.parse(localStorage.getItem('tasks'));

  if (tasks) {
    tasks.push(taskValue);
  } else {
    tasks = [taskValue];
  }

  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const removeTaskInLocalstorage = (taskIndex) => {
  let tasks = JSON.parse(localStorage.getItem('tasks'));

  if (tasks) {
    tasks.splice(taskIndex, 1);
  } else {
    tasks = [];
  }

  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const removeTask = (event, index) => {
  removeTaskInLocalstorage(index);
  const taskListContainer = document.getElementById('taskListContainer');
  taskListContainer.removeChild(event.target.parentNode);
};

const createTaskListElement = (value, index) => {
  const taskListElement = document.createElement('li');
  taskListElement.classList.add('task-element');

  const labelElement = document.createElement('span');
  labelElement.classList.add('task-label');
  labelElement.textContent = value;
  taskListElement.appendChild(labelElement);

  const completeBtnElement = document.createElement('button');
  completeBtnElement.classList.add('btn', 'complete-task-btn');
  completeBtnElement.title = 'Terminer la tâche';
  completeBtnElement.innerHTML = '<i class="fa-solid fa-check"></i>';
  taskListElement.appendChild(completeBtnElement);

  const removeBtnElement = document.createElement('button');
  removeBtnElement.classList.add('btn', 'remove-task-btn');
  removeBtnElement.title = 'Supprimer la tâche';
  removeBtnElement.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
  removeBtnElement.addEventListener('click', (event) => removeTask(event, index));
  taskListElement.appendChild(removeBtnElement);

  return taskListElement;
};

const addTask = () => {
  const taskInput = document.getElementById('taskInput');

  if (taskInput.value) {
    const taskListContainer = document.getElementById('taskListContainer');
    const taskListElement = createTaskListElement(taskInput.value, taskListContainer.children.length);
    taskListContainer.appendChild(taskListElement);
    addTaskInLocalstorage(taskInput.value);
    taskInput.value = '';
  }
};

const init = () => {
  const addTaskBtn = document.getElementById('addTaskBtn');
  addTaskBtn.addEventListener('click', addTask);
};

window.onload = init;
