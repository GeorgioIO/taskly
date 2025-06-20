import {generateID} from "../modules/utilityFunction.js";
import { format } from "date-fns";

class TodoItem {
    constructor(title , description , priority , dueDate , projectID)
    {
        this.id = generateID("Todo");
        this._title = title;
        this._description = description;
        this._priority = priority;
        this._dueDate = dueDate;
        this.creationDate = format(new Date() , 'yyyy-MM-dd');
        this._projectID = projectID;
    }

    // setters + getters
    get title()
    {
        return this._title;
    }

    set title(newTitle){
        this._title = newTitle;
    }

    get description()
    {
        return this._description;
    }

    set description(newDescription)
    {
        this._description = newDescription;
    }

    get priority()
    {
        return this._priority;
    }

    set priority(newPriority)
    {
        this._priority = newPriority;
    }

    get projectID()
    {
        return this._projectID;
    }

    set projectID(newProject)
    {
        this._projectID = newProject;
    }
    
    get dueDate()
    {
        return this._dueDate;
    }

    set dueDate(newDDate)
    {
        this._dueDate = newDDate;
    }
    
}


function updateTodo(todoToChange)
{
    const newTodoTitle = document.querySelector("#todoTitle");
    const newTodoDescription = document.querySelector("#todoDescription");
    const newTodoPriority = document.querySelector('[data-active="true"]');
    const newTodoProject = document.querySelector("#projectsSelections");
    const newTodoDueDate = document.querySelector("#todoDueDate");

    if(!newTodoTitle.value)
    {
        const errorMessage = document.querySelector(".form-error-message");
        errorMessage.style.display = "flex";
        errorMessage.innerText = "Todo Name is missing";
        setTimeout(() => {
            errorMessage.style.display = "none";
            errorMessage.innerText = "";
        }, 1000)
        return;
    }

    let modifiedPriority = "";
    if(!newTodoPriority)
    {
        modifiedPriority = "None";
    }
    else
    {
        modifiedPriority = newTodoPriority.id;
    }

    let modifiedDate = "";
    if(!newTodoDueDate.value == "No Date Set" || !newTodoDueDate.value == "")
    {
        if(new Date(newTodoDueDate.value) < new Date())
        {
            const errorMessage = document.querySelector(".form-error-message");
            errorMessage.style.display = "flex";
            errorMessage.innerText = "Please enter a valid due date";
            setTimeout(() => {
                errorMessage.style.display = "none";
                errorMessage.innerText = "";
            }, 1000)
            return;
        }
        modifiedDate = newTodoDueDate.value
    }

    const savedTodos = JSON.parse(localStorage.getItem("inboxTodos"));
    const todoArray = rehydrateTodo(savedTodos);
    for(let i = 0 ; i < todoArray.length ; i++)
    {
        if(todoArray[i].id == todoToChange.id)
        {
            todoArray[i].title = newTodoTitle.value;
            todoArray[i].description = newTodoDescription.value;
            todoArray[i].priority = modifiedPriority;
            todoArray[i].projectID = newTodoProject.value;
            todoArray[i].dueDate = modifiedDate;
        }
    }
    localStorage.setItem("inboxTodos" , JSON.stringify(todoArray));
    
}

function deleteTodo(givenID)
{
    const savedTodos = JSON.parse(localStorage.getItem("inboxTodos"));

    for (let i = 0 ; i < savedTodos.length ; i++)
    {
        if(savedTodos[i].id === givenID)
        {
            savedTodos.splice(i , 1);
        }
    }

    localStorage.setItem("inboxTodos" , JSON.stringify(savedTodos));
}

function rehydrateTodo(rawTodos)
{
    return rawTodos.map(todo => {
        const newTodo = new TodoItem(
            todo._title,
            todo._description,
            todo._priority, 
            todo._dueDate, 
            todo._projectID
        );
        newTodo.id = todo.id;
        newTodo.creationDate = todo.creationDate;
        return newTodo;
    });    
}

export {TodoItem , deleteTodo , updateTodo , rehydrateTodo}