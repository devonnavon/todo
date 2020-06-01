import {Task} from './task'
import {Category} from './category'
import {createDiv, appendChildren} from './helpers'


const TaskDisplay = (() => {
    
    const container = document.getElementById('task-list')


    const displayedTasks = [];

    const addTask = (title, description) => {
        displayedTasks.push(Task(title, description));
    }

    const getTask = i => (displayedTasks[i]);

    const displayTitle = taskObject => {
        let div = createDiv('title', true)
        div.addEventListener('input', e=>{
            taskObject.setTitle(div.innerHTML)
        });
        return div
    }

    const displayNotes = taskObject => {
        let div = createDiv('notes', true);
        div.addEventListener('input', e=>{
            taskObject.setNotes(div.innerHTML)
        });
        return div
    }

    const displayDueDate = (taskObject,i) => {
        let dateDiv = createDiv('duedate');
        let dateId = ['duedate',i].join('-');

        let label = document.createElement("LABEL");
        label.setAttribute('for',dateId); 

        let dateInput = document.createElement('INPUT');
        dateInput.setAttribute('type', 'date')
        dateInput.setAttribute('id', dateId)
        dateInput.classList.add('date')

        let timeId = ['duetime',i].join('-');

        let timelabel = document.createElement("LABEL");
        timelabel.setAttribute('for',timeId); 
        timelabel.innerHTML = 'Due:'

        let timeInput = document.createElement('INPUT');
        timeInput.setAttribute('type', 'time')
        timeInput.setAttribute('id', timeId)
        timeInput.classList.add('time')

        dateDiv.appendChild(timelabel)
        dateDiv.appendChild(timeInput)

        dateDiv.appendChild(label)
        dateDiv.appendChild(dateInput)

        return dateDiv       
    }

    const displayPriority = () => {
        return createDiv('priority');
    }

    const displayStatus = i => {
        let statusDiv = createDiv('status');        
        let statusId = ['status',i].join('-')

        let statusInput = document.createElement('INPUT');
        statusInput.setAttribute('type', 'checkbox');
        statusInput.setAttribute('value', 'None');
        statusInput.setAttribute('name', 'check');
        statusInput.setAttribute('id', statusId); 

        let statusLabel = document.createElement("LABEL");
        statusLabel.setAttribute('for',statusId); 

        statusDiv.appendChild(statusInput);
        statusDiv.appendChild(statusLabel);

        return statusDiv
    }
    
    const displayTask = (taskObject,i) => { 
        let taskDiv = createDiv('task')
        
        let titleDiv = displayTitle(taskObject);
        let notesDiv = displayNotes(taskObject);
        let dueDateDiv = displayDueDate(taskObject, i);  
        let statusDiv = displayStatus(i);
        let priorityDiv = displayPriority();

        titleDiv.innerHTML = taskObject.getTitle();
        notesDiv.innerHTML = taskObject.getNotes();

        let dueDate = new Date(taskObject.getDueDate().format('LLL'))

        dueDateDiv.querySelector('.time').valueAsDate = dueDate;
        dueDateDiv.querySelector('.date').valueAsDate = dueDate;

        appendChildren(taskDiv, [statusDiv, titleDiv, notesDiv, dueDateDiv, priorityDiv]); 
        return taskDiv; 
    }

    const displayNewTaskButton = () => {
        let newTask = createDiv('newTaskButton');
        newTask.innerHTML = '+';
        newTask.addEventListener('click', e=>{
            addTask('task', 'initial description')
            render()
        })
        return newTask;
    }

    const render = () => {
        container.innerHTML=''
        for (let i = 0; i < displayedTasks.length; i++) {
            container.appendChild(displayTask(displayedTasks[i], i))    
        }
        container.appendChild(displayNewTaskButton())
    }

    return {render, addTask, getTask}
})();



export {TaskDisplay}