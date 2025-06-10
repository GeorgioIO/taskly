function generateID(item)
{
    const prefix = item === "Project" ? "P" : "T";
    const randomNumber = Math.floor(100 + Math.random() * 900);
    return `${prefix}${randomNumber}`;
}


function createReadyElement(type , givenClass="" , text="")
{
    let element = document.createElement(type);
    
    if(givenClass)
    {
        element.classList.add(givenClass);
    }
    
    if(text)
    {
        element.innerText = text;
    }

    return element;
}


export {createReadyElement , generateID}