const mongoose = require("mongoose")
const { cartSchema } = require("./cartModel.js")

const userSchema = new mongoose.Schema({
    email : {
        type: String,
        required : true,
        unique: true
    },
    username : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    role : {
        type: String,
        required : true
    },
    passwordResetToken: {
        type: String,
        default: null
    },
    cart : {
        type: cartSchema,
        default: () => ({ items: [] }),
    },
    balance : {
        type: Number,
        default: 0,
        min: 0
    },
    billing_address: {
        line1: String,
        line2: String,
        city: String,
        postcode: String,
        country: String,
        isDefault: {
            type: Boolean,
            default: false
        }
    },
    shipping_address: {
        line1: String,
        line2: String,
        city: String,
        postcode: String,
        country: String,
        isDefault: {
            type: Boolean,
            default: false
        }
    }
}, {timestamps: true}
)

const User = mongoose.model("User", userSchema)
module.exports = User