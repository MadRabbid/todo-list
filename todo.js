let taskList;

document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem('taskList') === null) {
        taskList = [];
    } else {
        taskList = JSON.parse(localStorage.getItem('taskList'));
    }
});

function createTask(taskContent) {
    let task = new Object();
    task.content = taskContent;
    task.done = false;
    taskList.push(task);
    saveTaskList();
}

function showTasks(filter) {
    if (filter === undefined) {
        for (let i = 0; i < taskList.length; i++) {
            if (!taskList[i].done) {
                console.log(`[ ] ${i}. ${taskList[i].content}`);
            } else {
                console.log(`[x] ${i}. ${taskList[i].content}`);
            }
        }
    } else if (filter === 'done') {
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].done) {
                console.log(`[x] ${i}. ${taskList[i].content}`);
            }
        }
    } else if (filter === 'undone') {
        for (let i = 0; i < taskList.length; i++) {
            if (!taskList[i].done) {
                console.log(`[ ] ${i}. ${taskList[i].content}`);
            }
        }
    } else {
        showTasks();
    }

}

function deleteTask(taskId) {
    try {
        taskList.splice(taskId, 1);
        showTasks();
        saveTaskList();
    } catch {
        console.error('There is no task with these id.');
        showTasks();
    }

}

function markTask(taskId, removeTask = false) {
    try {
        if (!taskList[taskId].done) {
            taskList[taskId].done = true;
        } else {
            taskList[taskId].done = false;
        }


        if (removeTask === true) {
            deleteTask(taskId);
            saveTaskList();
        } else {
            showTasks();
            saveTaskList();
        }
    } catch {
        console.error('There is no task with these id.');
        showTasks();
    }
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