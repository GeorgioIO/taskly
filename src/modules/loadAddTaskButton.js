import { createReadyElement } from "./utilityFunction.js";
import addIcon from "../assets/images/add-task-icon.svg";

function loadAddTaskButton()
{
    const content = document.getElementById("content");

    const button = createReadyElement("button" , "add-task-button");

    const addImage = new Image();
    addImage.src = addIcon;
    addImage.alt = "Add task icon";

    button.appendChild(addImage);

    content.appendChild(button);
}



export {loadAddTaskButton}