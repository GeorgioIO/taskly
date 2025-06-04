import { ProjectBuilder } from "../classes/DOMProjectBuilder";
import { ProjectTodoBuilder } from "../classes/DOMTodoBuilder";

let projectBuilder = new ProjectBuilder();

function loadProjects()
{
    const projectsSelections = document.querySelector(".projects-selections");
    const parsedProjectJSON = JSON.parse(localStorage.getItem("projectsAvailable"));
    projectsSelections.innerHTML = "";

    projectBuilder.buildProjects(parsedProjectJSON , projectsSelections)

}

export {loadProjects}