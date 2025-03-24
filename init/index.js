const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

main().then(()=>{
 console.log("mongo connected");
}).catch((err)=>{
  console.log(err);
});
async function main(){
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

const initDB = async () => {
  await Listing.deleteMany({ });
  /*for owner insert */initData.data=initData.data.map((obj) => ({...obj,owner:"678e8e20ea40870443bea2bd"}));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();