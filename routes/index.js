// import express
const express =require('express');
// import express router
const router=express.Router();
// import user file from controller folder
const user=require('../controllers/user');
router.get('/',user.sigin);
//  all the request with suffix (/user) will require the user file to compute
router.use('/user',require('./user'));
//  all the request with suffix (/user) will require the admin file to compute
router.use('/admin',require('./admin'));
//  all the request with suffix (/review) will require the review file to compute
router.use('/review',require('./review'));
module.exports=router;