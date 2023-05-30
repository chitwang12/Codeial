const express = require('express');
const app = express();
const PORT = process.env.port || 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
//used for session cookie 
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const { default: mongoose } = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

//It should be done before the view getting rendered as the scss renders the file and return them to css in assets folder from there the routes , controllers take on the following !!
app.use(sassMiddleware({

        src : './assets/scss',
        dest : './assets/css',
        debug : true,
        outputStyle : 'extended',
        prefix : '/css'
}));

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));
app.use('/uploads',express.static(__dirname + '/uploads'));

//must be before requiring the routes as the layouts have to be rendered before the routes .
app.use(expressLayouts);
//extract style and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//setup the view engine
app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name:'codeial',
    //To do change the secret before deployment to production
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false, //if the session data i.e. the user data is not changed so there is no need to save it again and again and again.
    cookie:{
        maxAge:(1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongooseConnection : mongoose.connection,
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

//Will use the flash connect here just after the session cookies as it uses session cookies
app.use(flash());
app.use(customMware.setFlash);
//Use Express Router 
app.use('/', require('./routes'));

app.listen(PORT,function(err){
    if(err)
    {
        console.log(`Error in running the application : ${err} `);
    }
    console.log(`Server is running successfully on port : ${PORT}`)
})