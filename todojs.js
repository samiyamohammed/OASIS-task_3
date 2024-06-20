let tasks = [];

function addTask() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    if (title === '' || description === '') {
        alert('Please fill out both fields.');
        return;
    }

    const task = {
        id: Date.now(),
        title: title,
        description: description,
        completed: false,
    };

    tasks.push(task);
    updateTaskList();

    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
}

function updateTaskList() {
    const pendingTasksList = document.getElementById('pending-tasks');
    const completedTasksList = document.getElementById('completed-tasks');

    pendingTasksList.innerHTML = '';
    completedTasksList.innerHTML = '';

    tasks.forEach(task => {
        const taskList = task.completed ? completedTasksList : pendingTasksList;
        const listItem = document.createElement('li');
        listItem.classList.toggle('completed', task.completed);
        
        const taskContent = document.createElement('div');
        taskContent.innerText = `${task.title} - ${task.description}`;
        listItem.appendChild(taskContent);

        const completeButton = document.createElement('button');
        completeButton.innerText = task.completed ? 'Unmark' : 'Complete';
        completeButton.className = 'complete-btn';
        completeButton.onclick = function() {
            task.completed = !task.completed;
            updateTaskList();
        };
        listItem.appendChild(completeButton);

        const editButton = document.createElement('button');
        editButton.innerText = 'Edit';
        editButton.className = 'edit-btn';
        editButton.onclick = function() {
            editTask(task.id);
        };
        listItem.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.className = 'delete-btn';
        deleteButton.onclick = function() {
            deleteTask(task.id);
        };
        listItem.appendChild(deleteButton);

        taskList.appendChild(listItem);
    });
}

function editTask(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        document.getElementById('title').value = task.title;
        document.getElementById('description').value = task.description;
        deleteTask(id);
    }
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    updateTaskList();
}
