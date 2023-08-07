// import express
const express= require('express');
// import express router
const router=express.Router();
//  import  admin  file  from controller folder
const admin=require('../controllers/admin');
// import passport
const passport = require('passport');
// router.get('/',passport.checkAuthentication,admin.user)
//  to make admin
router.post('/make-admin',passport.checkAuthentication,admin.make_admin);
//  to disaply all the employee 
router.get('/employee-detail',passport.checkAuthentication,admin.list_of_emp);
// to render assign page
router.get('/assign-emp',passport.checkAuthentication,admin.assign_emp);
// to assign review task
router.post('/assign-review',passport.checkAuthentication,admin.assign_review);
// to delete assign task
router.get('/delete/:id',passport.checkAuthentication,admin.delete_assign);

router.get('/add-employee',passport.checkAuthentication,admin.add_employee);




module.exports=router;