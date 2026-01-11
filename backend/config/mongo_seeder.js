const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const mongoose = require("mongoose");
const Item = require("../models/itemModel");
const connectDB = require("./database");

// gets all products and inserts into Items table
async function seedFromAPI() {
  await connectDB();

  const res = await fetch("https://dummyjson.com/products?limit=194");
  const { products } = await res.json();

  await Item.deleteMany({});
  await Item.insertMany(products);

  console.log("Seed from API complete!");
  process.exit(0);
}

// seedFromAPI().catch((err) => {
//   console.error(err);
//   process.exit(1);
// });
