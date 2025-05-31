import { updateTodo} from "../classes/TodoItem";
import { loadInbox } from "./loadInbox";
import { createReadyElement } from "./utilityFunction";
import { setTodoCounter } from "./setTodoCounter";


function loadEditTodoForm(todo){
    const mainTag = document.querySelector("main");

    const form = document.querySelector(".form");
    form.innerHTML = "";
    form.classList.remove(...form.classList);
    form.classList.add("form");
    form.classList.add("add-form");

    const formTitle = createReadyElement("h2" , "form-title" , "Edit Todo");

    
    const titleContainer = createReadyElement("div" , "input-container");
    titleContainer.id = "title";

    const titleField = createReadyElement("input");
    titleField.type = "text";
    titleField.id = "todoTitle";
    titleField.name = "todo-title";
    titleField.required = "true";
    titleField.value = todo.title;

    const titleLabel = createReadyElement("label" , "" , "Title");
    titleLabel.htmlFor  = "todoTitle";
    titleContainer.append(titleLabel , titleField);

    const descriptionContainer = createReadyElement("div" , "input-container");
    descriptionContainer.id ="description";

    const descriptionField = createReadyElement("input");
    descriptionField.type = "text";
    descriptionField.id = "todoDescription";
    descriptionField.name = "todo-description";
    descriptionField.value = todo.description;

    const descriptionLabel = createReadyElement("label" , "" , "Description");
    descriptionLabel.htmlFor = "todoDescription";
    descriptionContainer.append(descriptionLabel , descriptionField);

    const projectsContainer = createReadyElement("div" , "input-container");
    projectsContainer.id = "projects";

    const projectsField = createReadyElement("select");
    projectsField.id = "projectsSelections";

    const defaultOption = createReadyElement("option" , "" , "None");
    defaultOption.value = "None";

    projectsField.append(defaultOption)

    const savedProjects = JSON.parse(localStorage.getItem("projectsAvailable"))

    for(let i = 0 ; i < savedProjects.length ; i++)
    {

        const projectOption = createReadyElement("option" , "" , savedProjects[i].name);
        projectOption.value = savedProjects[i].id;

        if(savedProjects[i].id == todo.projectID)
        {
            projectOption.selected = true;
        }

        projectsField.appendChild(projectOption);
    }

    const projectsLabel = createReadyElement("label" , "" , "Projects");
    projectsLabel.htmlFor = "projectsSelection";
    projectsContainer.append(projectsLabel , projectsField);

    const dueDateContainer = createReadyElement("div" , "input-container");
    dueDateContainer.id = "dueDate";

    const dueDateField = createReadyElement("input");
    dueDateField.type = "date";
    dueDateField.id = "todoDueDate";
    dueDateField.name = "todo-due-date";
    dueDateField.value = todo.dueDate;

    const dueDateLabel = createReadyElement("label" , "" , "Due Date");
    dueDateLabel.htmlFor = "todoDueDate";
    dueDateContainer.append(dueDateLabel , dueDateField);

    const priorityContainer = createReadyElement("div" , "input-container");
    priorityContainer.id = "priority";

    const highPriorButton = createReadyElement("button" , "" , "High"); 
    highPriorButton.type = "button";
    highPriorButton.dataset.active = "false";
    highPriorButton.id = "High";
    if(todo.priority === "High")
    {
        highPriorButton.dataset.active = "true";
        highPriorButton.style.backgroundColor = "red";
    }

    const mediumPriorButton = createReadyElement("button" , "" , "Medium"); 
    mediumPriorButton.type = "button";
    mediumPriorButton.dataset.active = "false";
    mediumPriorButton.id = "Medium";
    if(todo.priority === "Medium")
    {
        highPriorButton.dataset.active = "true";
        mediumPriorButton.style.backgroundColor = "yellow";
    }


    const lowPriorButton = createReadyElement("button" , "" , "Low"); 
    lowPriorButton.type = "button";
    lowPriorButton.dataset.active = "false";
    lowPriorButton.id = "Low";
    if(todo.priority === "Low")
    {
        highPriorButton.dataset.active = "true";
        lowPriorButton.style.backgroundColor = "green";
    }
    

    priorityContainer.append(highPriorButton , mediumPriorButton , lowPriorButton);

    const buttonsContainer = createReadyElement("div" , "form-buttons");

    const submitButton = createReadyElement("button" , "update-project" , "Update");
    submitButton.type = "button";
    submitButton.addEventListener("click" , () => {
        updateTodo(todo);
    })

    const closeButton = createReadyElement("button" , "close-button" , "Close");
    closeButton.type = "button";

    buttonsContainer.append(submitButton , closeButton);

    form.append(formTitle , titleContainer , descriptionContainer , projectsContainer , dueDateContainer , priorityContainer , buttonsContainer);

    mainTag.append(form);
}

function setCloseButton(form)
{
    const closeFormButton = form.querySelector(".close-button")
    // const tempForm = document.querySelector(".form");
    // document.querySelector("main").append(tempForm);

    closeFormButton.addEventListener("click" , (event) => {
        event.preventDefault()
        form.classList.remove("showForm")
        form.classList.add("hideForm");

        setTimeout(() => {
            form.reset();
            form.style.display = "none";
        } , 600)
    })

}

function setPriorityButtons(form)
{
    const priorityButtons = form.querySelectorAll("#priority button");

    priorityButtons.forEach(button => {
        button.addEventListener("click" , (event) => {
            priorityButtons.forEach(button => {
                button.style.backgroundColor = "white";
                button.dataset.active = "false";
            });

            let clickedButton = event.currentTarget;
            clickedButton.dataset.active = "true";
            let priority = clickedButton.textContent;
            if(priority === "High")
            {
                clickedButton.style.backgroundColor = "red";
            }
            else if(priority === "Medium")
            {
                clickedButton.style.backgroundColor = "yellow";
            }
            else if(priority === "Low")
            {
                clickedButton.style.backgroundColor = "green";
            }
        })
    })
}

export {loadEditTodoForm , setCloseButton , setPriorityButtons}