(() => {
    let taskList = JSON.parse(localStorage.getItem('taskList')) ?? [];

    const createTask = (content) => {
        let task = {
            content: content,
            done: false,
        }
        taskList.push(task);
        saveTaskList();
    }

    function showTasks(filter) {
        for (let i = 0; i < taskList.length; i++) {
            let text = `${i}. ${taskList[i].content}`;
            let listItem = taskList[i].done ? '[x] ' + text : '[ ] ' + text;
            if (filter === undefined) {
                console.log(listItem);
            } else if (filter === 'done') {
                if (taskList[i].done) {
                    console.log(listItem);
                }
            } else if (filter === 'undone') {
                if (!taskList[i].done) {
                    console.log(listItem);
                }
            }
        }
        saveTaskList();
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
        let taskStatus = taskList[id].done;
        try {
            taskStatus ?
                taskStatus = false :
                taskStatus = true;
            saveTaskList();
        } catch {
            console.error('There is no task with these id.');
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

    window.todo = {
        createTask: createTask,
        showTasks: showTasks,
        deleteTask: deleteTask,
        markTask: markTask,
        clearTaskList: clearTaskList,
    }
})();