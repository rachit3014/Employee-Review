// import express
const express=require('express');
// import router from express
const router= express.Router();
// import passport 
const passport =require('passport')
// import review file from controller folder
const review=require("../controllers/review")
// to add feedback
router.post('/add-review',passport.checkAuthentication,review.add_Review);
// to render reviews page
router.get('/reviews',passport.checkAuthentication,review.render_feedback);
// to delete feedback
router.get('/delete-feedback/:id',passport.checkAuthentication,review.delete_feedback);

module.exports=router