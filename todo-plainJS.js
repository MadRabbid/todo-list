
let taskList = JSON.parse(localStorage.getItem('taskList')) ?? [];

window.addEventListener('load', () => {
    refreshTasks(taskList);
    markTask();
});

const createTask = () => {
    let task = {
        content: taskContent.value,
        isDone: false,
    }
    return task;
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (taskContent.value === '') {
        console.log('no task there is <(°.°)>');;
    } else {
        taskList.push(createTask());
        saveTaskList();
        taskContent.value = '';
    }
});



function refreshTasks(list) {
    while (todo.firstChild) {
        todo.removeChild(todo.firstChild);
    }
    list.forEach((item) => {
        let task = document.createElement('li');
        let classes = task.classList;
        task.textContent = item.content;
        classes.add('task');
        if (item.isDone) {
            classes.toggle('done');
        }
        todo.append(task);
        let count = list.filter(item => !item.isDone).length;
        taskCount.textContent = count;
    });
}

function showTasks(filter) {
    switch (filter) {
        case 'done':
            return refreshTasks(taskList.filter(item => item.isDone));
        case 'undone':
            return refreshTasks(taskList.filter(item => !item.isDone));
        default:
            return refreshTasks(taskList);
    }
}

function deleteTask(id) {
    try {
        taskList.splice(id, 1);
        saveTaskList();
    } catch {
        console.error('There is no task with these id.');
    }
}


//WIP
function markTask() {
    let task = taskList[id];
    for (const taskEntry of todo.children) {
        taskEntry.addEventListener('click', () => {
            try {
                taskEntry.classList.toggle('done');
                task.isDone = !task.isDone;
                saveTaskList();
            } catch {
                console.log('task marking error');
            }
        });
    }
    // 
    // try {

    // } catch {
    //     console.error('There is no task with these id.');
    // }

}

function saveTaskList() {
    localStorage.setItem('taskList', JSON.stringify(taskList));
}

function clearTaskList() {
    try {
        localStorage.removeItem('taskList');
    } catch {
        console.error('There is no saved data.');
    }
    taskList = [];
}

// window.todo = {
//     createTask,
//     showTasks,
//     deleteTask,
//     markTask,
//     clearTaskList,
// }
