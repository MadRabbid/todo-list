(() => {
    let taskList = JSON.parse(localStorage.getItem('taskList')) ?? [];

    const createTask = (content) => {
        let task = {
            content: content,
            isDone: false,
        }
        taskList.push(task);
        saveTaskList();
    }

    function logTasks(list) {
        list.forEach((item, index) => {
            const markTask = item.isDone ? 'x' : ' ';
            const text = `[${markTask}] ${index}. ${item.content}`;
            console.log(text);
        });
    }

    function showTasks(filter) {
        switch (filter) {
            case 'done':
                return logTasks(taskList.filter(item => item.isDone));
            case 'undone':
                return logTasks(taskList.filter(item => !item.isDone));
            default:
                return logTasks(taskList);
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

    function markTask(id) {
        let task = taskList[id];
        try {
            task.isDone = !task.isDone;
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
        createTask,
        showTasks,
        deleteTask,
        markTask,
        clearTaskList,
    }
})();