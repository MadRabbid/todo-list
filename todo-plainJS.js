let taskList = JSON.parse(localStorage.getItem('taskList')) ?? [];

window.addEventListener('DOMContentLoaded', () => {
    drawHTML(filterTasks());
    refreshCount();
});

const todo_form = document.getElementById('form');
todo_form.addEventListener('submit', (event) => {
    event.preventDefault();
    const taskContent = document.getElementById('task_content');
    const content = taskContent.value;

    if (content === '') {
        console.log('Input is empty');
    } else {
        createTaskHTML(createTask(content));
    }

    saveTaskList();
    refreshCount();
    taskContent.value = '';
});

const filterAll = document.getElementById('filter_all');
filterAll.addEventListener('click', () => {
    drawHTML(filterTasks());
    refreshCount();
    //                 
});

const filterDone = document.getElementById('filter_done');
filterDone.addEventListener('click', () => {
    drawHTML(filterTasks('done'));
    refreshCount(filterTasks('done'));
});

const filterUndone = document.getElementById('filter_done');
filterDone.addEventListener('click', () => {
    drawHTML(filterTasks('undone'));
    refreshCount(filterTasks('undone'));
});

function drawHTML(taskList) {
    const todo = document.getElementById('todo');
    todo.innerHTML = '';

    taskList.forEach((item) => {
        createTaskHTML(item.content, item.isDone);
    });
}

function createTaskHTML(content, isDone = false) {
    const todoList = document.getElementById('todo');
    const task = document.createElement('li');
    const classes = task.classList;
    classes.add('task');

    if (isDone) {
        classes.add('done');
    }

    todoList.append(task);

    const taskButton = document.createElement('button');
    taskButton.type = 'button';
    taskButton.classList.add('task-button_mark');
    taskButton.addEventListener('click', (event) => {
        const index = Array.from(todoList.children).indexOf(event.target.parentElement.parentElement);
        task.classList.toggle('done');
        markTask(index);
        saveTaskList();
        refreshCount();
    });
    task.append(taskButton);

    const doneIcon = document.createElement('span');
    doneIcon.classList.add('task-done_icon');
    taskButton.append(doneIcon);

    const taskContent = document.createElement('span');
    taskContent.textContent = content;
    taskContent.classList.add('task-content')
    taskButton.append(taskContent);

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.classList.add('task-delete_button');
    deleteButton.textContent = '\u00d7';
    deleteButton.addEventListener('click', (event) => {
        const index = Array.from(todoList.children).indexOf(event.target.parentElement);
        event.target.parentElement.remove();
        deleteTask(index);
        saveTaskList();
        refreshCount();
    });
    task.append(deleteButton);
}

// stupidest id generation system of all times. don't know how to do it better

function createTask(content) {
    let id = 0;
    if (taskList.length !== 0) {
        id = Math.max(...taskList.map(i => i.id)) + 1;
    }

    const task = {
        content: content,
        isDone: false,
        id: id,
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
    const count = list.filter(item => !item.isDone).length;
    const taskCount = document.getElementById('task_count');
    taskCount.textContent = count;
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