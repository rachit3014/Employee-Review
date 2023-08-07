const User =require('../models/users');
const Assign =require('../models/assign');
const Feedback=require('../models/feedback');

// to make  admin
module.exports.make_admin =async function(req,res)
    
{
    try {
        if(req.user.isadmin)// if req user is admin
        {
            // if admin doesnot select any employee and making request to make admin
            if(req.body.emp_details==null)
            {
                req.flash('error','Please chosse any option');
                return res.redirect('back');
            }
            // finding employee and making it to admin
            let user= await User.findById(req.body.emp_details)
            if(user)
            {
             
                user.isadmin=true
                user.save();

                req.flash('sucess','Admin Created');
                return res.redirect('back');

            }
            
       }
        
        
        
    } catch (error) {
        req.flash('error',error);
        // console.log(error)
        return res.redirect('back');
        
    }
    
}

// to render list of employee page
module.exports.list_of_emp=async function(req,res)
{
    try {
        if(req.user.isadmin)// if req user is admin
        {
            // finding all the employee
            let list_of_emp =await User.find({});
            return res.render('list_of_emp',{
                title:'Employee Details',

                list_of_emp:list_of_emp
            })
        }
        
        
    } catch (error) {
        console.log(error);
        return res.redirect('back');
        
    }
}


// to render sign up page
module.exports.add_employee=async function(req,res)
{
    try {
        return res.render('signup',{
            title:'Create Account',

        });
        
    } catch (error) {
        console.log(error);
        return res.redirect('back');
        
    }

}



// to render assign task page
module.exports.assign_emp= async function(req,res)
{
    try {
        if(req.user.isadmin) // if req user is admin
        {
            let employee = await User.find({});
            let assign_list = await Assign.find({})
            // populate reviewto and reviewfrom
            .populate('reviewto reviewfrom')         
            return res.render('assign',{
                title:'Assign Task',
                employee:employee,
                assign_list:assign_list
             
            });

        }

        
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }

}



// to assign review to other employee
module.exports.assign_review= async function(req,res)
{
    
    try {
        if(req.user.isadmin) // if req user is admin

        {
               // if admin is making request without  selecting employee
            if (req.body.reviewfrom == req.body.reviewto || req.body.reviewfrom == null || req.body.reviewto == null)

        {
            req.flash('error','please select ');
            return res.redirect('back');
        }
        else
        {
            // finding employee
            let emp_review_from=await User.findById(req.body.reviewfrom);
            // finding employee
            let emp_review_to=await User.findById(req.body.reviewto);
            // creating  a assign task
            let re= await Assign.create({
                reviewto:emp_review_to,
                reviewfrom:emp_review_from,
                review_assign_by:req.user.id
    
            })
            emp_review_from.assign.push(re);
            emp_review_from.save();
            req.flash('sucess','sucessfully assigned');
            return res.redirect('back');
    
        }

        }
     
        
        
    } catch (error) {
        req.flash('error',error);

        // console.log(error)
        return res.redirect('back');
        
    }
   

}

// to delete assign task
module.exports.delete_assign= async  function(req,res)
{
    try {
        if(req.user.isadmin)
        {
            let task = await Assign.findByIdAndDelete(req.params.id);
            console.log(task.reviewfrom);
            let empID = task.reviewfrom
              await User.findByIdAndUpdate(empID,{$pull : {assign :req.params.id}});
            req.flash('sucess','Deleted sucessfully');
            return res.redirect('back');

        }

        
    } catch (error) {
        req.flash('error',error);
        // console.log(error)
        return res.redirect('back');
        
    }
}
  