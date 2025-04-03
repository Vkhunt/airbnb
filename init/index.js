require("dotenv").config({ path: "../.env" }); // Adjust the path if needed
console.log("Loaded MONGO_URI:", process.env.MONGO_URI); // Debugging line

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  throw new Error("❌ MONGO_URI is not defined! Check your .env file.");
}

async function main() {
  await mongoose.connect(MONGO_URI);
  console.log("✅ MongoDB Connected Successfully!");
}

main().catch((err) => console.log(err));

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({ ...obj, owner: "678e8e20ea40870443bea2bd" }));
  await Listing.insertMany(initData.data);
  console.log("✅ Data Initialized!");
};

initDB();
