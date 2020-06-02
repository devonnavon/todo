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
        label.innerHTML = 'DUE  '

        let dateInput = document.createElement('INPUT');
        dateInput.setAttribute('type', 'date')
        dateInput.setAttribute('id', dateId)
        dateInput.setAttribute('value', 'None')
        dateInput.classList.add('date')

        dateInput.addEventListener('input',e=>{
            taskObject.setDueDate(dateInput.value);
            taskObject.checkOverDue()
            if (taskObject.getOverDueStatus()) {e.target.parentNode.parentNode.classList.add('overdue')}
            else {
                e.target.parentNode.parentNode.classList.remove('overdue')
                e.target.parentNode.parentNode.classList.add('task')
            }

        });


        dateDiv.appendChild(label)
        dateDiv.appendChild(dateInput)

        return dateDiv       
    }

    const displayPriority = (taskObject) => {
        let div = createDiv('priority');
        div.addEventListener('click',e=>{
            taskObject.setPriority()
            div.innerHTML = taskObject.getPriority();
        })
        div.innerHTML = taskObject.getPriority();
        return div
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
        taskObject.checkOverDue();
        
        let taskDiv = createDiv('task')
        
        if(taskObject.getOverDueStatus()){taskDiv.classList.add('overdue')}
        else {taskDiv.classList.remove('overdue')}

        let titleDiv = displayTitle(taskObject);
        let notesDiv = displayNotes(taskObject);
        let dueDateDiv = displayDueDate(taskObject, i);  
        let statusDiv = displayStatus(i);
        let priorityDiv = displayPriority(taskObject);

        titleDiv.innerHTML = taskObject.getTitle();
        notesDiv.innerHTML = taskObject.getNotes();

        let dueDate = taskObject.getDueDate().format('YYYY-MM-DD')
        dueDateDiv.querySelector('.date').value = dueDate;

        appendChildren(taskDiv, [statusDiv, titleDiv, notesDiv, dueDateDiv, priorityDiv]); 
        return taskDiv; 
    }

    const displayNewTaskButton = () => {
        let newTask = createDiv('newTaskButton');
        newTask.innerHTML = '+';
        newTask.addEventListener('click', e=>{
            addTask('What do you have to do?', 'Add a description of your task here...')
            render()
        })
        return newTask;
    }

    const render = () => {
        if (displayedTasks.length==0){
            addTask('What do you have to do?', 'Add a description of your task here...')
        }
        container.innerHTML=''
        for (let i = 0; i < displayedTasks.length; i++) {
            container.appendChild(displayTask(displayedTasks[i], i))    
        }
        container.appendChild(displayNewTaskButton())
    }

    return {render}
})();



export {TaskDisplay}