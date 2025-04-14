import "../src/styles/style.css";
import { TodoItem } from "./classes/TodoItem";
import { loadInbox } from "./modules/loadInbox";
import { loadAddTaskButton } from "./modules/loadAddTaskButton";
import { loadAddForm } from "./modules/loadAddForm";

let todo1 = new TodoItem("Testing 1" , "todo item 1" , "High" , "4/18/2025");
let todo2 = new TodoItem("Testing 2" , "todo item 2" , "High" , "4/18/2025");
let todo3 = new TodoItem("Testing 3" , "todo item 3" , "Medium" , "4/18/2025");
let todo4 = new TodoItem("Testing 3" , "todo item 3" , "Low" , "4/18/2025");
let todo5 = new TodoItem("Testing to try date" , "todo item 4" , "Low" , "4/18/2025");

let todoArray = [todo1 , todo2 , todo3 , todo4 , todo5];
const todoJSON = JSON.stringify(todoArray);
localStorage.setItem("inboxTodos" , todoJSON);





document.addEventListener("DOMContentLoaded" , () => {
    loadInbox();
    loadAddTaskButton();
    loadAddForm();

    const addTaskButton = document.querySelector(".add-task-button");
    const addForm = document.querySelector(".add-form");
    const closeFormButton = addForm.querySelector(".close-button")
    const priorityButtons = addForm.querySelectorAll("#priority button");

    addTaskButton.addEventListener("click" , () => {
        addForm.style.display = "flex";
        addForm.classList.remove("hideForm")
        addForm.classList.add("showForm");
    })

    closeFormButton.addEventListener("click" , (event) => {
        event.preventDefault()
        addForm.classList.remove("showForm")
        addForm.classList.add("hideForm");

        setTimeout(() => {
            addForm.reset();
            addForm.style.display = "none";
        } , 600)
    })

    priorityButtons.forEach(button => {
        button.addEventListener("click" , (event) => {
            priorityButtons.forEach(button => {
                button.style.backgroundColor = "white";
                button.dataset.active = "false";
            });

            let clickedButton = event.currentTarget;
            clickedButton.dataset.active = "true";
            let priority = clickedButton.textContent;
            if(priority === "High")
            {
                clickedButton.style.backgroundColor = "red";
            }
            else if(priority === "Medium")
            {
                clickedButton.style.backgroundColor = "yellow";
            }
            else if(priority === "Low")
            {
                clickedButton.style.backgroundColor = "green";
            }
        })
    })
})