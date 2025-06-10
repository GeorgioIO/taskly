import { createReadyElement } from "../modules/utilityFunction";
import editIcon from "../assets/images/edittodo-icon.svg";
import deleteIcon from "../assets/images/deletetodo-icon.svg";
import { deleteTodo} from "../classes/TodoItem";
import { loadEditTodoForm  , setCloseButton , setPriorityButtons} from "../modules/loadEditTodoForm";
import { format , isThisWeek} from "date-fns";


class DOMTodoInventory
{
    priorityBuilder(priority)
    {
        let borderStyle = "";
        if(priority === "High")
        {
            borderStyle = "10px solid red";
        }
        else if(priority === "Medium")
        {
            borderStyle = "10px solid yellow";
        }
        else if(priority === "Low")
        {
            borderStyle = "10px solid green";
        }
        else
        {
            borderStyle = "10px solid lightblue";
        }

        return borderStyle;
    }

    ButtonBuilder(buttonElement , buttonIcon , buttonAlt)
    {
        let buttonImage = new Image();
        buttonImage.src = buttonIcon;
        buttonImage.alt = buttonAlt;
        buttonElement.appendChild(buttonImage);
    }
}

class inboxTodoBuilder extends DOMTodoInventory
{
    buildTodo(todos , option , todosContainer)
    {
        const content = document.getElementById("content");
        content.dataset.currentContent = "inbox";

        for(let i = 0 ; i < todos.length ; i++)
        {
            let todoListItem = createReadyElement("li" , "todo-item");
            todoListItem.dataset.id = todos[i].id;

            todoListItem.style.borderLeft = this.priorityBuilder(todos[i].priority);


            let checkBox = createReadyElement("input");
            checkBox.type = "checkbox";
            checkBox.id = "todoState";
            checkBox.name = "state";

            todoListItem.appendChild(checkBox);

            let todoInformationContainer = createReadyElement("div" , "todo-information");

            let todoTitle = createReadyElement("h2" , "todo-title" , todos[i].title);
            let todoDescription = createReadyElement("p" , "todo-description" , todos[i].description);
            let todoCreationDate = createReadyElement("p" , "todo-creationdate" , todos[i].creationDate);
            let todoDueDate = createReadyElement("p" , "todo-duedate" , todos[i].dueDate);

            let datesContainer = createReadyElement("p" , "dates-container" , "");
            datesContainer.innerHTML = `Created : ${todoCreationDate.innerText} - Due : ${todoDueDate.innerText}`;

            todoInformationContainer.append(todoTitle , todoDescription , datesContainer);
            todoListItem.appendChild(todoInformationContainer);

            let buttonContainer = createReadyElement("div" , "todo-control");

            // edit button
            let editButton = createReadyElement("button");
            this.ButtonBuilder(editButton , editIcon , "Edit Todo Icon")
            
            // delete button
            let deleteButton = createReadyElement("button");
            this.ButtonBuilder(deleteButton , deleteIcon , "Delete Todo Icon")


            deleteButton.addEventListener("click" , async () => {
                const { loadTodo } = await import("../modules/loadTodo.js");
                deleteTodo(todos[i].id);
                loadTodo(option);
            })

            editButton.addEventListener("click" , () => {
                loadEditTodoForm(todos[i]);

                const addForm = document.querySelector(".add-form");

                setCloseButton(addForm);
                setPriorityButtons(addForm);

                addForm.style.display = "flex";
                addForm.classList.remove("hideForm")
                addForm.classList.add("showForm");
            })

            buttonContainer.append(editButton , deleteButton);
            todoListItem.appendChild(buttonContainer);

            todosContainer.appendChild(todoListItem);
        }
        content.appendChild(todosContainer);
    }
}

