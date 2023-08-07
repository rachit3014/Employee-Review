// import express
const express =require('express');
// import passport
const passport=require('passport');
// import router from express
const router=express.Router();
const user=require('../controllers/user');
// it will render signup page
router.get('/sign-up',user.signnup);
//  it will craete a new user
router.post('/create',user.create);
// it will delete the user 
router.get('/delete-employee/:id',passport.checkAuthentication,user.delete_employee);
// it will logout the current user
router.get('/sign-out',user.destroysession);
// it will render home page
router.get('/home',passport.checkAuthentication,user.home);
// it will create new session for the user ,also check for authorization
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/'},
),user.createsession);

module.exports=router;