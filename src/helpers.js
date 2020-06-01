
const createDiv = (divClass,editable=false) => {
    let div = document.createElement('div');
    div.classList.add(divClass);
    if (editable) {
        div.setAttribute('contenteditable',true)
    }
    return div
}

// const createInput = (parentDiv, type, value, name) => {
//     input = document.createInput(parentDiv, 'checkbox','None', 'check')
    

// }

    // <input type="checkbox" value="None" id="status" name="check" checked />
    // <label for="status"></label>





const appendChildren = (parent, childrenArray) => {
    childrenArray.forEach(e => {parent.appendChild(e)});
}

export {createDiv, appendChildren}