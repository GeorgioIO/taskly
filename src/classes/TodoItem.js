require("../modules/utilityFunction");

class TodoItem {
    static counter = 0;
    constructor(title , description , priority , dueDate , creationDate)
    {
        this.id = generateID(TodoItem);
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate;
        this.creationDate = creationDate;
    }
}


export {TodoItem}