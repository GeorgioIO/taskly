import { createReadyElement } from "../modules/utilityFunction.js";


const sidebarOpener = document.querySelector(".burger-menu");
const sidebar = document.querySelector("#sidebar");

sidebarOpener.addEventListener("click" , (event) => {
    if(event.currentTarget.dataset.state === "inactive")
    {
        sidebar.classList.remove("sidebarSlideOUT");
        sidebar.classList.add("sidebarSlideIN");

        event.currentTarget.dataset.state = "active";
    }
    else
    {
        sidebar.classList.remove("sidebarSlideIN");
        sidebar.classList.add("sidebarSlideOUT");

        event.currentTarget.dataset.state = "inactive";
    }
})

const todosSelection = document.querySelectorAll(".todos-selections li");

todosSelection.forEach(selection => {
    selection.addEventListener("click" , () => {
        const allProjects = document.querySelectorAll(".projects-selections li");   
        allProjects.forEach(project => project.classList.remove("active-project"));

        todosSelection.forEach(selection => selection.classList.remove("active"));

        const currentTodoCounter = document.querySelector(".todos-counter")
        currentTodoCounter.remove();
        

        const todoCounter = createReadyElement("div" , "todos-counter" , "");
        selection.appendChild(todoCounter);
    

        selection.classList.add("active");


    })
})




