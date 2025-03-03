function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function removeTaskById(tasks, id) {
    return tasks.filter(task => task.id !== id);
}
