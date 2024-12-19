let tasks = [];

document.getElementById('newTask')
  .addEventListener("click", (e) => {
    e.preventDefault();
    // console.log('button clicked');
    addTask();
  });

const addTask = () =>{
  const taskInput = document.getElementById('taskInput');
  const text = taskInput.value.trim();  

  if(text){
    tasks.push({text: text, completed: false});
  // console.log(tasks);
  
  updateTaskList()
  }
}

function  updateTaskList() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';

  tasks.forEach((task, index) =>{
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
  console.log("Task completion toggled! ", index);
}

