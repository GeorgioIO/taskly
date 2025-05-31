import { createReadyElement } from "./utilityFunction";
import editIcon from "../assets/images/edittodo-icon.svg";
import deleteIcon from "../assets/images/deletetodo-icon.svg";
import { loadAddTaskButton } from "./loadAddTaskButton";
import { deleteTodo  , rehydrateTodo} from "../classes/TodoItem";
import { setTodoCounter } from "./setTodoCounter";
import { loadEditTodoForm  , setCloseButton , setPriorityButtons} from "./loadEditTodoForm";

export function loadInbox(){
    const content = document.getElementById("content");
    content.innerHTML = "";
    const parsedInboxTodos = JSON.parse(localStorage.getItem("inboxTodos"))
    const todoArray = rehydrateTodo(parsedInboxTodos);
    // Create Section Title
    let sectionTitle = createReadyElement("h2" , "content-title" , "Inbox");
    content.appendChild(sectionTitle);
    
    // Create and populate All todos
    let todosContentContainer = createReadyElement("ul" , "todos-content-container");

    for(let i = 0 ; i < todoArray.length ; i++)
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
            loadInbox();
            setTodoCounter("inbox");
        })

        editButton.addEventListener("click" , () => {
            loadEditTodoForm(todoArray[i]);

            const addForm = document.querySelector(".add-form");

            setCloseButton(addForm);
            setPriorityButtons(addForm);

            addForm.style.display = "flex";
            addForm.classList.remove("hideForm")
            addForm.classList.add("showForm");
        })

        buttonContainer.append(editButton , deleteButton);
        todoListItem.appendChild(buttonContainer);

        todosContentContainer.appendChild(todoListItem);
    }

    content.appendChild(todosContentContainer);
    loadAddTaskButton();
    
}