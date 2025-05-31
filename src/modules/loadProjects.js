import { createReadyElement } from "./utilityFunction";
import { deleteProject } from "../classes/Project";
import projectIcon from "../assets/images/project-test-icon.svg";
import deleteProjectIcon from "../assets/images/delete-icon.svg";
import editIcon from "../assets/images/edittodo-icon.svg";
import deleteIcon from "../assets/images/deletetodo-icon.svg";
import { deleteTodo , rehydrateTodo} from "../classes/TodoItem";
import { setTodoCounter } from "./setTodoCounter";

function loadProjects()
{
    const projectsSelections = document.querySelector(".projects-selections");
    const parsedProjectJSON = JSON.parse(localStorage.getItem("projectsAvailable"));
    projectsSelections.innerHTML = "";

    if(parsedProjectJSON.length > 0)
    {
        for(let i = 0 ; i < parsedProjectJSON.length ; i++)
        {
            const liProject = createReadyElement("li");
            liProject.dataset.projectid = parsedProjectJSON[i].id;
            liProject.dataset.name = parsedProjectJSON[i].name;
            liProject.dataset.description = parsedProjectJSON[i].description;

            const projectImage = new Image();
            projectImage.src = projectIcon;
            projectImage.alt = parsedProjectJSON[i].name;

            liProject.appendChild(projectImage);

            const projectName = createReadyElement("p" , "" , parsedProjectJSON[i].name);
            liProject.appendChild(projectName);

            const deleteIconButton = createReadyElement("button" , "deleteProjectBtn")
        
            const deleteIcon = new Image();
            deleteIcon.src = deleteProjectIcon;
            deleteIcon.alt = "Delete Project Icon";

            deleteIconButton.appendChild(deleteIcon);

            deleteIconButton.addEventListener("click" , (event) => {
                event.stopPropagation();
                deleteProject(parsedProjectJSON[i].id);
            })
                
            liProject.appendChild(deleteIconButton);

            projectsSelections.appendChild(liProject);
        }
        addEventToProject();
    }
    else
    {
        const text = createReadyElement("p" , "" , "No Projects Available");
        projectsSelections.appendChild(text);
    }

}

function addEventToProject ()
{
    const projects = document.querySelectorAll(".projects-selections li");

    projects.forEach(project => {
        project.addEventListener("click" , () => {
            loadSingleProject(project);
        })
    })
    
}

function loadSingleProject(project)
{
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

    for(let i = 0 ; i < todoArray.length ; i++)
    {
        if(todoArray[i].projectID == project.dataset.projectid)
        {
            let todoListItem = createReadyElement("li" , "todo-item");
            todoListItem.dataset.id = todoArray[i].id;
        

            if(todoArray[i].priority === "High")
            {
                todoListItem.style.borderLeft = "10px solid red";
            }
            else if(todoArray[i].priority === "Medium")
            {
                todoListItem.style.borderLeft = "10px solid yellow";
            }
            else if(todoArray[i].priority === "Low")
            {
                todoListItem.style.borderLeft = "10px solid green";
            }
            else
            {
                todoListItem.style.borderLeft = "10px solid lightblue";
            }

            let checkBox = createReadyElement("input");
            checkBox.type = "checkbox";
            checkBox.id = "todoState";
            checkBox.name = "state";

            todoListItem.appendChild(checkBox);

            let todoInformationContainer = createReadyElement("div" , "todo-information");

            let todoTitle = createReadyElement("h2" , "todo-title" , todoArray[i].title);
            let todoDescription = createReadyElement("p" , "todo-description" , todoArray[i].description);
            let todoCreationDate = createReadyElement("p" , "todo-creationdate" , todoArray[i].creationDate);
            
            todoInformationContainer.append(todoTitle , todoDescription , todoCreationDate);
            todoListItem.appendChild(todoInformationContainer);

            let buttonContainer = createReadyElement("div" , "todo-control");

            // edit button
            let editButton = createReadyElement("button");
            let editImage = new Image();
            editImage.src = editIcon;
            editImage.alt = "Edit Todo Icon";
            editButton.appendChild(editImage);

            // delete button
            let deleteButton = createReadyElement("button");
            let deleteImage = new Image();
            deleteImage.src = deleteIcon;
            deleteImage.alt = "Delete Todo Icon";
            deleteButton.appendChild(deleteImage);

            deleteButton.addEventListener("click" , () => {
                deleteTodo(todoArray[i].id);
                loadSingleProject(project);
                setTodoCounter("inbox");
            })

            buttonContainer.append(editButton , deleteButton);
            todoListItem.appendChild(buttonContainer);

            todosContentContainer.appendChild(todoListItem);
        }
    }

    content.appendChild(todosContentContainer);
}

export {loadProjects}