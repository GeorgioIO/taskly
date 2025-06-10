import { createReadyElement } from "./utilityFunction.js";
import addIcon from "../assets/images/add-task-icon.svg";
import { loadAddTodoForm , setCloseButton , setPriorityButtons , setUpAddTodoBtn} from "./loadAddTodoForm.js";

function loadAddTaskButton()
{
    const content = document.getElementById("content");

    const button = createReadyElement("button" , "add-task-button");

    const addImage = new Image();
    addImage.src = addIcon;
    addImage.alt = "Add task icon";

    button.appendChild(addImage);

    content.appendChild(button);

    button.addEventListener("click" , () => {
        loadAddTodoForm();

        const addForm = document.querySelector(".add-form");

        setCloseButton(addForm);
        setPriorityButtons(addForm);
        setUpAddTodoBtn();

        addForm.style.display = "flex";
        addForm.classList.remove("hideForm")
        addForm.classList.add("showForm");

    })
    
}



export {loadAddTaskButton}