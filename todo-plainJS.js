let taskList = JSON.parse(localStorage.getItem('taskList')) ?? [];

window.addEventListener('DOMContentLoaded', () => {
    drawHTML(filterTasks());
    refreshCount();
});

form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (task_content.value === '') {
        console.log('Input is empty');
    } else {
        createTask(task_content.value);
    }
    
    saveTaskList();
    refreshCount();
    task_content.value = '';
});

for (let item of filters.children) {
    item.addEventListener('click', () => {
        let classes = item.classList;

        for (let i of filters.children) {
            i.classList.remove('selected');
        }
        refreshCount();
        switch (item.id) {
            case 'filter_done':
                classes.add('selected');
                drawHTML(filterTasks('done'));
                break;
            case 'filter_undone':
                classes.add('selected');
                drawHTML(filterTasks('undone'));
                break;
            default:
                classes.add('selected');
                drawHTML(filterTasks());
                break;
        }
    });
}

const createTask = (content) => {
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

//Question 2. The block of code below isn't working. But on the line 110 exactly the same block of code is working fine.

// for (let item of todo.children) {
//     const index = Array.from(todo.children).indexOf(item);

//     item.addEventListener('click', () => {
//         item.classList.toggle('done');
//         markTask(index);
//         saveTaskList();
//     });
// }

function drawHTML(taskList) { //аргумент - список, надо переделать, чтоб считать.
    while (todo.firstChild) {
        todo.removeChild(todo.firstChild);
    }

    taskList.forEach((item) => {
        const task = document.createElement('li');
        const classes = task.classList;
        task.textContent = item.content;
        classes.add('task');

        if (item.isDone) {
            classes.add('done');
        }
        todo.append(task);

        const doneIcon = document.createElement('span');
        doneIcon.classList.add('done-icon');
        task.prepend(doneIcon);

        const deleteButton = document.createElement('span');
        deleteButton.classList.add('delete-button');
        deleteButton.textContent = '\u00d7';
        task.append(deleteButton);
    });

    for (let item of todo.children) {
        const index = Array.from(todo.children).indexOf(item);

        item.addEventListener('click', () => {
            item.classList.toggle('done');
            markTask(index);
            refreshCount();
            saveTaskList();
        });
    }

    const buttons = document.querySelectorAll('.task > .delete-button');

    buttons.forEach((item) => {
        item.addEventListener('click', (event) => {
            const index = Array.from(todo.children).indexOf(item.parentNode);
            event.stopPropagation();
            item.parentElement.remove();
            deleteTask(index);
            refreshCount();
            saveTaskList();
        });
    });
}

function refreshCount() {
    let count = taskList.filter(item => !item.isDone).length;
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