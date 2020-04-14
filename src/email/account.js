const email = require('nodemailer')

const userid = process.env.EMAIL_USERNAME
const pwd = process.env.EMAIL_PASSWORD

const transporter = email.createTransport({
    service:'gmail',
    auth: {
        user:userid,
        pass:pwd
    }
});

const sendAccountCreationEmail = (name)=>{
    
    console.log('inside mail send method')
    
    const mailoptions = {
        from:'bibinthomas1991@gmail.com',
        to:'bibinthomas1991@gmail.com',
        subject:'Welcome to Task manager',
        text:'Hi , happy journey with task manager app'
    }

    console.log('mail options are '+mailoptions)
    transporter.sendMail(mailoptions, (error, info)=>{
        if(error){
            throw new Error('cannot send the email')
        }
    });

}


const sendAccountCancelEmail = (name)=>{

    const mailoptions = {
        from:'bibinthomas1991@gmail.com',
        to:'bibinthomas1991@gmail.com',
        subject:'Goodbye to Task manager',
        text:'Hi , thanks from task manager app'
    }

    transporter.sendMail(mailoptions, (error, info)=>{
        if(error){
            throw new Error('cannot send the email')
        }
    });

}



module.exports = {
    sendAccountCreationEmail:sendAccountCreationEmail,
    sendAccountCancelEmail:sendAccountCancelEmail
}