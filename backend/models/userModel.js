const mongoose = require("mongoose")

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
}, {timestamps: true}
)

const User = mongoose.model("User", userSchema)
module.exports = User