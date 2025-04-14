import { createReadyElement } from "./utilityFunction";
import editIcon from "../assets/images/edittodo-icon.svg";
import deleteIcon from "../assets/images/deletetodo-icon.svg";


export function loadInbox(){
    const content = document.getElementById("content");
    content.innerHTML = "";
    const parsedInboxTodos = JSON.parse(localStorage.getItem("inboxTodos"))
    console.log(parsedInboxTodos)

    // Create Section Title
    let sectionTitle = createReadyElement("h2" , "content-title" , "Inbox");
    content.appendChild(sectionTitle);
    
    // Create and populate All todos

    let todosContentContainer = createReadyElement("ul" , "todos-content-container");

    for(let i = 0 ; i < parsedInboxTodos.length ; i++)
    {
        let todoListItem = createReadyElement("li" , "todo-item");
        todoListItem.dataset.id = parsedInboxTodos[i].id;

        if(parsedInboxTodos[i].priority === "High")
        {
            todoListItem.style.borderLeft = "10px solid red";
        }
        else if(parsedInboxTodos[i].priority === "Medium")
        {
            todoListItem.style.borderLeft = "10px solid yellow";
        }
        else
        {
            todoListItem.style.borderLeft = "10px solid green";
        }

        let checkBox = createReadyElement("input");
        checkBox.type = "checkbox";
        checkBox.id = "todoState";
        checkBox.name = "state";

        todoListItem.appendChild(checkBox);

        let todoInformationContainer = createReadyElement("div" , "todo-information");

        let todoTitle = createReadyElement("h2" , "todo-title" , parsedInboxTodos[i].title);
        let todoDescription = createReadyElement("p" , "todo-description" , parsedInboxTodos[i].description);
        let todoCreationDate = createReadyElement("p" , "todo-creationdate" , parsedInboxTodos[i].creationDate);
        
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

        buttonContainer.append(editButton , deleteButton);
        todoListItem.appendChild(buttonContainer);

        todosContentContainer.appendChild(todoListItem);
    }

    content.appendChild(todosContentContainer);

    
}