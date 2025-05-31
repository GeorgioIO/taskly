import { createReadyElement } from "../modules/utilityFunction.js";

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