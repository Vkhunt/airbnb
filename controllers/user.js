const User=require("../models/user.js");

module.exports.signup=async(req,res)=>{
    try{
 let {username,email,password}=req.body;
  const newUser= new  User({email,username});
  const registeredUser=await User.register(newUser,password);
   req.login(User,(err)=>{
    if(err){
        return next(err);
    }
    req.flash("success","user was registered");
    res.redirect("/listing");
   });
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");  
    }
}
module.exports.login=async(req,res)=>{
    req.flash("success","welcome to wanderlust,You are successfully loged in");
    let redirectUrl=res.locals.redirectUrl || "/listing";
    res.redirect(redirectUrl);
}
module.exports.logout=(req,res)=>{
    req.logout((err)=>{
        if(err){
           return next(err);
        }
        req.flash("success","You are successfully logout");
        res.redirect("/listing");    
    });
}