const nodeMailer = require('../config/nodemailer');


//this is another way of exporting a method 
exports.newComment = (comment)=>{
    console.log('Inside new Comment Mailer');
    nodeMailer.transporter.sendMail({
        from:'chitwangandhi778@gmail.com',
        to:comment.user.email,
        subject : "New Comment Published!!",
        html :'<h1>Yup, Your Comment is now published!</h1>'
    },(err,info)=>{
        if(err){
            console.log('Error in sending mail ', err);
            return ;
        }
        console.log('Mail delivered',info);
        return ; 
    });
}