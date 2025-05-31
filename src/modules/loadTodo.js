import { createReadyElement } from "./utilityFunction"; // To Create Elements 
import editIcon from "../assets/images/edittodo-icon.svg"; // Importing edit icon
import deleteIcon from "../assets/images/deletetodo-icon.svg"; // importing delete icon
import { loadAddTaskButton } from "./loadAddTaskButton"; // importing module that load the add task button
import { deleteTodo  , rehydrateTodo} from "../classes/TodoItem"; // importing todo class module functions 
import { setTodoCounter } from "./setTodoCounter"; // importing set todo counter 
import { loadEditTodoForm  , setCloseButton , setPriorityButtons} from "./loadEditTodoForm"; // importing function that load edit form
import { inboxTodoBuilder } from "../classes/DOMTodoBuilder";
let inboxBuilder = new inboxTodoBuilder();

export function loadTodo(option)
{
    const parsedInboxTodos = JSON.parse(localStorage.getItem("inboxTodos"))
    const todoArray = rehydrateTodo(parsedInboxTodos);

    const content = document.getElementById("content");
    content.innerHTML = "";
    console.log(option)
    // Create Section Title
    let sectionTitle = "";
    if(option === "inbox")
    {
        sectionTitle = "Inbox";
    }
    else if(option === "today")
    {
        sectionTitle = "Today Todos";
    }
    else if(option === "week")
    {
        sectionTitle = "This Week Todos";
    }

    let sectionTitleElement = createReadyElement("h2" , "content-title" , sectionTitle);
    content.appendChild(sectionTitleElement);

    // Create and populate All todos
    let todosContentContainer = createReadyElement("ul" , "todos-content-container");
    inboxBuilder.buildTodo(todoArray , option , todosContentContainer);
}