//1.1 no 
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 8000;
const expressLayouts = require('express-ejs-layouts');
const db =require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const flash = require('connect-flash');
const customMware=require('./config/middleware');


app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));
app.use(expressLayouts);
app.use('/uploads',express.static(__dirname+'/uploads'));

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name:'Sociade',
    secret:'cheatingnii',
    saveUninitialized:false,
    resave:false,
    cookie:{maxAge:(1000*60*100)}
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(passport.setAuthenticatedUser);

app.use(flash());

app.use(customMware.setFlash);

app.use('/',require('./routes')); 


//1.2 no
app.listen(port,function(err){
    if(err){
        console.log(`Error in firing up Express : ${err}`);
    }
    console.log(`Server is up at : ${port}`);
});