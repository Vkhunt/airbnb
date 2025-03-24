const express=require("express");
const router=express.Router();
const wrapasync=require("../utils/wrapasync.js");
const User=require("../models/user.js");
const passport=require("passport");
const {saveRedirectUrl}=require("../middleware.js");
const userController=require("../controllers/user.js")

//sign up
router.route("/signup")
.get((req,res)=>{
    res.render("users/signup.ejs");
})
.post(wrapasync(userController.signup));

//login 

router.route("/login")
.get((req,res)=>{
   res.render("users/login.ejs");
})
.post(saveRedirectUrl ,
    passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),
userController.login);
 
router.get("/logout",userController.logout);
module.exports=router;