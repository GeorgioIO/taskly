import { createReadyElement } from "./utilityFunction"; // To Create Elements 
import { loadAddTaskButton } from "./loadAddTaskButton"; // importing module that load the add task button
import { inboxTodoBuilder , todayTodoBuilder, weekTodoBuilder} from "../classes/DOMTodoBuilder";
import { rehydrateTodo } from "../classes/TodoItem";

let inboxBuilder = new inboxTodoBuilder();
let todayBuilder = new todayTodoBuilder();
let weekBuilder = new weekTodoBuilder();

export function loadTodo(option)
{
    const parsedInboxTodos = JSON.parse(localStorage.getItem("inboxTodos"))
    
    if(parsedInboxTodos)
    {
        const todoArray = rehydrateTodo(parsedInboxTodos);

        const content = document.getElementById("content");
        content.innerHTML = "";

        // Create Section Title
        let sectionTitle = "";
        let todosContentContainer = createReadyElement("ul" , "todos-content-container");

        if(option === "inbox")
        {
            sectionTitle = "Inbox";
            let sectionTitleElement = createReadyElement("h2" , "content-title" , sectionTitle);
            content.appendChild(sectionTitleElement);
            inboxBuilder.buildTodo(todoArray , option , todosContentContainer);
            loadAddTaskButton();
        }
        else if(option === "today")
        {
            
            sectionTitle = "Today Todos";
            let sectionTitleElement = createReadyElement("h2" , "content-title" , sectionTitle);
            content.appendChild(sectionTitleElement);
            todayBuilder.buildTodo(todoArray , option , todosContentContainer);
        }
        else if(option === "week")
        {
            sectionTitle = "This Week Todos";
            let sectionTitleElement = createReadyElement("h2" , "content-title" , sectionTitle);
            content.appendChild(sectionTitleElement);
            weekBuilder.buildTodo(todoArray , option , todosContentContainer);
        }
    }
    else
    {
        console.log("NO TODOS")
    }

}