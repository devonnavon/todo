import {Task} from './task'
import {Category} from './category'
import {createDiv, appendChildren} from './helpers'


const TaskDisplay = (() => {
    
    const container = document.getElementById('task-list')
    const displayedTasks = [];

    const addTask = (title, description) => {
        displayedTasks.push(Task(title, description));
    }

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

    const displayCategory = taskObject => {
        let categoryDiv = createDiv('taskCategory');
        let dropButton = document.createElement('BUTTON')
        dropButton.classList.add('dropbtn');
        if(taskObject.getCategory()===null){dropButton.innerHTML = 'no category'}
        else {
            dropButton.innerHTML=taskObject.getCategory().getTitle();
            dropButton.style.backgroundColor = taskObject.getCategory().getColor();
        }
        
        let currentCats = CategoryDisplay.getDisplayedCategories();
        let content = createDiv('dropdown-content');
        currentCats.forEach(e=>{
            let contentElement = document.createElement('div');
            contentElement.innerHTML = e.getTitle();
            contentElement.style.backgroundColor = e.getColor();
            contentElement.addEventListener('click', elem=>{
                dropButton.innerHTML = e.getTitle(); 
                dropButton.style.backgroundColor = e.getColor();
                taskObject.setCategory(e);
                e.addTask(taskObject);
            });
            content.appendChild(contentElement);
            
        });
        categoryDiv.appendChild(dropButton);
        categoryDiv.appendChild(content);
        return categoryDiv
    }
    
    const displayTask = (taskObject,i) => { 
        taskObject.checkOverDue();
        
        let taskDiv = createDiv('task')
        
        if(taskObject.getOverDueStatus()){taskDiv.classList.add('overdue')}
        else {taskDiv.classList.remove('overdue')}
        
        let categoryDiv = displayCategory(taskObject);
        let titleDiv = displayTitle(taskObject);
        let notesDiv = displayNotes(taskObject);
        let dueDateDiv = displayDueDate(taskObject, i);  
        let statusDiv = displayStatus(i);
        let priorityDiv = displayPriority(taskObject);

        titleDiv.innerHTML = taskObject.getTitle();
        notesDiv.innerHTML = taskObject.getNotes();

        let dueDate = taskObject.getDueDate().format('YYYY-MM-DD')
        dueDateDiv.querySelector('.date').value = dueDate;

        appendChildren(taskDiv, [categoryDiv, statusDiv, titleDiv, notesDiv, dueDateDiv, priorityDiv]); 
        appendChildren(taskDiv, [statusDiv, titleDiv, notesDiv, categoryDiv,dueDateDiv, priorityDiv]); 
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

const CategoryDisplay = (()=>{
    const displayedCategories = [];
    const container = document.getElementById('category-list');

    const getDisplayedCategories = () => (displayedCategories)

    const addCategory = (title) => {
        displayedCategories.push(Category(title));
    }

    const displayTitle = categoryObject => {
        const div = createDiv('title', true);
        div.addEventListener('input', e=>{
            categoryObject.setTitle(div.innerHTML);
            TaskDisplay.render();
        })
        div.innerHTML = categoryObject.getTitle();
        return div
    }

    const displayColor = categoryObject => {
        const colorDiv = createDiv('color')
        colorDiv.style.color = categoryObject.getColor();
        colorDiv.innerHTML = '∆'
        colorDiv.addEventListener('click', e=> {
            categoryObject.newColor();
            colorDiv.style.color = categoryObject.getColor();
            TaskDisplay.render();
        })
        return colorDiv
    }

    const displayCategory = categoryObject => {
        const categoryDiv = createDiv('category');
        
        const colorDiv = displayColor(categoryObject);
        const titleDiv = displayTitle(categoryObject);

        appendChildren(categoryDiv, [colorDiv, titleDiv])
        return categoryDiv;
    }

    const displayNewCategoryButton = () => {
        let newCat = createDiv('newCategoryButton');
        newCat.innerHTML = '+';
        newCat.addEventListener('click', e=>{
            addCategory('New Category')
            render()
            TaskDisplay.render();
        })
        return newCat;
    }

    const render = () => {
        container.innerHTML='';
        if (displayedCategories.length===0) addCategory('King Shit');
        for (let i = 0; i < displayedCategories.length; i++) {
            container.appendChild(displayCategory(displayedCategories[i]))    
        }
        container.appendChild(displayNewCategoryButton());
    }

    return {render, getDisplayedCategories}
})();

const start = () => {
    CategoryDisplay.render();
    TaskDisplay.render();
}

export {start}