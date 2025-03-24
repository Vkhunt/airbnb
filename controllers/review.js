const review=require("../models/review.js");
const listing=require("../models/listing.js");
module.exports.createreview=async(req,res)=>{
    let list=await listing.findById(req.params.id);
    let newreview=new review(req.body.review);
    newreview.author=req.user._id;
    
    list.reviews.push(newreview);
     await newreview.save();
     await list.save();
     res.redirect(`/listing/${list.id}`);
 }

module.exports.deletereview=async(req,res)=>{
    let {id,reviewid}=req.params;
    await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewid}})
    await review.findByIdAndDelete (reviewid);
    
    
    res.redirect(`/listing/${id}`);
     }