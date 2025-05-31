import { loadProjects } from "../modules/loadProjects.js";
import {generateID} from "../modules/utilityFunction.js";
import { format } from "date-fns";

class Project{
    constructor(name , description)
    {
        this.id = generateID("Project");
        this.name = name;
        this.description = description;
        this.todoList = [];
    }
    
    
    addTodo(todoItem)
    {
        this.todoList.push(todoItem);
    }

    deleteTodo(givenId)
    {
        this.todoList = this.todoList.filter(todoitem => todoitem.id != givenId);
    }
}

function deleteProject(givenID)
{
    const savedProjects = JSON.parse(localStorage.getItem("projectsAvailable"));

    for(let i = 0; i < savedProjects.length ; i++)
    {
        if(savedProjects[i].id == givenID)
        {
            savedProjects.splice(i , 1);
        }
    }

    localStorage.setItem("projectsAvailable" , JSON.stringify(savedProjects));
    loadProjects();
}

export {Project , deleteProject}