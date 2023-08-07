// connecting to databse
const mongoose=require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/empnode_development');
mongoose.connect('mongodb+srv://rachitkumar3014:kNsL9d6Oyjm6z5q8@cluster0.wrs2bos.mongodb.net/?retryWrites=true&w=majority')
const db= mongoose.connection;
db.on('error',console.error.bind(console,'error connecting to'));
db.once('open',function(){
    console.log('sucesfully connected to db');
});
module.exports=db;