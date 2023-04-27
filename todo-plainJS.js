let taskList = JSON.parse(localStorage.getItem('taskList')) ?? [];

window.addEventListener('DOMContentLoaded', () => {
    drawHTML(filterTasks());
    refreshCount();
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const content = task_content.value;

    if (content === '') {
        console.log('Input is empty');
    } else {
        createTask(content);
        createTaskHTML(content);
    }

    saveTaskList();
    refreshCount();
    task_content.value = '';
});

for (let item of filters.children) {
    item.addEventListener('click', () => {
        switch (item.id) {
            case 'filter_done':
                drawHTML(filterTasks('done'));
                refreshCount(filterTasks('done'));
                break;
            case 'filter_undone':
                drawHTML(filterTasks('undone'));
                refreshCount();
                break;
            default:
                drawHTML(filterTasks());
                refreshCount();
                break;
        }
    });
}

todo.addEventListener('click', (event) => {
    const index = Array.from(todo.children).indexOf(event.target);

    if (event.target.parentNode === todo) {
        event.target.classList.toggle('done');
        console.log('test');
        markTask(index);
        saveTaskList();
        refreshCount();
    }
});

todo.addEventListener('click', (event) => {
    const index = Array.from(todo.children).indexOf(event.target.parentNode);
    
    if (event.target.classList.contains('task-delete_button')){
        event.target.parentElement.remove();
        deleteTask(index);
        saveTaskList();
        refreshCount();
    }
});

function drawHTML(taskList) {
    while (todo.firstChild) {
        todo.removeChild(todo.firstChild);
    }

    taskList.forEach((item) => {
        createTaskHTML(item.content, item.isDone);
    });
}

function createTaskHTML(content, isDone = false) {
    const task = document.createElement('li');
    const classes = task.classList;
    task.textContent = content;
    classes.add('task');

    if (isDone) {
        classes.add('done');
    }

    todo.append(task);

    const doneIcon = document.createElement('span');
    doneIcon.classList.add('task-done_icon');
    task.prepend(doneIcon);

    const deleteButton = document.createElement('span');
    deleteButton.classList.add('task-delete_button');
    deleteButton.textContent = '\u00d7';
    task.append(deleteButton);
} 

function createTask(content) {
    let task = {
        content: content,
        isDone: false,
    }

    taskList.push(task);
    return task;
}

function filterTasks(filter) {
    switch (filter) {
        case 'done':
            return taskList.filter(item => item.isDone);
        case 'undone':
            return taskList.filter(item => !item.isDone);
        default:
            return taskList;
    }
}

function refreshCount(list = taskList) {
    let count = list.filter(item => !item.isDone).length;
    task_count.textContent = count;
}

function deleteTask(id) {
    try {
        taskList.splice(id, 1);
        saveTaskList();
    } catch {
        console.error('There is no task with these id.');
    }
}

function markTask(id) {
    let task = taskList[id];

    try {
        task.isDone = !task.isDone;
    } catch {
        console.error('There is no task with these id.');
    }
}

function saveTaskList() {
    localStorage.setItem('taskList', JSON.stringify(taskList));
}

// function clearTaskList() {
//     try {
//         localStorage.removeItem('taskList');
//     } catch {
//         console.error('There is no saved data.');
//     }
//     taskList = [];
// }