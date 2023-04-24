let taskList = JSON.parse(localStorage.getItem('taskList')) ?? [];

window.addEventListener('DOMContentLoaded', () => {
    drawHTML(showTasks());
});

form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (taskContent.value === '') {
        console.log('Input is empty');
    } else {
        createTask(taskContent.value);
    }
    drawHTML(showTasks());
    saveTaskList();
    taskContent.value = '';
}
);

for (let item of filters.children) {
    item.addEventListener('click', () => {
        let classes = item.classList;

        for (let i of filters.children) {
            i.classList.remove('selected');
        }

        switch (item.id) {
            case 'filterDone':
                classes.add('selected');
                drawHTML(showTasks('done'));
                break;
            case 'filterUndone':
                classes.add('selected');
                drawHTML(showTasks('undone'));
                break;
            default:
                classes.add('selected');
                drawHTML(showTasks());
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

function showTasks(filter) {
    switch (filter) {
        case 'done':
            return taskList.filter(item => item.isDone);
        case 'undone':
            return taskList.filter(item => !item.isDone);
        default:
            return taskList;
    }
}

function drawHTML(taskList) {
    while (todo.firstChild) {
        todo.removeChild(todo.firstChild);
    }

    taskList.forEach((item) => {
        let task = document.createElement('li');
        let classes = task.classList;
        task.textContent = item.content;
        classes.add('task');

        if (item.isDone) {
            classes.toggle('done');
        }
        todo.append(task);

        const doneIcon = document.createElement('span');
        doneIcon.classList.add('doneIcon');
        task.prepend(doneIcon);

        const deleteButton = document.createElement('span');
        deleteButton.classList.add('deleteButton');
        deleteButton.textContent = '\u00d7';
        task.append(deleteButton);
    });

    for (let item of todo.children) {
        const index = Array.from(todo.children).indexOf(item);

        item.addEventListener('click', () => {
            markTask(index);
            saveTaskList();
            drawHTML(showTasks());
        });
    }

    const buttons = document.querySelectorAll('.task > .deleteButton');

    buttons.forEach((item) => {
        item.addEventListener('click', (event) => {
            event.stopPropagation();
            deleteTask(Array.from(todo.children).indexOf(item.parentNode));
            drawHTML(showTasks());
        });
    });

    let count = taskList.filter(item => !item.isDone).length;
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

// function clearTaskList() {
//     try {
//         localStorage.removeItem('taskList');
//     } catch {
//         console.error('There is no saved data.');
//     }
//     taskList = [];
// }