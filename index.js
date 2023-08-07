// importing express
const express=require('express');
//  setting a port number
const port=8000;
// calling the Web-Framework
const app=express();
// importing ejs layout
const expressLayout=require('express-ejs-layouts');
// importing mongoose database
const db=require('./config/mongoose');
// to use layouts 
app.use(expressLayout);
// setting these to layout so that script and style file can move to head and bottom in layout.
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
// importing express session for storing session data
const session=require('express-session');
// importing passport
const passport=require('passport');

const passportLocal=require('./config/passport-local-stragety');
const MongoStore = require('connect-mongo');
const flash=require('connect-flash');
const customMware = require('./config/midilware');


// to parse the body of the req
app.use(express.urlencoded());
// 
app.set('view engine','ejs');
app.set('views','./views');
app.use(express.static('./assets'));
app.use(session({
    name:'employe',
    //TO do later   
    secret:'ertyui',
    saveUninitialized:false,
    resave:false,
    Cookie:
    {
        maxAge:(1000*60*100)
    },
    //to store the session in mongo db
        // store:new MongoStore({
        //     mongooseConnection: db,
        //     autoRemove: 'disabled'
        // },
        store: MongoStore.create({
            // mongoUrl:"mongodb://127.0.0.1:27017/empnode_development",
            mongoUrl:"mongodb+srv://rachitkumar3014:kNsL9d6Oyjm6z5q8@cluster0.wrs2bos.mongodb.net/?retryWrites=true&w=majority",
            autoRemove: 'disabled'
        })

}));     
app.use(passport.initialize());
app.use(passport.session());   
app.use(passport.setAuthenticatedUser);  
app.use(flash())  ;     
app.use(customMware.setflash);                                                                                                                                                                                                                                                                                
app.use('/',require('./routes'));
// server is start listening
app.listen(port,function(err)
{
    if(err)
    {
        console.log(err,'error in running server');

    }
    console.log("yup  server is running",port);
}) 
