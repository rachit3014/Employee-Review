// import passport
const passport=require('passport');
// import passport local strategy
const LocalStragety=require('passport-local').Strategy
// import user model
const User=require('../models/users');
passport.use(new LocalStragety(
    {
        usernameField:'email',
        // to use flash message
        passReqToCallback:true
    },
   async function(req,email,password,done)
    {
        try {
            // find a user and establish identity
            let user=await User.findOne({email:email});
      
            if (!user || user.password != password)
            {
                req.flash('error','invalid user /password');
                return done(null,false);
            }
            return done(null,user);
            
        } catch (error) {
            // console.log(error)
            req.flash('error',error);
            return done(err);
            
        }
        
    }
))
// passport serialize User to decide which key is to be kept in cokkies
passport.serializeUser(function(user,done){
    done(null,user.id);
})

// deserializeUser the user from key in the cookie
passport.deserializeUser( async function(id,done){
    try {
          let user = await User.findById(id);
           return done(null,user);


        
    } catch (error) {
        console.log("error in finding user from passsport");
        return done(error);
        
    }
  
})

// checking Authentication
passport.checkAuthentication =function(req,res,next){
    // if user is signed in,then pass on the request at the next  function (controller action)
    if (req.isAuthenticated())
    {
        return next();

    }
    // if the user is not signed in 
    return res.redirect('/')
}
// set authenticated user to res.local.user
passport.setAuthenticatedUser =function(req,res,next){
    if (req.isAuthenticated())
    {
       res.locals.user=req.user
    }
    next();
}
module.exports=passport;