const express = require('express')
const Task = require('../model/task.js')
const auth = require('../middlewere/auth')

const router = new express.Router()



router.post('/task', auth, async (req, res) => {

    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    task.save().then(() => {
        res.send(task)
    }).catch((e) => {
        res.send(e)
    })
})

//api to get the task created by the current user
router.get('/fetchTasks', auth, async (req, res) => {

    const queries = {}
    const sortData = {}

    if (req.query.completed) {
        queries.completed = req.query.completed === 'true'
    }

    if (req.query.sortBy) {
        console.log('inside sort')
        const arr = req.query.sortBy.split(':')
        sortData[arr[0]] = arr[1] === 'asc' ? '1' : '-1'
    }

    try {
        await req.user.populate({
            path: 'tasks',
            match: queries,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort: sortData
            }
        }).execPopulate()
        res.send(req.user.tasks)

    } catch (e) {
        res.status(400).send()
    }

})




router.get('/fetchTask/:id', auth, async (req, res) => {
    const _id = req.params.id
    const task = await Task.findById(_id)
    if (req.user._id.toString() === task.owner.toString()) {
        res.send(task)
    } else {
        console.log('nit matching')
        res.send('You cannot access tasks created by others')
    }
})



router.patch('/task/:id', auth, async (req, res) => {
    const _id = req.params.id;
    const operation = Object.keys(req.body)
    const ops = ['completed', 'description']

    const isValidator = operation.filter(key => {
        return ops.includes(key)
    })

    if (isValidator.length < 1) {
        console.log('no key matches with allowed keys for update')
        res.send('error occure!. no key matches with allowed keys for update')
    }

    try {
        const task = await Task.findById(_id)
        if (req.user._id.toString() === task.owner.toString()) {
            const task1 = await Task.findByIdAndUpdate(_id, req.body, { new: true })
            res.send(task1)
        } else {
            console.log('nit matching')
            res.send('You cannot access tasks created by others')
        }
    } catch (e) {
        res.status(400).send()
    }

})


router.delete('/task/delete/:id', auth, async (req, res) => {
    const _id = req.params.id
    //console.id('id is '+_id)

    try {
        const task = await Task.findById(_id)
        if (task.owner.toString() === req.user._id.toString()) {
            console.log('matching ids')
            await Task.findByIdAndDelete(_id)
            res.send('deleted the task')
        } else {
            res.send('poyi swantam task delete cheyyado')
        }
    } catch (e) {
        res.send('error:exception occured')
    }
})



module.exports = router
