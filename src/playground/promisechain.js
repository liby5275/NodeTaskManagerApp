require('../database/mongoose')
const Task = require('../model/task.js') 
const User = require('../model/user.js')
/*
a promise method must either be use with then() and catch() method or with 
async-await combo.
*/
//using promise chain
/* Task.findByIdAndUpdate('5e8d645f5a8690136887521c',{completed:false}).then(task =>{
    console.log(task)
    return Task.countDocuments({completed:false}).then(count=>{
        console.log(count)
    }).catch(e=>{
        console.log(e)
    })
}) */

//using async-await
const doWork= async ()=>{
    const user =  await User.findByIdAndUpdate('5e8c38565ea5f1302808cb3b',{age:25})
    console.log('user')
    const count = await User.countDocuments({age:25})
    console.log('count')
    return count
}

doWork().then(count=>{
    console.log('count '+count)
})
