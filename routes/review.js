const express=require("express");
const router=express.Router({mergeParams:true});
const wrapasync=require("../utils/wrapasync.js");
const Expresserror=require("../utils/expresserror.js");
const listing=require("../models/listing.js");
const {validatereview,isLoggedin,isReviewAuthor}=require("../middleware.js");
const review=require("../models/review.js");
const reviewController=require("../controllers/review.js");

          //review
// post route
router.post("/",isLoggedin,validatereview,wrapasync(reviewController.createreview));
 
  //delete review route
  router.delete("/:reviewid",isLoggedin,isReviewAuthor,wrapasync(reviewController.deletereview));

  module.exports=router;