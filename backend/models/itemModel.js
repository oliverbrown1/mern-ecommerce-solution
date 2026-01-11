const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  thumbnail: String,
  category: String,
  stock: Number,
  rating: Number,
  brand: String,
  sku: String,
  //   todo - tags should be a variable list of strings
  tags: [],
  reviews: [
    {
      rating: { type: Number, required: true },
      comment: String,
      date: Date,
      reviewerName : String,
      reviewerEmail: String,

    }
  ]
}, {timestamps: true}
)

const Item = mongoose.model("Item", itemSchema)
module.exports = Item