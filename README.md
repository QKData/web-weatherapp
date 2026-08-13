# Odin Todo List 📝

A dynamic, modular, and persistent Todo List application built as part of [The Odin Project's](https://www.theodinproject.com) Full Stack JavaScript curriculum. 

This project was a major milestone that focused on separating application logic from DOM manipulation, utilizing Object-Oriented Programming principles, and managing project dependencies with npm and Webpack.

## ✨ Features

* **Project Management:** Group tasks into custom-named projects.
* **Task Management:** Create tasks with a title, description, due date, and priority level.
* **Data Persistence:** Automatically saves all projects and tasks to the browser's `localStorage` so data is never lost on refresh.
* **Dynamic UI:** Fluidly switch between projects to view their specific tasks.
* **Task Status:** Mark tasks as completed (✅) or pending (⏳) with visual CSS updates.
* **Modern Design:** Built with a clean, responsive layout using Flexbox, CSS variables, and modern fonts.

## 🛠️ Built With

* **Vanilla JavaScript (ES6+)**
* **HTML5 & CSS3**
* **Webpack:** Used to bundle JavaScript modules and CSS assets.
* **npm:** Package manager for Webpack and loaders (`css-loader`, `style-loader`, `html-webpack-plugin`).

## 🧠 What I Learned

Building this project solidified my understanding of several core JavaScript and architecture concepts:

* **Separation of Concerns:** Keeping the business logic (data creation and storage) entirely separate from the DOM manipulation (rendering UI).
* **Factory Functions & The Module Pattern (IIFE):** Using closures to keep variables private and organizing code into reusable, encapsulated modules rather than polluting the global namespace.
* **Webpack Configuration:** Learning how to set up `webpack.config.js`, inject HTML templates automatically, and load CSS styles directly through JavaScript imports.
* **Event Delegation:** Attaching a single event listener to a parent container to handle clicks for dynamically generated buttons (like dynamically created "Delete" or "Complete" buttons).
* **JSON & Local Storage:** Overcoming the challenge of data "hydration" — converting public object properties to JSON strings for storage, and running them back through Factory functions upon loading to restore their private methods.

## 🚀 Getting Started

To run this project locally on your machine, follow these steps:

### Prerequisites
You need [Node.js](https://nodejs.org/) and `npm` installed on your machine.

## 🤝 Acknowledgments
The Odin Project for the fantastic curriculum and project prompt.
