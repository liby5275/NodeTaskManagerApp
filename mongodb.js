const mongodb = require('mongodb')
const mongodbClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID

const connectionURL = 'mongodb://127.0.0.1/27017'

mongodbClient.connect(connectionURL, {useUnifiedTopology: true}, (error, client) => {
    
    if (error) {
        return console.log('error occured')
    }

    const db = client.db('task-manager')
 
    //creation and insertion


     /* db.collection('user').insertOne({
        name:'binson',
        age:27
    })  */

    /* db.collection('tasks').insertMany([
        {
            description :'learn node js',
            completed: true
        },
        {
            description: 'do some hands on ',
            completed:false
        },
        {
            description:'play some game',
            completed:true
        }],(error, response) =>{
           if(error){
               return console.log('error occured while inserting')
           }
           console.log(response.ops) 
        }
    ) */


    // read operation

   /*  db.collection('user').findOne({age:27}, (error, user) => {
        if(error){
            return console.error('error occured')
        }
        console.log(user)
    }) 

     db.collection('user').findOne({_id: new ObjectID("5e8ac5972752492dd8db4a74")}, (error, user) =>{
        console.log(user)
    })  

    db.collection('user').find({age:29}).toArray( (error, users) => {
        console.log(users)
    }) */


    //update operation using promise

    /* db.collection('user').updateMany({age:29},
    {
        $set:{
            name:'chcko'
        }
    }
    ).then(res => {
        console.log('response occured')
    }).catch(error =>{
        console.log('eerror occured')
    }) */


    //delete using promise 

    db.collection('user').deleteMany({age:29}).then(resp=>{
console.log('deleted')
    }).catch(error=>{
console.log('failed deletion')
    })


})