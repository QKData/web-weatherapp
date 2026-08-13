// // src/todo.js
// export const Todo = (title, description, dueDate, priority) => {
//   let isCompleted = false;

//   const toggleComplete = () => {
//     isCompleted = !isCompleted;
//   };

//   const getStatus = () => isCompleted;

//   // Return the public methods and properties
//   return { title, description, dueDate, priority, toggleComplete, getStatus };
// };

// src/todo.js
export const Todo = (title, description, dueDate, priority, completed = false) => {
  // Build the object explicitly so properties are public for JSON
  const obj = { title, description, dueDate, priority, isCompleted: completed };

  // Attach methods directly to the object
  obj.toggleComplete = () => { obj.isCompleted = !obj.isCompleted; };
  obj.getStatus = () => obj.isCompleted;

  return obj;
};