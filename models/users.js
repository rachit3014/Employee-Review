// importing mongoose
const mongoose=require('mongoose');
//  creating Schema
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:
    {
        type:String,
        required:true
    },
    name:
    {
        type:String,
        require:true
    },
    isadmin:
    {
        type:Boolean,
        default:false
    },
    assign:[
        {
            type:mongoose.Schema.Types.ObjectId,
                    ref:'Assign'
        }
    ],
    recvied_feedback:
    [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Feedback'
        }
    ]
})
const User =mongoose.model('User',userSchema);
module.exports=User;