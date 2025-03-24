if(process.env.NODE_ENV !="production"){
  require("dotenv").config();
}

const express=require("express");
const app=express();
const mongoose=require("mongoose");
const listing=require("./models/listing.js");
const path=require("path");
const methodoverride=require("method-override"); 
const ejsmate=require("ejs-mate");
const Expresserror=require("./utils/expresserror.js");
const session=require("express-session");
const flash=require("connect-flash");
const passport=require("passport");
const localStrategy=require("passport-local");  
const User=require("./models/user.js");

const listingrouter=require("./routes/listing.js");
const reviewrouter=require("./routes/review.js");
const userrouter=require("./routes/user.js");

const url="mongodb://127.0.0.1:27017/wanderlust";
main().then(()=>{
 console.log("mongo connected");
}).catch((err)=>{
  console.log(err);
});
async function main(){
    await mongoose.connect(url);
}
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"))
app.use(express.urlencoded({extended:true})); 
app.use(methodoverride("_method"));
app.engine("ejs",ejsmate);
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.json());

const sessionOptions={
  secret:"mysecreate",
  resave :false,
  saveUnintialized:true,
};


//trending
app.get("/listing/trending",async(req,res)=>{
 const trendlisting=await listing.find({}).sort({price: -1}).limit(5);
    res.render("icons/trending.ejs",{trendlisting});
});
//icon
app.get("/listing/category/:category", async (req, res) => {
  try {
    const { category } = req.params; // Get category from URL
    console.log("Category requested:", category);

    // Fetch listings that match the category (case-insensitive)
    const catlist = await listing.find({ category: { $regex: new RegExp(category, "i") } });

    console.log("Filtered Listings:", catlist);

    res.render("icons/category.ejs", { catlist, category });
  } catch (error) {
    console.error("Error fetching listings:", error);
    res.status(500).send("Server error");
  }
});


app.get("/",(req,res)=>{
  res.send("works");
});
app.use(session(sessionOptions));
app.use(flash()); 

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  res.locals.currUser=req.user;
  next(); 
});


/*app.get("/user",async(req,res)=>{
 let fakeUser= new User({
  email:"std@gmail.com",
  username:"jedccp",
 });
  let registeredUser=await User.register(fakeUser,"hellov");
  res.send(registeredUser);
});
*/
app.use("/listing",listingrouter);
app.use("/listing/:id/review",reviewrouter);
app.use("/",userrouter);
 

app.all("*",(req,res,next)=>{
  next(new Expresserror(404,"page not found")  );
});
app.use((err,req,res,next)=>{
  let {status=500,message="sometihg went wrong"}=err;
  res.render("listing/error.ejs",{message});
 // res.status(status).send(message);
});
app.listen(8080,()=>{
 console.log("server works");
});
