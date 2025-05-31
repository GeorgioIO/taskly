import "../src/styles/animations.css";
import "../src/styles/style.css";
import { TodoItem } from "./classes/TodoItem";
import { Project } from "./classes/Project";
import { loadInbox } from "./modules/loadInbox";
import { loadProjects } from "./modules/loadProjects";
import { loadAddTaskButton } from "./modules/loadAddTaskButton";
import { loadAddTodoForm , setCloseButton , setPriorityButtons , setUpAddTodoBtn} from "./modules/loadAddTodoForm";
import { loadAddProjectForm , setUpAddProjectBtn } from "./modules/loadAddProjectForm";
import { add } from "date-fns/fp";
import { loadTodayTodos } from "./modules/loadTodayTodos";
import { loadWeekTodos } from "./modules/loadWeekTodos";
import { setTodoCounter } from "./modules/setTodoCounter";
import  "../src/scripts/script.js" ;
import { loadTodo } from "./modules/loadTodo.js";


document.addEventListener("DOMContentLoaded" , () => {
    loadTodo("inbox");
    setTodoCounter("inbox");
    loadProjects();

    // const addTaskButton = document.querySelector(".add-task-button");

    // addTaskButton.addEventListener("click" , () => {
    //     loadAddTodoForm();

    //     const addForm = document.querySelector(".add-form");

    //     setCloseButton(addForm);
    //     setPriorityButtons(addForm);
    //     setUpAddTodoBtn();

    //     addForm.style.display = "flex";
    //     addForm.classList.remove("hideForm")
    //     addForm.classList.add("showForm");

    // })
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
    loadTodayTodos();
    setTodoCounter("today");
})

const inboxTodosBtn = document.querySelector("li#inbox");
inboxTodosBtn.addEventListener("click" , () => {
    loadInbox();
    setTodoCounter("inbox");
})

const weekTodosBtn = document.querySelector("li#weekly");
weekTodosBtn.addEventListener("click" , () => {
    loadWeekTodos();
    setTodoCounter("week");
})

