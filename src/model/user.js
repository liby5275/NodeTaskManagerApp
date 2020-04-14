const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                console.log('negative age')
                throw new Error('no negative age')
            }
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(data) {
            if (!validator.isEmail(data)) {
                console.log('no valid email')
                throw new Error('no valid email')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        validate(value) {
            console.log('validation')

        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar:{
        type:Buffer
    }

}, {
    timestamps:true
})



userSchema.virtual('mytasks', {
    ref: 'task',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.virtual('tasks', {
    ref: 'task',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.getJwtToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id }, 'mysecretkey')
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

// mrethod to remove the passowrd from the response.
//this beed not be called explictly.
//it automatically calls when we send res like res.send()
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

userSchema.statics.findAndVerifyCredentials = async (email, password) => {

    console.log('inside verify method')
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('no such email registered')
    }
    const isMatched = await bcrypt.compare(password, user.password)
    if (!isMatched) {
        console.log('passowrd doesnt match')
        throw new Error('password wrong')
    }

    console.log('returning user' + user)
    return user
}

userSchema.pre('save', async function (next) {
    console.log('inside pre')
    const user = this

    if (user.isModified('password')) {

        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})


const User = mongoose.model('user', userSchema)

module.exports = User