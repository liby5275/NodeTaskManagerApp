const mongoose = require('mongoose')
const validator = require('validator')

const dburl = process.env.MONGOOSE_DB_URL

mongoose.connect(dburl,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex:true
}) 

/*
const user = mongoose.model('user', {
    name:{
        type:String,
        required:true,
        trim:true
    },
    age:{
        type: Number,
        default:0,
        validate(value){
            if(value<0){
                console.log('negative age')
                throw error('no negative age')
            }
        }
    },
    email:{
        type:String,
        required:true,
        validate(data){
            if(!validator.isEmail(data)){
                console.log('no valid email')
                throw error('no valid email')
            }
        }
    },
     password:{
        type:String,
        required:true,
        minlength:6,
        validate(value) {
            console.log('validation')
            
        }
    } 
})

const user1 = new user({
    name:'bibin   ',
    age:29,
    email:'bibin@gmail.com',
    password:'password'
})

user1.save().then(response => {
console.log('inserted user data')
}).catch(error=>{
console.error('error happened while inserting')
})

/* 
const task = mongoose.model('task' ,{
    description:{
        type:String,
        required:true,
    },
    completed:{
        type:Boolean,
        required:true
    }
})

const task1 =  new task({
    description:'learn mongoose',
    completed:false
})

task1.save().then(response =>{
console.log('task data inserted')
}).catch(error=>{
    console.log('error occured')
}) */