import {generateID} from "../modules/utilityFunction.js";
import { format } from "date-fns";


class TodoItem {
    static counter = 0;
    constructor(title , description , priority , dueDate)
    {
        this.id = generateID(TodoItem);
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate;

        this.creationDate = format(new Date() , 'MM-dd-yyyy');
    }
}


export {TodoItem}