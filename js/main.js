// Находим элементы на странице
const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');


let tasks = [];

if (localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem('tasks'))
  
}

tasks.forEach(function (task) {
  renderTask(task);
  
  
});

checkEmptyList();


// Добавление задачи
form.addEventListener('submit', addTask);

// Удаляем задачи
tasksList.addEventListener('click', deleteTask)

// Отмечаем задачу заверешенной

tasksList.addEventListener('click', doneTask)

// Функции
function addTask (event) {
  // Отменяем отправку формы (перезагрузку страницы)
  event.preventDefault();

  // Достаем текст задачи из поля ввода
  const taskText = taskInput.value

  // Описываем задачу в виде объекта
  const newtask = {
    id: Date.now(),
    text: taskText,
    done: false,
  };
  
  // Добавляем задачу в массив с задачами
  tasks.push(newtask)

  // Добавляем задачу в хранилище браузера
  saveToLocalStorage()

  renderTask(newtask);

  // Очищаем поле ввода и возвращаем фокус на него
  
  taskInput.value = "";
  taskInput.focus();
  checkEmptyList();

  // Скрываем надпись список дел пуст если больше 1 задачи
  
  // if(tasksList.children.length > 1) {
  //   emptyList.classList.add('none')
  // }
}

function deleteTask(event) {
  
  
  // Проверяем что клик был по кнопке удалить задачу
  if(event.target.dataset.action === 'delete') {
    const parenNode = event.target.closest('.list-group-item') //ищет снаружи из родителей в который вложен элемент
    
    // Определяем ID задачи
    const id = Number(parenNode.id);

    // Находим индекс задачи в массиве
    const index = tasks.findIndex( (task) => task.id === id);

       

    // Удаляем задачу из масива с задачами

    tasks.splice(index, 1);

    // Добавляем задачу в хранилище браузера
  saveToLocalStorage()


    // tasks = tasks.filter(function(task) {   (Удаление через фильтрацию массива)
    //   if (task.id === id) {
    //     return false
        
    //   } else {
    //     return true
    //   }
    // })
    
    parenNode.remove()
    checkEmptyList();
    
  }
// Если задачи удалил то показываем список дел пуст
  // if(tasksList.children.length === 1) {
  //   emptyList.classList.remove('none')
  // }
}


function doneTask(event) {
  // Проверяем
  if (event.target.dataset.action === 'done') {
    
    const parenNode = event.target.closest('.list-group-item');

    // Определяем ID задачи

    const id = Number(parenNode.id);

    const task = tasks.find(function(task){
      if (task.id === id ) {
        return true
        
      }
    })

    task.done = !task.done

    // Добавляем задачу в хранилище браузера
  saveToLocalStorage()

    const taskTitle = parenNode.querySelector('.task-title')
    taskTitle.classList.toggle('task-title--done')
    
    
    
    
  }

}

// Проверяем количество элементов 
function checkEmptyList() {
  if (tasks.length == 0) {
      const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
					<img src="./img/logo1.svg" alt="Empty" width="48" class="mt-3">
					<div class="empty-list__title">Список дел пуст</div>
				</li>`;
      tasksList.insertAdjacentHTML('afterbegin', emptyListHTML);
  }

  if(tasks.length > 0) {
    const emptyListEl = document.querySelector('#emptyList');
    emptyListEl ? emptyListEl.remove() : null;
  }
}

function saveToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTask(task) {
// Формируем CSS класс
const cssClas = task.done ? "task-title task-title--done" : 'task-title';
  
// Формируем разметку для новой задачи 

const taskHTML = `<li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
        <span class="${cssClas}">${task.text}</span>
        <div class="task-item__buttons">
          <button type="button" data-action="done" class="btn-action">
            <img src="./img/tick.svg" alt="Done" width="18" height="18">
          </button>
          <button type="button" data-action="delete" class="btn-action">
            <img src="./img/cross.svg" alt="Done" width="18" height="18">
          </button>
        </div>
      </li>`

// Добавляем задачу на страницу
tasksList.insertAdjacentHTML('beforeend', taskHTML);
}