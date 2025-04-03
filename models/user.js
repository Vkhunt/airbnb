const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const passportlocalmogoose=require("passport-local-mongoose");

const userSchema= new Schema({
    email:{
        type:String,
        required:true
     }
    });

userSchema.plugin(passportlocalmogoose);
 module.exports=mongoose.model("User",userSchema,"user");   