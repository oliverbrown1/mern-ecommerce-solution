const mongoose = require("mongoose")

const cartItemSchema = new mongoose.Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1
    }
}, {timestamps: true})

const cartSchema = new mongoose.Schema({
    items: [cartItemSchema]
}, {timestamps: true})


module.exports = { cartItemSchema, cartSchema }