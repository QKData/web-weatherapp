// src/index.js
import { Todo } from './todo.js';
import { AppController } from './appController.js';
import { DOM } from './dom.js';
import './style.css';

// // TEMPORARY FOR TESTING: Expose these to the global window object
// window.Todo = Todo;
// window.AppController = AppController;
// window.DOM = DOM;

// // 1. Get the list of projects (currently just "Inbox")
// const myProjects = AppController.getProjects();
// const inbox = myProjects[0];

// // 2. Create a new Todo
// const task1 = Todo("Finish Odin Project", "Complete the JS path", "2026-05-01", "High");
// const task2 = Todo("Buy Groceries", "Milk, Eggs, Bread", "2026-04-20", "Low");

// // 3. Add Todos to the Inbox project
// activeProject.addTodo(task1);
// activeProject.addTodo(task2);

// // 4. Create a brand new project
// AppController.addProject("Fitness");
// const fitnessProject = myProjects[1];
// const workoutTask = Todo("Go for a run", "5 kilometers", "Today", "Medium");
// fitnessProject.addTodo(workoutTask);

// // 5. Test to see if it worked!
// console.log(AppController.getProjects());

// // Setup some dummy data so we have something to draw
// const myProjects = AppController.getProjects();
// const inbox = myProjects[0];
// const task1 = Todo("Finish Odin Project", "Complete the JS path", "2026-05-01", "High");
// inbox.addTodo(task1);

// // Draw the UI!
// DOM.renderProjects(myProjects);
// DOM.renderTodos(inbox);

// Tell the controller to load from localStorage first!
AppController.load();

// Get all projects and set the initial active project
const projects = AppController.getProjects();
let activeProject = projects[0]; // Defaults to "Inbox"

// // 2. Create a new Todo
// const task1 = Todo("Finish Odin Project", "Complete the JS path", "2026-05-01", "High");
// const task2 = Todo("Buy Groceries", "Milk, Eggs, Bread", "2026-04-20", "Low");

// // 3. Add Todos to the Inbox project
// activeProject.addTodo(task1);
// activeProject.addTodo(task2);

// Draw the initial UI
DOM.renderProjects(projects);
DOM.renderTodos(activeProject);

// Add this to src/index.js
const todoForm = document.querySelector('#new-todo-form');

todoForm.addEventListener('submit', (e) => {
  // 1. Prevent the browser from refreshing the page
  e.preventDefault();

  // 2. Grab the values from the input fields
  const title = document.querySelector('#todo-title').value;
  const desc = document.querySelector('#todo-desc').value;
  const date = document.querySelector('#todo-date').value;
  const priority = document.querySelector('#todo-priority').value;

  // 3. Create the new Todo object
  const newTask = Todo(title, desc, date, priority);

  // 4. Add it to the currently active project
  activeProject.addTodo(newTask);
  AppController.save();

  // 5. Tell the DOM to redraw the tasks for this project
  DOM.renderTodos(activeProject);

  // 6. Clear the form inputs for the next task
  todoForm.reset();
});

// Add this to src/index.js
const projectListElement = document.querySelector('#project-list');

// projectListElement.addEventListener('click', (e) => {
//   // Check if the thing we clicked has the class 'project-item'
//   if (e.target.classList.contains('project-item')) {
    
//     // 1. Get the index we stored in the HTML dataset (e.g., data-index="1")
//     const projectIndex = e.target.dataset.index;
    
//     // 2. Update our activeProject variable
//     activeProject = projects[projectIndex];
    
//     // 3. Redraw the Todo screen to show the tasks for this new project
//     DOM.renderTodos(activeProject);
//   }
// });

// --- UPDATED SIDEBAR CLICK LISTENER ---
projectListElement.addEventListener('click', (e) => {
  // Find the closest project item
  const projectItem = e.target.closest('.project-item');
  if (!projectItem) return;

  const projectIndex = Number(projectItem.dataset.index);

  // If they clicked the DELETE button
  if (e.target.classList.contains('delete-project-btn')) {
    AppController.removeProject(projectIndex);
    AppController.save();

    // Safety: If they deleted the project they were currently looking at, switch back to Inbox
    if (activeProject === AppController.getProjects()[projectIndex]) {
      activeProject = AppController.getProjects()[0];
    }

    // Redraw both the sidebar and the main task area
    DOM.renderProjects(AppController.getProjects());
    DOM.renderTodos(activeProject);
    return; // Stop the function here so it doesn't try to select the deleted project
  }

  // If they clicked anywhere else on the project (to view it)
  activeProject = AppController.getProjects()[projectIndex];
  DOM.renderTodos(activeProject);
});

// Grab the main container where all todos are drawn
const todoContainer = document.querySelector('#todo-container');

todoContainer.addEventListener('click', (e) => {
  // 1. Find the closest parent element with the class 'todo-card'
  const card = e.target.closest('.todo-card');
  
  // If we didn't click inside a card, do nothing
  if (!card) return; 

  // 2. Grab the array index we saved in the dataset
  const index = card.dataset.index;

  // 3. Handle the DELETE button click
  if (e.target.classList.contains('delete-btn')) {
    activeProject.removeTodo(index);  // Remove from the array
    AppController.save();
    DOM.renderTodos(activeProject);   // Redraw the screen
  }

  // 4. Handle the TOGGLE STATUS button click
  if (e.target.classList.contains('toggle-btn')) {
    const todos = activeProject.getTodos(); // Get the current project's array
    todos[index].toggleComplete();          // Flip the boolean (true/false)
    AppController.save();
    DOM.renderTodos(activeProject);         // Redraw the screen
  }
});

// --- NEW PROJECT FORM LISTENER ---
const projectForm = document.querySelector('#new-project-form');

projectForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const projectNameInput = document.querySelector('#project-name');
  
  // Add project, save, and re-render
  AppController.addProject(projectNameInput.value);
  AppController.save();
  DOM.renderProjects(AppController.getProjects());
  
  projectForm.reset();
});