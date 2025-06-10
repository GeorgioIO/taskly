import { createReadyElement } from "./utilityFunction";
import { loadProjects } from "./loadProjects";
import { Project } from "../classes/Project.js";

function loadAddProjectForm()
{
    const content = document.getElementById("content");
    const form = document.querySelector(".form");
    form.innerHTML = "";
    form.classList.remove(...form.classList);
    form.classList.add("form");
    form.classList.add("add-form");

    const formTitle = createReadyElement("h2" , "form-title" , "Add Project");

    const errorMessage = createReadyElement("p" , "form-error-message" , "");

    const projectNameContainer = createReadyElement("div" , "input-container");

    const projectNameLabel = createReadyElement("label" , "" , "Project Name");
    projectNameLabel.htmlFor = "projectName";

    const projectNameField =  createReadyElement("input");
    projectNameField.type = "text";
    projectNameField.id = "projectName";
    projectNameField.name = "project-name";
    projectNameField.required = "true";

    projectNameContainer.append(projectNameLabel , projectNameField);

    const projectDescriptionContainer = createReadyElement("div" , "input-container");

    const projectDescriptionLabel = createReadyElement("label" , "" , "Project Description");
    projectDescriptionLabel.htmlFor = "projectDescription";

    const projectDescriptionField =  createReadyElement("input");
    projectDescriptionField.type = "text";
    projectDescriptionField.id = "projectDescription";
    projectDescriptionField.name = "project-description";

    projectDescriptionContainer.append(projectDescriptionLabel , projectDescriptionField);

    const buttonsContainer = createReadyElement("div" , "form-buttons");

    const submitButton = createReadyElement("button" , "add-project" , "Add Project");
    submitButton.type = "button";

    const closeButton = createReadyElement("button" , "close-button" , "Close");
    closeButton.type = "button";

    buttonsContainer.append(submitButton , closeButton);

    form.append(formTitle , errorMessage , projectNameContainer , projectDescriptionContainer , buttonsContainer);

    
}

function setUpAddProjectBtn()
{
    const addProjectBtn = document.querySelector(".add-project");
    addProjectBtn.addEventListener("click" , () => {
        const projectName = document.querySelector("#projectName");
        const projectDescription = document.querySelector("#projectDescription");

        if(projectName.value == "")
        {
            const errorMessage = document.querySelector(".form-error-message");
            errorMessage.style.display = "flex";
            errorMessage.innerText = "Project Name is missing";
            setTimeout(() => {
                errorMessage.style.display = "none";
                errorMessage.innerText = "";
            }, 1000)
            return;
        }

        const newProject = new Project(projectName.value , projectDescription.value);
        projectName.value = "";
        projectDescription.value = "";


        const savedProjects = JSON.parse(localStorage.getItem("projectsAvailable")) || [];

        savedProjects.push(newProject);
        localStorage.setItem("projectsAvailable" , JSON.stringify(savedProjects));
        

        loadProjects();
    })
}


export {loadAddProjectForm , setUpAddProjectBtn};