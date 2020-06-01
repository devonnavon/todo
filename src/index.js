// import {Task} from './task'
// import {Category} from './category'
import {appendChildren} from './helpers'
import {TaskDisplay} from './displays'

import moment from 'moment'


TaskDisplay.addTask('Calculus and stuff')
TaskDisplay.addTask('Calcus and stuff')

let task0 = TaskDisplay.getTask(0)
let task1 = TaskDisplay.getTask(1)

task0.setDueDate(moment().add(10,'days'))
task1.setDueDate(moment().subtract(1,'days'))

task0.setNotes('- 6 practice problems page 184\n- review derivatives\n- case 24 from applied financial math courspack')
task1.setNotes('- 6 practice problems page 184\n- review derivatives\n- case 24 from applied financial math courspack')
task0.setPriority(0);
task1.setPriority(2);

TaskDisplay.render();


// //creating category
// const work = Category('work');
// const school = Category('school');
// const projects = Category('projects')

// work.addTasks([interviewPrep, workAndSchool])
// school.addTasks([mathHomeWork, groupProjectIdeas, workAndSchool])

// // console.log(groupProjectIdeas.getTitle())
// // console.log(displayTask(groupProjectIdeas))

// const workTasks = school.getTasks()
// const workDisplays = [];
// workTasks.forEach(e => {workDisplays.push(displayTask(e))});

// appendChildren(categoryList, workDisplays);