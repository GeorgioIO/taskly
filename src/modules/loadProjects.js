import { createReadyElement } from "./utilityFunction";
import { deleteProject } from "../classes/Project";
import projectIcon from "../assets/images/project-test-icon.svg";
import deleteProjectIcon from "../assets/images/delete-icon.svg";
import editIcon from "../assets/images/edittodo-icon.svg";
import deleteIcon from "../assets/images/deletetodo-icon.svg";
import { deleteTodo , rehydrateTodo} from "../classes/TodoItem";
import { setTodoCounter } from "./setTodoCounter";
import { ProjectBuilder } from "../classes/DOMProjectBuilder";
import { ProjectTodoBuilder } from "../classes/DOMTodoBuilder";

let projectBuilder = new ProjectBuilder();
let projectTodoBuilder = new ProjectTodoBuilder()

function loadProjects()
{
    const projectsSelections = document.querySelector(".projects-selections");
    const parsedProjectJSON = JSON.parse(localStorage.getItem("projectsAvailable"));
    projectsSelections.innerHTML = "";

    projectBuilder.buildProjects(parsedProjectJSON , projectsSelections)

}

export {loadProjects}