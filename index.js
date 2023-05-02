const express = require('express');
const app = express();
const PORT = process.env.port || 8000;


//Use Express Router 
app.use('/', require('./routes'));


app.listen(PORT,function(err){
    if(err)
    {
        console.log(`Error in running the application : ${err} `);
    }
    console.log(`Server is running successfully on port : ${PORT}`)
})