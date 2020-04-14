const express = require('express')
const multer = require('multer')
const User = require('../model/user.js')
const auth = require('../middlewere/auth')
const account = require('../email/account')

const router = new express.Router()


const upload = multer({
    limits: {
        fileSize: 500000 //0.5 MB
    },
    fileFilter(req, file, cb) {

        if (!file.originalname.match(/\.(jpg|JPG|jpeg)$/)) {

            return cb(new Error('please upload a jpg image'))
        } else {
            cb(undefined, true) //cb should be called with a boolean to indicate that file should be accepted or rejected
        }
    }
})



router.post('/user/login', async (req, res) => {
    try {
        console.log('inside login methd')
        const user = await User.findAndVerifyCredentials(req.body.email, req.body.password)
        const token = await user.getJwtToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})


router.post('/user/logout',auth, async (req,res) => {

    console.log('incoming token is '+req.token)
    req.user.tokens = req.user.tokens.filter((token) => {
        console.log('token is '+token)
        return token.token !== req.token
    })

    console.log('current tokens are '+req.user.tokens)
    await req.user.save()
    res.send('Logged out from the current session')
})


router.post('/user/logoutAll',auth, async (req,res)=> {
    req.user.tokens = []
    await req.user.save()
    res.send('Logged out from all sessions')

})

router.post('/addUser', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.getJwtToken()
        account.sendAccountCreationEmail(user.name)
        res.send({ user,token })
    } catch (e) {
        res.status(400).send()
    }
})


router.get('/fetchUsers/me', auth, async (req, res) => {
    console.log('out to fetch users list')
    res.send(req.user)
})




/* router.get('/fetchUser/:id', async (req, res) => {
    const _id = req.params.id
    console.log('out to fetch user details of id ' + _id)

    try {
        const user = await User.findById(_id)
        console.log(user)
        res.send(user)
    } catch (e) {
        res.send(e)
    }
}) */

router.patch('/user',auth, async (req, res) => {

    const operation = Object.keys(req.body)
    const ops = ['name', 'email', 'age', 'password']

    const isValidator = operation.filter(key => {
        return ops.includes(key)
    })

    if (isValidator.length < 1) {
        console.log('no key matches with allowed keys for update')
        res.send('error occure!. no key matches with allowed keys for update')
    }


    try {
        const user = await User.findById(req.user._id)
        isValidator.forEach(key => {
            user[key] = req.body[key]
        })
        await user.save()
        //const user = await User.findByIdAndUpdate(_id, req.body,{new:true}) - this code can be one liner for update operation
        res.send(user)
    } catch (e) {
        res.send(e)
    }

})

router.delete('/user',auth, async (req, res) => {
    console.log('out to delete a user')
    try {
        const user = await User.findByIdAndDelete(req.user._id)
        account.sendAccountCancelEmail(user.name)
        res.send(user)
    } catch (e) {
        res.send(e)
    }
})


router.post('/user/me/avatar', auth, upload.single('myFile'), async (req, res) => {
    req.user.avatar = req.file.buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => { // this is the thrid argument of the router post method which itself is a method
    //here this method must have four arguments, then only express knows that it is for error handling
    res.status(400).send({ error: error.message })
})


router.delete('/user/me/avatar', auth, async (req, res) => {

    console.log('inside dleete profile ic')
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})


router.get('/user/me/avatar/:id', async (req, res) => {
    const _id = req.params.id
    console.log('id is '+_id)
    try {
        const user = await User.findById(_id)
        if (!user || !user.avatar) {
            throw new Error()
        }
        res.set('Content-Type','image/jpg')
        res.send(user.avatar)
    } catch (e) {
        res.send({error:'Error happened'})
    }
})


module.exports = router


