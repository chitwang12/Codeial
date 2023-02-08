const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./Config/mongoose');
const { urlencoded } = require('express');

app.use(express.urlencoded());

app.use(cookieParser());
//setting up static files access
app.use(express.static('./assets'));

//extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts',true);

//setting up layouts 
app.use(expressLayouts);

// use express router 
app.use('/',require('./routes'));

//Setting up View Engine
app.set('view engine', 'ejs');
app.set('views','./views');

//Server Hit 
app.listen(port, function(err)
{
    if(err){
       //using interpolation in below line 
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port : ${port}`);
    
});