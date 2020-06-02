
const createDiv = (divClass,editable=false) => {
    let div = document.createElement('div');
    div.classList.add(divClass);
    if (editable) {
        div.setAttribute('contenteditable',true)
    }
    return div
}



const appendChildren = (parent, childrenArray) => {
    childrenArray.forEach(e => {parent.appendChild(e)});
}

export {createDiv, appendChildren}