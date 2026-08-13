// src/dom.js

export const DOM = (() => {
  // ==========================================
  // 1. PRIVATE VARIABLES (HTML Element Selectors)
  // ==========================================
  const projectListElement = document.querySelector('#project-list');
  const todoContainerElement = document.querySelector('#todo-container');
  const currentProjectTitle = document.querySelector('#current-project-title');

  // ==========================================
  // 2. PRIVATE FUNCTIONS (Rendering Logic)
  // ==========================================

  // Clears and redraws the project list in the sidebar
  const renderProjects = (projects) => {
    projectListElement.innerHTML = '';

    projects.forEach((project, index) => {
      const li = document.createElement('li');
      li.classList.add('project-item');
      li.dataset.index = index; 
      
      // Add the project name
      li.innerHTML = `<span class="project-name-text">${project.name}</span>`;

      // NEW: Add a delete button ONLY if it is not the Inbox (index 0)
      if (index !== 0) {
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
        deleteBtn.classList.add('delete-project-btn');
        li.appendChild(deleteBtn);
      }
      
      projectListElement.appendChild(li);
    });
  };

  // Clears and redraws the todo cards for whatever project is currently active
  const renderTodos = (project) => {
    // Update the header title
    currentProjectTitle.textContent = project.name;
    
    // Clear the main container
    todoContainerElement.innerHTML = '';

    // Get the array of todos from the project object
    const todos = project.getTodos();
    
    // Optional: Show a message if there are no tasks
    if (todos.length === 0) {
      todoContainerElement.innerHTML = '<p class="empty-message">No tasks yet. Enjoy your day!</p>';
      return;
    }

    // // Loop through the tasks and build the HTML cards
    // todos.forEach((todo, index) => {
    //   const todoCard = document.createElement('div');
    //   todoCard.classList.add('todo-card');
      
    //   // Store the array index so we know which todo to delete/edit later
    //   todoCard.dataset.index = index; 
      
    //   todoCard.innerHTML = `
    //     <h3>${todo.title}</h3>
    //     <p class="todo-desc">${todo.description}</p>
    //     <div class="todo-details">
    //       <span class="todo-date">📅 ${todo.dueDate}</span>
    //       <span class="todo-priority priority-${todo.priority.toLowerCase()}">${todo.priority}</span>
    //     </div>
    //   `;
      
    //   todoContainerElement.appendChild(todoCard);
    // });

    // Loop through the tasks and build the HTML cards
    todos.forEach((todo, index) => {
      const todoCard = document.createElement('div');
      todoCard.classList.add('todo-card');
      
      // Store the array index so we know which todo to delete/edit later
      todoCard.dataset.index = index; 

      // 1. Check if the task is completed
      const isDone = todo.getStatus();
      
      // 2. Add a special class if it is done (for CSS styling like line-through)
      if (isDone) {
        todoCard.classList.add('completed');
      }
      
      // 3. Add the toggle and delete buttons to the innerHTML
      todoCard.innerHTML = `
        <h3>${todo.title}</h3>
        <p class="todo-desc">${todo.description}</p>
        <div class="todo-details">
          <span class="todo-date">📅 ${todo.dueDate}</span>
          <span class="todo-priority priority-${todo.priority.toLowerCase()}">${todo.priority}</span>
          <span class="todo-status">Status: ${isDone ? "✅ Done" : "⏳ Pending"}</span>
        </div>
        <div class="todo-actions">
          <button class="toggle-btn">${isDone ? "Undo" : "Complete"}</button>
          <button class="delete-btn">Delete</button>
        </div>
      `;
      
      todoContainerElement.appendChild(todoCard);
    });
  };

  // ==========================================
  // 3. PUBLIC API (The Menu)
  // ==========================================
  return { 
    renderProjects, 
    renderTodos 
  };

})();