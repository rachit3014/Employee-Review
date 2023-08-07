// import mongoose
const mongoose=require('mongoose');
//  creating Schema
const assignSchema=new mongoose.Schema({
    reviewto:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
        ,
        reviewfrom:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        review_assign_by:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
            
        }
    
})

const Assign=mongoose.model('Assign',assignSchema);
module.exports=Assign;