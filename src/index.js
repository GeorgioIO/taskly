// IMPORTING CSS
import "../src/styles/animations.css";
import "../src/styles/style.css";

// // IMPORTING CLASSES
import "./classes/Project.js";
import "./classes/TodoItem.js";
import "./classes/DOMProjectBuilder.js";
import "./classes/DOMTodoBuilder.js";

import "./modules/loadAddProjectForm.js";
import "./modules/loadAddTaskButton.js";
import "./modules/loadAddTodoForm.js";
import "./modules/loadEditTodoForm.js";
import "./modules/loadProjects.js";
import "./modules/loadTodo.js";
import "./modules/utilityFunction.js";


import { loadProjects } from "./modules/loadProjects";
import { loadAddTodoForm , setCloseButton , setPriorityButtons , setUpAddTodoBtn} from "./modules/loadAddTodoForm";
import { loadAddProjectForm , setUpAddProjectBtn } from "./modules/loadAddProjectForm";
import  "../src/scripts/script.js" ;
import { loadTodo } from "./modules/loadTodo.js";

document.addEventListener("DOMContentLoaded" , () => {
    loadTodo("inbox");

    loadProjects();

    const addTaskButton = document.querySelector(".add-task-button");

    addTaskButton.addEventListener("click" , () => {
        loadAddTodoForm();

        const addForm = document.querySelector(".add-form");

        setCloseButton(addForm);
        setPriorityButtons(addForm);
        setUpAddTodoBtn();

        addForm.style.display = "flex";
        addForm.classList.remove("hideForm")
        addForm.classList.add("showForm");

    })
})

const showAddProjectFormBtn = document.querySelector("#addProjectBtn");
showAddProjectFormBtn.addEventListener("click" , () => {
    loadAddProjectForm();

    const addForm = document.querySelector(".add-form");

    setCloseButton(addForm);
    setPriorityButtons(addForm);
    setUpAddProjectBtn();

    addForm.style.display = "flex";
    addForm.classList.remove("hideForm")
    addForm.classList.add("showForm");
})

const todayTodosBtn = document.querySelector("li#today");
todayTodosBtn.addEventListener("click" , () => {
    console.log("today todos")
    loadTodo("today");
})

const inboxTodosBtn = document.querySelector("li#inbox");
inboxTodosBtn.addEventListener("click" , () => {
    loadTodo("inbox");
})

const weekTodosBtn = document.querySelector("li#weekly");
weekTodosBtn.addEventListener("click" , () => {
    loadTodo("week")
})

