function generateID(item)
{
    return `${item.counter++}`;
}

export {generateID}