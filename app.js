let tasks = [{ text: 'Task 1', completed: false }, { text: 'Task 2', completed: true }];

updateTaskList()


document.getElementById('newTask')
  .addEventListener("click", (e) => {
    e.preventDefault();
    // console.log('button clicked');
    addTask();
  });

const addTask = () => {
  const taskInput = document.getElementById('taskInput');
  const text = taskInput.value.trim();
  taskInput.value = '';

  if (text) {
    tasks.push({ text: text, completed: false });
    // console.log(tasks);

    updateTaskList()
  }
}

function updateTaskList() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    // console.log(task);

    const listItem = document.createElement('li');

    listItem.innerHTML = `
    <div class="taskItem">
      <div class="task ${task.completed ? 'completed' : ''}">
        <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ''} />
        <p>${task.text}</p>
      </div>

      <div class="icons">
        <img src="./img/edit.png" onClick= "editTask(${index})" >
        <img src="./img/bin.png" onClick= "deleteTask(${index})" >
      </div>
    </div>
    `;

    listItem.addEventListener('change', () => toggleTaskComplete(index))
    taskList.appendChild(listItem);
  });

}

function toggleTaskComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  updateTaskList();
}


const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateTaskList();
}


const editTask = (index) => {
  const taskItem= document.querySelectorAll('.taskItem')
  
  taskItem.forEach((taskItem, i) => {
    if (i === index) {
      const taskText = taskItem.querySelector('p');
      const input = document.createElement('input');
      input.type = 'text';
      input.value = taskText.textContent;
      input.className = 'edit-input';

      taskText.replaceWith(input);
      input.focus();

      const saveEdit = () => {
        tasks[index].text = input.value;
        updateTaskList();
      };

      input.addEventListener('blur', saveEdit);
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          saveEdit();
        }
      });
    }
  });
};