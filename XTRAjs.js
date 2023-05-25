// Kolla om det finns några aktiviteter sparade i local storage
const storedTodos = localStorage.getItem('todos');
const todos = storedTodos ? JSON.parse(storedTodos) : [];

// Funktion för att spara aktiviteter i local storage
const saveTodos = () => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

// Funktion för att rendera aktiviteter
const renderTodos = () => {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';

  todos.forEach((todo, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${todo.activity} (Prioritet: ${todo.priority}, Datum: ${todo.date})`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Ta bort';
    deleteButton.addEventListener('click', () => {
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    });

    listItem.appendChild(deleteButton);
    todoList.appendChild(listItem);
  });
};

// Lägg till en händelselyssnare på formuläret
const form = document.getElementById('todo-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const activityInput = document.getElementById('activity');
  const priorityInput = document.getElementById('priority');
  const dateInput = document.getElementById('date');

  const todo = {
    activity: activityInput.value,
    priority: priorityInput.value,
    date: dateInput.value
  };

  todos.push(todo);
  saveTodos();
  renderTodos();

  activityInput.value = '';
  priorityInput.selectedIndex = 1;
  dateInput.value = '';
});

// Initial render
renderTodos();