class todayTodoBuilder extends inboxTodoBuilder
{
    buildTodo(todos , option , todosContainer)
    {
        const todayDate = format(new Date() , 'yyyy-MM-dd');
        
        const content = document.getElementById("content");
        content.dataset.currentContent = "today";
        
        for(let i = 0 ; i < todos.length ; i++)
        {
            if(todos[i].creationDate == todayDate)
            {
                let todoListItem = createReadyElement("li" , "todo-item");
                todoListItem.dataset.id = todos[i].id;

                todoListItem.style.borderLeft = this.priorityBuilder(todos[i].priority);


                let checkBox = createReadyElement("input");
                checkBox.type = "checkbox";
                checkBox.id = "todoState";
                checkBox.name = "state";

                todoListItem.appendChild(checkBox);

                let todoInformationContainer = createReadyElement("div" , "todo-information");

                let todoTitle = createReadyElement("h2" , "todo-title" , todos[i].title);
                let todoDescription = createReadyElement("p" , "todo-description" , todos[i].description);
                let todoCreationDate = createReadyElement("p" , "todo-creationdate" , todos[i].creationDate);
                let todoDueDate = createReadyElement("p" , "todo-duedate" , todos[i].dueDate);
                
                let datesContainer = createReadyElement("p" , "dates-container" , "");
                datesContainer.innerHTML = `Created : ${todoCreationDate.innerText} - Due : ${todoDueDate.innerText}`;

                todoInformationContainer.append(todoTitle , todoDescription , datesContainer);
                todoListItem.appendChild(todoInformationContainer);

                let buttonContainer = createReadyElement("div" , "todo-control");

                // edit button
                let editButton = createReadyElement("button");
                this.ButtonBuilder(editButton , editIcon , "Edit Todo Icon")
                
                // delete button
                let deleteButton = createReadyElement("button");
                this.ButtonBuilder(deleteButton , deleteIcon , "Delete Todo Icon")


                deleteButton.addEventListener("click" , async () => {
                    const { loadTodo } = await import("../modules/loadTodo.js");
                    deleteTodo(todos[i].id);
                    loadTodo(option);
                })

                editButton.addEventListener("click" , () => {
                    loadEditTodoForm(todos[i]);

                    const addForm = document.querySelector(".add-form");

                    setCloseButton(addForm);
                    setPriorityButtons(addForm);

                    addForm.style.display = "flex";
                    addForm.classList.remove("hideForm")
                    addForm.classList.add("showForm");
                })

                buttonContainer.append(editButton , deleteButton);
                todoListItem.appendChild(buttonContainer);

                todosContainer.appendChild(todoListItem);
            }
            content.appendChild(todosContainer);
        }
    }
}

class weekTodoBuilder extends inboxTodoBuilder
{
    buildTodo(todos , option , todosContainer)
    {

        const content = document.getElementById("content");
        content.dataset.currentContent = "week";
        
        for(let i = 0 ; i < todos.length ; i++)
        {
            if(isThisWeek(todos[i].creationDate))
            {
                let todoListItem = createReadyElement("li" , "todo-item");
                todoListItem.dataset.id = todos[i].id;

                todoListItem.style.borderLeft = this.priorityBuilder(todos[i].priority);


                let checkBox = createReadyElement("input");
                checkBox.type = "checkbox";
                checkBox.id = "todoState";
                checkBox.name = "state";

                todoListItem.appendChild(checkBox);

                let todoInformationContainer = createReadyElement("div" , "todo-information");

                let todoTitle = createReadyElement("h2" , "todo-title" , todos[i].title);
                let todoDescription = createReadyElement("p" , "todo-description" , todos[i].description);
                let todoCreationDate = createReadyElement("p" , "todo-creationdate" , todos[i].creationDate);
                let todoDueDate = createReadyElement("p" , "todo-duedate" , todos[i].dueDate);
                
                let datesContainer = createReadyElement("p" , "dates-container" , "");
                datesContainer.innerHTML = `Created : ${todoCreationDate.innerText} - Due : ${todoDueDate.innerText}`;

                todoInformationContainer.append(todoTitle , todoDescription , datesContainer);

                todoListItem.appendChild(todoInformationContainer);

                let buttonContainer = createReadyElement("div" , "todo-control");

                // edit button
                let editButton = createReadyElement("button");
                this.ButtonBuilder(editButton , editIcon , "Edit Todo Icon")
                
                // delete button
                let deleteButton = createReadyElement("button");
                this.ButtonBuilder(deleteButton , deleteIcon , "Delete Todo Icon")


                deleteButton.addEventListener("click" , async () => {
                    const { loadTodo } = await import("../modules/loadTodo.js");
                    deleteTodo(todos[i].id);
                    loadTodo(option);
                })

                editButton.addEventListener("click" , () => {
                    loadEditTodoForm(todos[i]);

                    const addForm = document.querySelector(".add-form");

                    setCloseButton(addForm);
                    setPriorityButtons(addForm);

                    addForm.style.display = "flex";
                    addForm.classList.remove("hideForm")
                    addForm.classList.add("showForm");
                })

                buttonContainer.append(editButton , deleteButton);
                todoListItem.appendChild(buttonContainer);

                todosContainer.appendChild(todoListItem);
            }
            content.appendChild(todosContainer);
        }
    }
}

