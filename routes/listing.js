const express=require("express");
const router=express.Router();
const wrapasync=require("../utils/wrapasync.js");
const listing=require("../models/listing.js");
const{isLoggedin,isOwner,validatelisting}=require("../middleware.js");
const listingController=require("../controllers/listing.js");
//multer is use for handling multipart/form-data,which used for uploading file
const multer=require("multer");
const{storage}=require("../cloudconfig.js");
//it's take data from url and automatically save in '/uploads' folder
const upload=multer({storage});



//indexroute
//create
router.route("/")
.get(wrapasync(listingController.index))
.post(isLoggedin,upload.single("listing[image]"),validatelisting,wrapasync(listingController.createlisting));
 
 //new  route
 router.get("/new",isLoggedin, listingController.newlisting);

router.route("/:id")
 //show route
//update route
 //delete route
 .get(wrapasync(listingController.showlisting))
 .put(isLoggedin,isOwner,upload.single("listing[image]"),validatelisting,wrapasync(listingController.updatelisting))
 .delete(isLoggedin,isOwner,wrapasync(listingController.deletelisting));
   
//edit route
   router.get("/:id/edit",isLoggedin,isOwner,wrapasync(listingController.editlisting));
   
   module.exports=router;