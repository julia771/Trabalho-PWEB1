const todoInput = document.getElementById('todo-input');
const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');
const editForm = document.getElementById('edit-form');
const editInput = document.getElementById('edit-input');
const cancelEditBtn = document.getElementById('cancel-edit-btn');
const filterSelect = document.getElementById('filter-select');
const searchInput = document.getElementById('search-input');
const eraseButton = document.getElementById('erase-button');

todoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const todoText = todoInput.value.trim();
    if (todoText !== '') {
        addTodoItem(todoText);
        todoInput.value = '';
    }
});

todoList.addEventListener('click', function(e) {
    if (e.target.classList.contains('edit-todo')) {
        const todo = e.target.closest('.todo');
        const todoText = todo.querySelector('h3').textContent;
        editInput.value = todoText;
        editForm.classList.remove('hide');
        todoList.dataset.editId = todo.dataset.id;
    }
});

cancelEditBtn.addEventListener('click', function() {
    editForm.classList.add('hide');
});

editForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const updatedText = editInput.value.trim();
    const todoId = todoList.dataset.editId;
    if (updatedText !== '') {
        updateTodoItem(todoId, updatedText);
        editForm.classList.add('hide');
    }
});

todoList.addEventListener('click', function(e) {
    if (e.target.classList.contains('remove-todo')) {
        const todo = e.target.closest('.todo');
        const todoId = todo.dataset.id;
        removeTodoItem(todoId);
    }
});

todoList.addEventListener('click', function(e) {
    if (e.target.classList.contains('finish-todo')) {
        const todo = e.target.closest('.todo');
        const todoId = todo.dataset.id;
        markAsDone(todoId);
    }
});

filterSelect.addEventListener('change', function() {
    const filterValue = filterSelect.value;
    filterTasks(filterValue);
});

searchInput.addEventListener('keyup', function() {
    const searchText = searchInput.value.trim().toLowerCase();
    searchTasks(searchText);
});

eraseButton.addEventListener('click', function() {
    searchInput.value = '';
    searchTasks('');
});


function addTodoItem(todoText) {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo');
    todoItem.innerHTML = `
        <h3>${todoText}</h3>
        <button class="finish-todo"><i class="fa-solid fa-check"></i></button>
        <button class="edit-todo"><i class="fa-solid fa-pen"></i></button>
        <button class="remove-todo"><i class="fa-solid fa-xmark"></i></button>
    `;
    todoList.appendChild(todoItem);
}


function updateTodoItem(todoId, updatedText) {
    const todoItem = document.querySelector(`.todo[data-id="${todoId}"]`);
    if (todoItem) {
        todoItem.querySelector('h3').textContent = updatedText;
    }
}


function removeTodoItem(todoId) {
    const todoItem = document.querySelector(`.todo[data-id="${todoId}"]`);
    if (todoItem) {
        todoItem.remove();
    }
}


function markAsDone(todoId) {
    const todoItem = document.querySelector(`.todo[data-id="${todoId}"]`);
    if (todoItem) {
        todoItem.classList.toggle('done');
    }
}


function filterTasks(filterValue) {
    const todos = todoList.querySelectorAll('.todo');
    todos.forEach(todo => {
        const isDone = todo.classList.contains('done');
        switch (filterValue) {
            case 'done':
                todo.style.display = isDone ? 'flex' : 'none';
                break;
            case 'todo':
                todo.style.display = isDone ? 'none' : 'flex';
                break;
            default:
                todo.style.display = 'flex';
        }
    });
}

function searchTasks(searchText) {
    const todos = todoList.querySelectorAll('.todo');
    todos.forEach(todo => {
        const todoText = todo.querySelector('h3').textContent.toLowerCase();
        if (todoText.includes(searchText)) {
            todo.style.display = 'flex';
        } else {
            todo.style.display = 'none';
        }
    });
}