class ProjectTodoBuilder extends inboxTodoBuilder
{
    buildTodo(todos , todosContainer , project)
    {
        const content = document.getElementById("content");
        content.dataset.currentContent = "project";

        for(let i = 0 ; i < todos.length ; i++)
        {
            if(todos[i].projectID == project.dataset.projectid)
            {
                let todoListItem = createReadyElement("li" , "todo-item");
                todoListItem.dataset.id = todos[i].id;
            
                todoListItem.style.borderLeft = this.priorityBuilder(todos[i].priority);
    
                let checkBox = createReadyElement("input");
                checkBox.type = "checkbox";
                checkBox.id = "todoState";
                checkBox.name = "state";
    
                todoListItem.appendChild(checkBox);
    
                let todoInformationContainer = createReadyElement("div" , "todo-information");
    
                let todoTitle = createReadyElement("h2" , "todo-title" , todos[i].title);
                let todoDescription = createReadyElement("p" , "todo-description" , todos[i].description);
                let todoCreationDate = createReadyElement("p" , "todo-creationdate" , todos[i].creationDate);
                let todoDueDate = createReadyElement("p" , "todo-duedate" , todos[i].dueDate);
                
                let datesContainer = createReadyElement("p" , "dates-container" , "");
                datesContainer.innerHTML = `Created : ${todoCreationDate.innerText} - Due : ${todoDueDate.innerText}`;

                todoInformationContainer.append(todoTitle , todoDescription , datesContainer);

                todoListItem.appendChild(todoInformationContainer);
    
                let buttonContainer = createReadyElement("div" , "todo-control");
    
                // edit button
                let editButton = createReadyElement("button");
                this.ButtonBuilder(editButton , editIcon , "Edit Todo Icon")

                // delete button
                let deleteButton = createReadyElement("button");
                this.ButtonBuilder(deleteButton , deleteIcon , "Delete Todo Icon")
    
                deleteButton.addEventListener("click" , async () => {
                    const { loadTodo } = await import("../modules/loadTodo.js");
                    deleteTodo(todos[i].id);
                    this.buildTodo(project);
                })

                editButton.addEventListener("click" , () => {
                    loadEditTodoForm(todos[i]);

                    const addForm = document.querySelector(".add-form");

                    setCloseButton(addForm);
                    setPriorityButtons(addForm);

                    addForm.style.display = "flex";
                    addForm.classList.remove("hideForm")
                    addForm.classList.add("showForm");
                })
    
                buttonContainer.append(editButton , deleteButton);
                todoListItem.appendChild(buttonContainer);
    
                todosContainer.appendChild(todoListItem);
            }
        }
    
        content.appendChild(todosContainer);
    }
}

export {inboxTodoBuilder , todayTodoBuilder , weekTodoBuilder , ProjectTodoBuilder}