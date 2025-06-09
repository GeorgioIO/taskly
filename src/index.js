// IMPORTING CSS
import "../src/styles/animations.css";
import "../src/styles/style.css";

// IMPORTING CLASSES
import "./classes/DOMProjectBuilder.js";
import "./classes/DOMTodoBuilder.js";
import "./classes/Project.js";
import "./classes/TodoItem.js";


import { loadProjects } from "./modules/loadProjects";
import { loadAddTodoForm , setCloseButton , setPriorityButtons , setUpAddTodoBtn} from "./modules/loadAddTodoForm";
import { loadAddProjectForm , setUpAddProjectBtn } from "./modules/loadAddProjectForm";
import { setTodoCounter } from "./modules/setTodoCounter";
import  "../src/scripts/script.js" ;
import { loadTodo } from "./modules/loadTodo.js";
import { createReadyElement } from "./modules/utilityFunction.js";


document.addEventListener("DOMContentLoaded" , () => {
    loadTodo("inbox");

    const todoCounter = createReadyElement("div" , "todos-counter" , "");
    document.getElementById("inbox").appendChild(todoCounter);
    setTodoCounter("inbox");
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
    loadTodo("today");
    setTodoCounter("today");
})

const inboxTodosBtn = document.querySelector("li#inbox");
inboxTodosBtn.addEventListener("click" , () => {
    loadTodo("inbox");
    setTodoCounter("inbox");
})

const weekTodosBtn = document.querySelector("li#weekly");
weekTodosBtn.addEventListener("click" , () => {
    loadTodo("week")
    setTodoCounter("week");
})

