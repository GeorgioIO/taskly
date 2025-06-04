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
        console.log(1)
        todosSelection.forEach(selection => selection.classList.remove("active"));
        document.querySelector(".todos-counter").remove();

        selection.classList.add("active");

        const todoCounter = createReadyElement("div" , "todos-counter" , "");
        selection.appendChild(todoCounter);

    })
})




