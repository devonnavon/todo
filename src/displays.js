import {Task} from './task'
import {Category} from './category'
import {createDiv, appendChildren} from './helpers'


const TaskDisplay = () => {
    
    const container = document.getElementById('task-list')


    const displayedTasks = [];

    const addTask = title => {
        displayedTasks.push(Task(title));
    }

    const getTask = i => (displayedTasks[i]);


    // const editNote = noteSring => {

    // }


    const displayTitle = () => {
        return createDiv('title')
    }

    const displayNotes = () => {
        return createDiv('notes');
    }

    const displayDueDate = () => {
        return createDiv('duedate');
    }

    const displayPriority = () => {
        return createDiv('priority');
    }

    const displayStatus = () => {
        let statusDiv = createDiv('status');
        
        let statusInput = document.createElement('INPUT');
        statusInput.setAttribute('type', 'checkbox');
        statusInput.setAttribute('value', 'None');
        statusInput.setAttribute('name', 'check');
        statusInput.setAttribute('id', 'status'); //some string manipulation to got like status_index i.e. (status_0)

        let statusLabel = document.createElement("LABEL");
        statusLabel.setAttribute('for','status'); //some string manipulation to got like status_index i.e. (status_0)

        statusDiv.appendChild(statusInput);
        statusDiv.appendChild(statusLabel);

        return statusDiv
    }
    
    const displayTask = taskObject => { //pass this index
        let taskDiv = createDiv('task')
        
        let titleDiv = displayTitle();
        let notesDiv = displayNotes();
        let dueDateDiv = displayDueDate();  
        let statusDiv = displayStatus();
        let priorityDiv = displayPriority();
        
        titleDiv.innerHTML = taskObject.getTitle();
        notesDiv.innerHTML = taskObject.getNotes();
        dueDateDiv.innerHTML = taskObject.getDueDate();
        priorityDiv.innerHTML = taskObject.getPriority();

        appendChildren(taskDiv, [statusDiv, titleDiv, notesDiv, dueDateDiv, priorityDiv]); 
        return taskDiv; 
    }

    const render = () => {
        displayedTasks.forEach(e => {  //change this to standard for loop and pass index here
            container.appendChild(displayTask(e));
        });
    }

    return {render, addTask, getTask}
}



export {TaskDisplay}