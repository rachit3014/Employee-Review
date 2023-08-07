const User= require('../models/users');
const Feedback =require('../models/feedback');
const Assign = require('../models/assign');


// to render sign in page
module.exports.sigin=function(req,res)
{
    if(req.isAuthenticated())
    {
        return res.redirect('/user/home');
    }
    return res.render('login',{
        title:'Login',

    });
}

//  to render signup page 
module.exports.signnup=function(req,res)

{
    if(req.isAuthenticated())
    {
        return res.redirect('/user/home');
    }
    return res.render('signup',{
        title:'Sign_up',

    });
}

// to create a new user
module.exports.create= async function(req,res)
{
    try {
        if(req.body.password != req.body.confirm_password)
        {
            req.flash('error','Password not match');

            return res.redirect('back');
        }
        let user= await User.findOne({email : req.body.email});
        if(!user)
        {
           

               await User.create(req.body);
            // console.log(USer)
            
            if(req.user)
            {
                req.flash('sucess','Account created sucessfully');
                return res.redirect('/admin/employee-detail')
            }
            else
            {
                req.flash('sucess','Account created sucessfully');
                return res.redirect('/');
            }
                
        }
        else
        {
        req.flash('error','Account already exists');

        return res.redirect('back');
    
        }
        
    } catch (error) {
        console.log(error);
        return 
        
    }
}

//  to delete an employee 
module.exports.delete_employee= async function(req,res)
{
    try {
        if(req.user.isadmin) // if req user is admin
        {
            //  if req to delete super admin then it will not delete
            if(req.params.id == '64cc6ecca9665da20d305ea0')
            {
                req.flash('error','Unable to delete super admin');
                return res.redirect('back');

            }
            // to delete another employee
            else if(req.user.id != req.params.id)
            {
                let employee= await User.findByIdAndDelete(req.params.id);
                // deleteing assign task also from employee
                await Assign.deleteMany({reviewto: req.params.id});
                await Assign.deleteMany({reviewfrom: req.params.id});

                req.flash('sucess','Deleted Sucessfully');
                return res.redirect('back');
            }
            else{
                req.flash('error','Please request to another admin');

                return res.redirect('back');
            }
        }
        
    } catch (error) {
        req.flash('error',error)
        // console.log(error)
        return res.redirect('back');
        
    }
}


// creating session for login  
module.exports.createsession=function(req,res)
{
    req.flash('sucess','login in sucessfully');
    return res.redirect('/user/home');
    
}


// to render home page of admin and employee
module.exports.home= async function(req,res)
{
    try {
        if(req.user.isadmin)  // if req user is admin then render this page
        {            
                let emp_detail= await User.find({})
                // populate assign 
                .populate({
                    path:'assign',
                    populate:{
                        path:'reviewto reviewfrom',

                    },                                                
                });
                   
                let login_user= await User.findById(req.user.id)
                     // populate recvied feedback
                    .populate('recvied_feedback')
                    //populate assign
                    .populate({
                                path:'assign',
                                populate:{
                                    path:'reviewto reviewfrom',
                                }
                            });
               
                console.log(login_user)
                return res.render('admin',{
                    title:'Admin',
                       login_user:login_user,
                       emp_detail:emp_detail
                 }) ;               
        }
        else  // if req user is not admin then render this page
        {
            let login_User= await User.findById(req.user.id)
            //populate recived feedback
            .populate('recvied_feedback')
            .populate({
                //populate assign
                path:'assign',
                populate:{
                    path:'reviewto reviewfrom',
                }           
            });
            return res.render('addreview',{
                title:'Employee',
                login_User:login_User
            });
    
        }
        
    } catch (error) {
        console.log(error);
        return
        
    }
}
//  to logout user
module.exports.destroysession=function(req,res)
{
    try {
        req.logout(function(err){
            if(err)
            {
                console.log(err);
            }
            req.flash('sucess','logged out ');
            res.redirect('/');
        })
        
    } catch (error) {
        console.log(error);
        return
        
    }

}