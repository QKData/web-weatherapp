// // src/appController.js
// import { Project } from './project.js';

// export const AppController = (() => {
//   const projects = [];
  
//   // Create a default project immediately
//   const defaultProject = Project("Inbox");
//   projects.push(defaultProject);

//   const addProject = (name) => {
//     const newProject = Project(name);
//     projects.push(newProject);
//   };

//   const getProjects = () => projects;

//   return { addProject, getProjects };
// })();

// src/appController.js
import { Project } from './project.js';
import { Todo } from './todo.js'; // You will need the Todo factory here now

export const AppController = (() => {
  let projects = [];

  const addProject = (name) => {
    projects.push(Project(name));
  };

  const removeProject = (index) => {
    // Prevent deleting the default Inbox (index 0)
    if (index === 0) return; 
    projects.splice(index, 1);
  };

  const getProjects = () => projects;

  // --- NEW LOCAL STORAGE LOGIC ---

  const save = () => {
    // Converts our public properties to a string and saves to the browser
    localStorage.setItem('odin-todos', JSON.stringify(projects));
  };

  const load = () => {
    const rawData = JSON.parse(localStorage.getItem('odin-todos'));
    
    if (rawData) {
      // RE-HYDRATION: The data from localStorage is "dead" (no methods).
      // We must map over it and run it back through our Factories.
      projects = rawData.map(rawProj => {
        const restoredProject = Project(rawProj.name);
        
        rawProj.todos.forEach(rawTodo => {
          const restoredTodo = Todo(
            rawTodo.title, 
            rawTodo.description, 
            rawTodo.dueDate, 
            rawTodo.priority, 
            rawTodo.isCompleted // Pass in the saved status!
          );
          restoredProject.addTodo(restoredTodo);
        });
        
        return restoredProject;
      });
    } else {
      // If there's no data (first time visiting), create the default Inbox
      projects.push(Project("Inbox"));
    }
  };

  // Don't forget to expose save and load!
  return { addProject, getProjects, save, load, removeProject };
})();