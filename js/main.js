/**
 * Created by Marina on 21.11.2016.
 */

window.addEventListener('load', function () {
    show();

    function getTasks() {
        var tasks = new Array;
        var tasksJson = localStorage.getItem('todo');
        console.log(tasksJson);
        if (tasksJson != null) {
            tasks = JSON.parse(tasksJson);
        }
        return tasks;
    }

    function show() {
        var tasks = getTasks();
        var taskList = document.getElementById("todoList");
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
        for (var i = 0; i < tasks.length; i++) {
            var li = document.createElement('li');
            li.id = i;
            li.innerHTML = '<p>' + tasks[i] + '</p><button class="button-delete">✕</button><button class="button-edit">edit</button>';
            li.addEventListener('click', checkTask);
            document.getElementById('todoList').appendChild(li);
        }
        var del = document.getElementsByClassName('button-delete');
        var edit = document.getElementsByClassName('button-edit');
        for (i = 0; i < del.length; i++) {
            del[i].addEventListener('click', deleteTask);
            edit[i].addEventListener('click', openEdit);
        }
        countTasks();
    }


    document.getElementById('addTask').addEventListener('click', toDoList);
    document.getElementById('todoInput').addEventListener('keyup', function (event) {
        //check to see if the enter key was pressed
        if (event.which === 13) {
            //if so, run the addTask function
            toDoList();
        }
    });
    function toDoList() {
        var todo = getTasks();
        var item = document.getElementById('todoInput').value;
        if (item) {
            todo.push(item);
        }
        localStorage.setItem('todo', JSON.stringify(todo));
        console.log(localStorage);
        document.getElementById("todoInput").value = "";
        show();
        countTasks();
    }

    function openEdit() {
        var tasks = getTasks();
        var div = document.createElement('div');
        var mainDiv = document.createElement('div');
        var input = document.createElement('input');
        var buttonSave = document.createElement('button');
        var buttonCancel = document.createElement('button');
        var li = event.target.parentElement;
        var id = li.getAttribute('id');
        div.id = 'edit';
        mainDiv.className = 'edit';
        buttonSave.textContent = 'save';
        buttonCancel.textContent = 'cancel';
        mainDiv.appendChild(div);
        div.appendChild(input);
        div.appendChild(buttonSave);
        div.appendChild(buttonCancel);
        document.body.appendChild(mainDiv);
        input.value = li.getElementsByTagName('p')[0].innerHTML;
        buttonCancel.addEventListener('click', function (event) {
            var div = event.target.parentNode;
            div = div.parentNode;
            div.parentNode.removeChild(div);
        });
        buttonSave.addEventListener('click', function (event) {
            var div = event.target.parentNode;
            var input = div.querySelector('input');
            tasks[id] = input.value;
            localStorage.setItem('todo', JSON.stringify(tasks));
            div = div.parentNode;
            console.log(tasks);
            div.parentNode.removeChild(div);
            show();
        });

    }

    function deleteTask() {
        var id = this.parentNode.getAttribute('id');
        var tasks = getTasks();
        tasks.splice(id, 1);
        localStorage.setItem('todo', JSON.stringify(tasks));
        show();
        countTasks();
    }

    function checkTask(ev) {
        if (ev.target.tagName == 'P') {
            ev.target.classList.toggle('checked');
            countTasks()
        }
    }

    function countTasks() {
        var allTasks = document.getElementsByTagName('li');
        var checkedTasks = document.getElementsByClassName('checked');
        var count = checkedTasks.length;
        document.getElementById("countOfDone").textContent = count;
        document.getElementById("countOfAll").textContent = allTasks.length;
        document.getElementById("countOfNotDone").textContent = allTasks.length - count;
    }
});