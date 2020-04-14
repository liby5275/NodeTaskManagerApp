const express = require('express')
require('./database/mongoose.js')

const userRouter = require('./routers/user-router')
const taskRouter = require('./routers/task-router.js')

const port = process.env.PORT

const app = express()

/* app.use((req, res, next) => {
    if(req.method === 'GET'){
        return res.send('GET requests blocked')
    } else {
        next()
    }
}) */

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)



app.listen(port, () => {
    console.log('server up on port '+port)
})

