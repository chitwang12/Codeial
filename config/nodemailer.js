const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');


//This is the part which sends the email 
let transporter = nodemailer.createTransport({
    service:'gmail',
    host : 'smtp.gmail.com',
    port: 587,
    secure : false,
    auth : {
        user :'chitwangandhi12@gmail.com',
        password :'Chitwan0211@@'
    }
});

//this defines the templates which are kept in views folder under mailers folder and this shows a template which gets render in a mail . 
let renderTemplate = (data,relativePath)=>{
    let mailHTML ;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){
                console.log('Error in rendering  template ');
                return }
            }
            )
            return mailHTML;
        };

        module.exports = {
            transporter : transporter,
            renderTemplate : renderTemplate
        }