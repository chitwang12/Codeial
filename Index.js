const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./Config/mongoose');
const session = require('express-session');
const { urlencoded } = require('express');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);

app.use(express.urlencoded());

app.use(cookieParser());
//setting up static files access
app.use(express.static('./assets'));

//extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts',true);

//setting up layouts 
app.use(expressLayouts);



//Setting up View Engine
app.set('view engine', 'ejs');
app.set('views','./views');

// mongo store is used to store the session cookie in the db 
app.use(session({
    name:'Codeial',
    //to-do Change the secret before deploying to Prod
    secret:'somethingblah',
    saveUninitialized : 'false',
    resave : 'false',
    cookie : {
        maxAge : (1000*60*100)
    },
    store: new MongoStore(
    {
        mongooseConnection : db ,
        autoRemove : 'disabled'
    },
    function(err){
        console.log(err || 'connect-mongodb setup ok');
    }
    )
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use express router 
app.use('/',require('./routes'));

//Server Hit 
app.listen(port, function(err)
{
    if(err){
       //using interpolation in below line 
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port : ${port}`);
    
});