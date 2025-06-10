import { createReadyElement } from "../modules/utilityFunction.js";


const sidebarOpener = document.querySelector(".burger-menu");
const sidebar = document.querySelector("#sidebar");

sidebarOpener.addEventListener("click" , (event) => {
    if(event.currentTarget.dataset.state === "inactive")
    {
        sidebar.style.display = "flex";
        sidebar.classList.remove("sidebarSlideOUT");
        sidebar.classList.add("sidebarSlideIN");

        event.currentTarget.dataset.state = "active";
    }
    else
    {
        setTimeout(() => {
            sidebar.style.display = "none";
        } , 650)
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

        selection.classList.add("active");
    })
})


window.addEventListener("resize" , (event) => {
    const sidebar = document.querySelector("#sidebar");

    if(window.innerWidth > 880)
    {
        sidebar.style.display = "flex";
        sidebar.classList.remove("sidebarSlideOUT");
        sidebar.classList.add("sidebarSlideIN");

        document.querySelector(".burger-menu").dataset.state = "active";

    }
});
