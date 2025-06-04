import { format , isThisWeek} from "date-fns";


export function setTodoCounter(type)
{
    
    const parsedInboxTodos = JSON.parse(localStorage.getItem("inboxTodos"))
    var counter = 0;
    if(type === "inbox")
    {
        // const todoCounter = createReadyElement("div" , "todos-counter" , "");
        // document.getElementById("inbox").appendChild(todoCounter);
        document.querySelector(".todos-counter").innerHTML = parsedInboxTodos.length;
    }
    else if(type === "today")
    {
        for(let i = 0 ; i < parsedInboxTodos.length ; i++)
        {
            if(parsedInboxTodos[i].creationDate === format(new Date() , "MM-dd-yyyy"))
            {
                counter++;
            }
        }
        document.querySelector(".todos-counter").innerHTML = counter;
    }
    else if(type === "week")
    {
        for(let i = 0 ; i < parsedInboxTodos.length ; i++)
        {
            if(isThisWeek(parsedInboxTodos[i].creationDate))
            {
                counter++;
            }
        }
        document.querySelector(".todos-counter").innerHTML = counter;
    }
}