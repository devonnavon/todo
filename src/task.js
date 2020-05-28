import moment from 'moment';

const Task = (initialTitle) => {
    //'use strict'
    //properties of task object
    let title = initialTitle;
    let description = '';
    let notes = ''
    let isComplete = false;
    let isOverDue = false;
    let dueDate = null; //when set is a moment object 
    let priority = Priority();  //we need to create priority object
    let category = null; //we need to create category object

    //Create Read and Update Dekete functions
    const getTitle = () => {return title;}
    const setTitle = newTitle => {title = newTitle;}
    
    const getDescription = () => {return description;}
    const setDescription = (newDescription) => {description = newDescription;}

    const getNotes = () => {return notes;}
    const setNotes = (newNote) => {notes = newNote;}

    const toggleComplete = () => {isComplete = isComplete ? false : true}
    const getCompletionStatus = () => (isComplete)

    const addDueDate = () => {
        dueDate = moment().endOf('day');
        //checkOverDue();
    }
    const getDueDate = () => {return dueDate;}
    const setDueDate = (momentObject) => {
        dueDate = momentObject;
        checkOverDue();
    }
    const removeDueDate = () => {dueDate = null;}

    const checkOverDue = () => {
        const now = moment();
        isOverDue = getDueDate().diff(now) < 0;
    }
    const getOverDueStatus = () => (isOverDue)

    return {
        getTitle, 
        setTitle,
        getDescription, 
        setDescription, 
        getNotes, 
        setNotes, 
        toggleComplete, 
        addDueDate, 
        getDueDate, 
        setDueDate,
        removeDueDate, 
        getCompletionStatus, 
        getOverDueStatus
    }

};

const Priority = () => {
    let priority = null; 
    const types = ['p1','p2','p3']

    const setPriority = priorityInt =>{
        priority = types[priorityInt];
    } 

    const getPriority = () => {
        return priority
    }

    return {setPriority, getPriority}
}


export {Task}