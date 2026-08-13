// // src/project.js
// export const Project = (name) => {
//   const todos = [];

//   const addTodo = (todo) => {
//     todos.push(todo);
//   };

//   const removeTodo = (index) => {
//     todos.splice(index, 1);
//   };

//   const getTodos = () => todos;

//   return { name, addTodo, removeTodo, getTodos };
// };

// src/project.js
export const Project = (name) => {
  const obj = { name, todos: [] };

  obj.addTodo = (todo) => { obj.todos.push(todo); };
  obj.removeTodo = (index) => { obj.todos.splice(index, 1); };
  obj.getTodos = () => obj.todos;

  return obj;
};