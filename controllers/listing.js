const listing=require("../models/listing.js");
const {listingSchema}=require("../schema.js");


module.exports.index=async(req,res)=>{
    const alllisting=await listing.find({});
    res.render("listing/index.ejs",{alllisting});
   }

 module.exports.newlisting=(req,res)=>{
    res.render("listing/new.ejs");
   }  

module.exports.showlisting=async(req,res)=>{
    let {id}=req.params;
    const list = await listing.findById(id).
    populate({path:"reviews",populate:{path:"author"} }).populate("owner");
    
    if(!list){
      req.flash("error","Listing doesn't exists");
      res.redirect("/listing");
    }
    
     res.render("listing/show.ejs",{list});
   }
module.exports.createlisting=async(req,res,next)=>{
  let url=req.file.path;
  let filename=req.file.filename;
  
   let result= listingSchema.validate(req.body);
   if(result.error){
     throw new Expresserror(400,result.error);
   }
   const newlisting= new listing(req.body.listing);
   newlisting.owner=req.user._id;
   newlisting.image={url,filename};
   await newlisting.save();
  
   req.flash("success","New Listing created!");
   res.redirect("/listing");
   }

module.exports.editlisting=async(req,res)=>{
     let {id}=req.params;
     const list = await listing.findById(id); 
     if(!list){
      req.flash("error","Listing doesn't exists");
      res.redirect("/listing");
    }
      res.render("listing/edit.ejs",{list});
   }
module.exports.updatelisting=async(req,res)=>{
    let {id}=req.params;
    let list=await listing.findByIdAndUpdate(id,{...req.body.listing }) ;
   
   if(typeof req.file!=="undefined"){
    let url=req.file.path;
  let filename=req.file.filename; 
  list.image={url,filename};
  await list.save();
   }

    res.redirect(`/listing/${id}`);
   }
module.exports.deletelisting=async(req,res) =>{
    let {id}=req.params;
    let deletelisting=await listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted");
    res.redirect("/listing");
  }
