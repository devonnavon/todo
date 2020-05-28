import {Task} from './task'
import {Category} from './category'
//import moment from 'moment'

const sampleTask1 = Task('get something done')
const sampleTask2 = Task('get something ELSE done')
const sampleTask3 = Task('get something DONE')
const sampleTask4 = Task('get something mmore done')


const testCat = Category('work');

const testCat2 = Category('school');

testCat.addTask(sampleTask1);
testCat.addTask(sampleTask2);

testCat2.addTask(sampleTask2);
testCat2.addTask(sampleTask3);
testCat2.addTask(sampleTask4);


console.log(testCat.getTitle())
console.log(testCat.color)
console.log(testCat.getTasks())

console.log(testCat.getTasks()[1].getTitle())


console.log(testCat2.getTitle())
console.log(testCat2.color)
console.log(testCat2.getTasks())
console.log(testCat2.getTasks()[0].getTitle())

sampleTask2.setTitle('something different')

console.log('we change a title')


console.log(testCat.getTitle())
console.log(testCat.color)
console.log(testCat.getTasks())
console.log(testCat.getTasks()[1].getTitle())


console.log(testCat2.getTitle())
console.log(testCat2.color)
console.log(testCat2.getTasks())
console.log(testCat2.getTasks()[0].getTitle())