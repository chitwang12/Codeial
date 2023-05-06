const express = require('express');
const app = express();
const PORT = process.env.port || 8000;
const expressLayouts = require('express-ejs-layouts');


//before requiring the routes 
app.use(expressLayouts);

//Use Express Router 
app.use('/', require('./routes'));

//setup the view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(PORT,function(err){
    if(err)
    {
        console.log(`Error in running the application : ${err} `);
    }
    console.log(`Server is running successfully on port : ${PORT}`)
})