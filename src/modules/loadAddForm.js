import { createReadyElement } from "./utilityFunction";

function loadAddForm(){
    const content = document.getElementById("content");

    const form = createReadyElement("form" , "add-form");

    const formTitle = createReadyElement("h2" , "form-title" , "Add Todo");

    
    const titleContainer = createReadyElement("div" , "input-container");
    titleContainer.id = "title";

    const titleField = createReadyElement("input");
    titleField.type = "text";
    titleField.id = "todoTitle";
    titleField.name = "todo-title";
    titleField.required = "true";

    const titleLabel = createReadyElement("label" , "" , "Title");
    titleLabel.id = "todoTitle";
    titleContainer.append(titleLabel , titleField);

    const descriptionContainer = createReadyElement("div" , "input-container");
    descriptionContainer.id ="description";

    const descriptionField = createReadyElement("input");
    descriptionField.type = "text";
    descriptionField.id = "todoDescription";
    descriptionField.name = "todo-description";

    const descriptionLabel = createReadyElement("label" , "" , "Description");
    descriptionLabel.id = "todoDescription";
    descriptionContainer.append(descriptionLabel , descriptionField);

    const dueDateContainer = createReadyElement("div" , "input-container");
    dueDateContainer.id = "dueDate";

    const dueDateField = createReadyElement("input");
    dueDateField.type = "date";
    dueDateField.id = "todoDueDate";
    dueDateField.name = "todo-due-date";
    titleField.required = "true";

    const dueDateLabel = createReadyElement("label" , "" , "Due Date");
    dueDateLabel.id = "todoDueDate";
    dueDateContainer.append(dueDateLabel , dueDateField);

    const priorityContainer = createReadyElement("div" , "input-container");
    priorityContainer.id = "priority";

    const highPriorButton = createReadyElement("button" , "" , "High"); 
    highPriorButton.type = "button";
    highPriorButton.dataset.active = "false";

    const mediumPriorButton = createReadyElement("button" , "" , "Medium"); 
    mediumPriorButton.type = "button";
    mediumPriorButton.dataset.active = "false";
    
    const lowPriorButton = createReadyElement("button" , "" , "Low"); 
    lowPriorButton.type = "button";
    lowPriorButton.dataset.active = "false";


    priorityContainer.append(highPriorButton , mediumPriorButton , lowPriorButton);

    const buttonsContainer = createReadyElement("div" , "form-buttons");

    const submitButton = createReadyElement("button" , "" , "Submit");
    submitButton.type = "submit";

    const closeButton = createReadyElement("button" , "close-button" , "Close");
    closeButton.type = "button";

    buttonsContainer.append(submitButton , closeButton);

    form.append(formTitle , titleContainer , descriptionContainer , dueDateContainer , priorityContainer , buttonsContainer);

    content.append(form);
}

export {loadAddForm}