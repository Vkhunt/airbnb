
const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const review =require("./review.js");
const listingSchema= new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
         url: String,
        filename: String,
    },
    price:Number,
    location:String,
    country:String, 
    reviews:[
    {
        type:Schema.Types.ObjectId,
        ref:"review",
    }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    category:{
        type:String,
        enum:["Mountains", "Arctic", "Farms", "Deserts", "Sea", "City", "Castles", "Camping"]
    }
});

listingSchema.post("findOneAndDelete",async(listing)=>{
   if(listing){
    await review.deleteMany({id:{$in: listing.reviews}});
   }
});



module.exports=mongoose.model("listing",listingSchema);

