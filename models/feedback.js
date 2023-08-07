// import mongoose
const mongoose =require('mongoose');
//  creating Schema
const feedbackSchema=  new mongoose.Schema({
    review_to_emp:
    {
        type:String,
        require:true
    },
    context:
    {
        type:String,
        require:true
    },
    review_from_emp:
    {
        type:String,
        require:true

    },
    requested_feedback_by:
    {
        type:String,
        require:true
    }

})
const Feedback= mongoose.model('Feedback',feedbackSchema);
module.exports=Feedback;