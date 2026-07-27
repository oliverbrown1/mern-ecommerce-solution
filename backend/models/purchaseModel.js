const mongoose = require("mongoose")

const purchaseItemSchema = new mongoose.Schema({
    item_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

const purchaseSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    cart : {
        type: [purchaseItemSchema],
        required: true
    },
    total : {
        type: Number,
        required: true
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

const Purchase = mongoose.model("Purchase", purchaseSchema)
module.exports = Purchase