document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const clearAllBtn = document.getElementById('clear-all-btn');
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
    }
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
    loadTasks();
    addTaskBtn.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            taskInput.value = '';
        }
    });
    function addTask(taskText) {
        const task = {
            id: Date.now(),
            text: taskText,
            completed: false
        };

        const tasks = getTasks();
        tasks.push(task);
        saveTasks(tasks);

        displayTask(task);
    }
    function displayTask(task) {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
        taskItem.dataset.id = task.id;

        const taskTextSpan = document.createElement('span');
        taskTextSpan.textContent = task.text;

        const toggleBtn = document.createElement('button');
        toggleBtn.classList.add('toggle-btn');
        toggleBtn.textContent = task.completed ? 'Unmark' : 'Mark';
        toggleBtn.addEventListener('click', function() {
            toggleTask(task, taskTextSpan);
        });

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('remove-btn');
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', function() {
            removeTask(task, taskItem);
        });

        taskItem.appendChild(taskTextSpan);
        taskItem.appendChild(toggleBtn);
        taskItem.appendChild(removeBtn);

        if (task.completed) {
            taskTextSpan.classList.add('completed');
        }

        taskList.appendChild(taskItem);
    }
    function toggleTask(task, taskTextSpan) {
        task.completed = !task.completed;
        saveTasks(getTasks());

        if (task.completed) {
            taskTextSpan.classList.add('completed');
            taskTextSpan.parentNode.querySelector('.toggle-btn').textContent = 'Unmark';
        } else {
            taskTextSpan.classList.remove('completed');
            taskTextSpan.parentNode.querySelector('.toggle-btn').textContent = 'Mark';
        }
    }
    function removeTask(task, taskItem) {
        const tasks = getTasks();
        const updatedTasks = removeTaskById(tasks, task.id);
        saveTasks(updatedTasks);
        taskItem.remove();
    }
    clearAllBtn.addEventListener('click', function() {
        localStorage.removeItem('tasks');
        taskList.innerHTML = '';
    });
    function loadTasks() {
        const tasks = getTasks();
        tasks.forEach(task => displayTask(task));
    }
});
