const Listing=require("./models/listing.js");
const Review=require("./models/review.js");
const Expresserror=require("./utils/expresserror.js");
const {listingSchema,reviewSchema}=require("./schema.js");


module.exports.isLoggedin=(req,res,next)=>{
if(!req.isAuthenticated()){
    req.session.redirectUrl=req.originalUrl;
    req.flash("error","You must be loged in");
    return res.redirect("/login");
  }
 next();
};

module.exports.saveRedirectUrl=(req,res,next) =>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
   
    next();
};


module.exports.isOwner=async (req,res,next)=>{
     let {id}=req.params; 
     let list= await Listing.findById(id);
     if( !list.owner.equals(res.locals.currUser._id)){
      req.flash("error","You are not owner of the listing");
      return res.redirect(`/listing/${id}` );
     }
     next();
};
//validate listing at server side
module.exports.validatelisting=(req,res,next)=>{
    let {error}= listingSchema.validate(req.body);
  if(error){
    let errmsg=error.details.map((el)=>el.message).join(",");
    throw new Expresserror(400,errmsg);
  }else{
    next();
  }
  };

  //validate review at server side
  module.exports.validatereview=(req,res,next)=>{
      let {error}= reviewSchema.validate(req.body);
    if(error){
      let errmsg=error.details.map((el)=>el.message).join(",");
      throw new Expresserror(400,errmsg);
    }else{
      next();
    }
    };

    module.exports.isReviewAuthor=async (req,res,next)=>{
        let {reviewid,id}=req.params; 
        let review= await Review.findById(reviewid);
        if( !review.author.equals(res.locals.currUser._id)){
         req.flash("error","You did not create this review so you can not delete this review");
         return res.redirect(`/listing/${id}` );
        }
        next();
   }