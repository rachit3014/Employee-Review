const User =require('../models/users');
const Assign =require('../models/assign');
const Feedback=require('../models/feedback');

// to create review
module.exports.add_Review= async function(req,res)
{
    try {
        let assign = await Assign.findById(req.body.add_review);
        console.log(assign)
        let assignby =await User.findById(assign.review_assign_by);
        console.log(assignby.name)  
        let emp =await User.findById(assign.reviewto);
        if(emp)
        {
            let feedback_context = await Feedback.create({
                review_to_emp:emp.name,
                review_from_emp:req.user.name,
                context:req.body.context,
                requested_feedback_by:assignby.name
    
    
            });
            if(feedback_context)
            {
                let feedback = emp.recvied_feedback.push(feedback_context);
                emp.save();
                let assign_delete= await Assign.findByIdAndDelete(req.body.add_review);
                req.flash('sucess','Feeback created ');
                return res.redirect('back');
              
            }
           
            
        }
    
        return res.redirect('back');
        
    } catch (error) {
        req.flash('error',error);
        // console.log(error)
        return res.redirect('back');
        
    }
}
//  to delete feeback
module.exports.delete_feedback= async function(req,res)
{
    try {
        if(req.user.isadmin) // if req user is admin then delete feedback
        {
            let feedback_delete= await Feedback.findByIdAndDelete(req.params.id);
            req.flash('sucess','Deleted sucessfully');
            return res.redirect('back');
        }
        
    } catch (error) {
        req.flash('error',error);
        // console.log(error)
        return res.redirect('back');
        
    }
}
//  to render the all the feedback in reviews page
module.exports.render_feedback = async function (req,res)
{
    try {
        if(req.user.isadmin)
        {
            let feedback =await Feedback.find({});
             return res.render('reviews',{
                title:'Feedback Details ',
                feedback:feedback
              
             });
            

        }

    } catch (error) {
        Console.log(error);
        return res.redirect('back');
        
    }
     
}
