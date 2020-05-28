import {task} from './task'
import moment from 'moment'

const sampleTask = task('get something done')

console.log(sampleTask.getTitle())

sampleTask.addDueDate();


console.log(sampleTask.getDueDate());

const newDate = sampleTask.getDueDate().add(7,'years')

sampleTask.setDueDate(newDate)

console.log(sampleTask.getDueDate())

sampleTask.removeDueDate()

console.log(sampleTask.getDueDate())

console.log('not overdue:')
console.log(sampleTask.getOverDueStatus())

sampleTask.addDueDate()

console.log('not overdue:')
console.log(sampleTask.getOverDueStatus())

const testest = moment().subtract(7, 'years')
console.log(testest)


sampleTask.setDueDate(testest)

console.log('overdue:')
console.log(sampleTask.getOverDueStatus())
