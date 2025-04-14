function generateID(item)
{
    return `${item.counter++}`;
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