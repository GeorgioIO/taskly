import { deleteProject } from "./Project";
import { createReadyElement } from "../modules/utilityFunction";
import projectIcon from "../assets/images/project-test-icon.svg";
import deleteProjectIcon from "../assets/images/delete-icon.svg";
import {rehydrateTodo} from "../classes/TodoItem";

import { ProjectTodoBuilder } from "./DOMTodoBuilder";

let projectTodobuilder = new ProjectTodoBuilder();

class DOMProjectInventory 
{
    
}

class ProjectBuilder extends DOMProjectInventory
{   
    addEventToProject ()
    {
        const projects = document.querySelectorAll(".projects-selections li");

        projects.forEach(project => {
            project.addEventListener("click" , () => {
                const content = document.querySelector("#content");
                content.innerHTML = "";

                const parsedInboxTodos = JSON.parse(localStorage.getItem("inboxTodos"));
                const todoArray = rehydrateTodo(parsedInboxTodos);

                // Creation section title
                const sectionTitle = createReadyElement("h2" , "content-title" , project.dataset.name);
                content.appendChild(sectionTitle);

                // Create project description
                const projectDescription = createReadyElement("p" , "project-description" , project.dataset.description);
                content.appendChild(projectDescription);

                // Create and populate All todos
                let todosContentContainer = createReadyElement("ul" , "todos-content-container");

                projectTodobuilder.buildTodo(todoArray , todosContentContainer , project);
            })
        })
    }

    buildProjects(projects , projectsContainer)
    {
        if(projects.length > 0)
        {
            for(let i = 0 ; i < projects.length ; i++)
            {
                const liProject = createReadyElement("li");
                
                liProject.dataset.projectid = projects[i].id;
                liProject.dataset.name = projects[i].name;
                liProject.dataset.description = projects[i].description;

                liProject.addEventListener("click" , () => {
                    const allProjects = document.querySelectorAll(".projects-selections li");

                    const todoSelections = document.querySelectorAll(".todos-selections li");
                    todoSelections.forEach(todoselection => todoselection.classList.remove("active"));

                    const todoCounter = document.querySelector(".todos-counter")
                    if (todoCounter)
                    {
                        todoCounter.remove();
                    }

                    allProjects.forEach(project => project.classList.remove("active-project"));
                    liProject.classList.add("active-project");
                })
                const projectImage = new Image();
                projectImage.src = projectIcon;
                projectImage.alt = projects[i].name;

                liProject.appendChild(projectImage);

                const projectName = createReadyElement("p" , "" , projects[i].name);
                liProject.appendChild(projectName);

                const deleteIconButton = createReadyElement("button" , "deleteProjectBtn")
            
                const deleteIcon = new Image();
                deleteIcon.src = deleteProjectIcon;
                deleteIcon.alt = "Delete Project Icon";

                deleteIconButton.appendChild(deleteIcon);

                deleteIconButton.addEventListener("click" , (event) => {
                    event.stopPropagation();
                    deleteProject(projects[i].id);
                })
                    
                liProject.appendChild(deleteIconButton);

                projectsContainer.appendChild(liProject);
            }
            this.addEventToProject();
        }
        else
        {
            const text = createReadyElement("p" , "" , "No Projects Available");
            projectsContainer.appendChild(text);
        }

    }
}


export {ProjectBuilder}