import moment from 'moment-timezone';
import {Category} from './category'


const Task = (initialTitle, initialDescription) => {
    //'use strict'
    //properties of task object
    let title = initialTitle;
    let notes = initialDescription;
    let isComplete = false;
    let isOverDue = false;
    let dueDate = moment().endOf('day'); //when set is a moment object 
    let priority = Priority();  //we need to create priority object
    let category = null; //we need to create category object

    //Create Read and Update Dekete functions
    const getTitle = () => (title);
    const setTitle = newTitle => {title = newTitle;}

    const getNotes = () => (notes);
    const setNotes = (newNote) => {notes = newNote;}

    const toggleComplete = () => {isComplete = isComplete ? false : true}
    const getCompletionStatus = () => (isComplete)

    const getDueDate = () => (dueDate);
    const setDueDate = (dateString) => {
        dueDate = moment(dateString);
        checkOverDue();
    }
    const removeDueDate = () => {dueDate = null;}

    const checkOverDue = () => {
        const now = moment();
        isOverDue = getDueDate().endOf('day').diff(now) < 0;
    }
    
    const getOverDueStatus = () => (isOverDue)

    const getPriority = () => (priority.getPriority());
    const setPriority = () => {
        priority.setPriority();
    }

    return {
        getTitle, 
        setTitle,
        getNotes, 
        setNotes, 
        toggleComplete, 
        getDueDate, 
        setDueDate,
        removeDueDate, 
        getOverDueStatus, 
        getCompletionStatus,
        getPriority,
        setPriority, 
        checkOverDue
    }
};

const Priority = () => {
    let priority = 0; 
    const types = ['!','!!','!!!']

    const setPriority = () =>{
        priority++;
        if(priority>2) priority=0;
    } 

    const getPriority = () => {
        return types[priority]
    }

    return {setPriority, getPriority}
}

export {Task}