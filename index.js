const express = require('express');
const app = express();
const PORT = process.env.port || 8000;
const expressLayouts = require('express-ejs-layouts');


app.use(express.static('./'))

//must be before requiring the routes as the layouts have to be rendered before the routes .
app.use(expressLayouts);
//extract style and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

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