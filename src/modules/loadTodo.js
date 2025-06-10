import { createReadyElement } from "./utilityFunction"; // To Create Elements 
import { loadAddTaskButton } from "./loadAddTaskButton"; // importing module that load the add task button
import { inboxTodoBuilder , todayTodoBuilder, weekTodoBuilder} from "../classes/DOMTodoBuilder";
import { rehydrateTodo } from "../classes/TodoItem";

let inboxBuilder = new inboxTodoBuilder();
let todayBuilder = new todayTodoBuilder();
let weekBuilder = new weekTodoBuilder();

export function loadTodo(option)
{
    // Get all todos , if empty return empty array
    const parsedInboxTodos = JSON.parse(localStorage.getItem("inboxTodos")) || [];

    const todoArray = rehydrateTodo(parsedInboxTodos);

    const content = document.getElementById("content");
    content.innerHTML = "";

    let todosContentContainer = createReadyElement("ul" , "todos-content-container");

    // Create Section Title
    let sectionTitleElement = createReadyElement("h2" , "content-title" , getSectionTitle(option));
    todosContentContainer.appendChild(sectionTitleElement);
    

    if(!todoArray || todoArray.length === 0)
    {
        const emptyMsg = createReadyElement("p" , "empty-message" , "No todos currently...");
        todosContentContainer.appendChild(emptyMsg);
        content.appendChild(todosContentContainer)
    }

    
    if(option === "inbox")
    {
        if(todoArray)
        {
            inboxBuilder.buildTodo(todoArray , option , todosContentContainer);
        }
        loadAddTaskButton();

    }
    else if(option === "today")
    {        
        if(todoArray)
        {
            todayBuilder.buildTodo(todoArray , option , todosContentContainer);
        }
    }
    else if(option === "week")
    {
        if(todoArray)
        {
            weekBuilder.buildTodo(todoArray , option , todosContentContainer);
        }
    }

}

function getSectionTitle(option)
{
    if(option === "inbox")
    {
        return "Inbox";
    }
    else if(option === "today")
    {
        return "Today Todos";
    }
    else if(option === "week")
    {
        return "This Week Todos";
    }

}