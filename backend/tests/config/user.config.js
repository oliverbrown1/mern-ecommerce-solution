const mg = require("mongoose");

const loginUser1 = {
    email: "test1@test.com",
    username: "test1",
    password: "test1",
    role: "User"
}

const loginUser2 = {
    email: "test2@test.com",
    username: "test2",
    password: "test2",
    role: "User"
}
const cartUser = {
    email : "cart@test.com",
    username: "cart",
    password : "cart",
    role: "User"
}

const itemUser = {
    email : "item@test.com",
    username: "item",
    password: "item",
    role: "User"
}

const itemUser2 = {
    email : "bad@test.com",
    username: "bad",
    password: "bad",
    role: "User" 
}

const missingUserId = new mg.Types.ObjectId().toString();

module.exports = {loginUser1, loginUser2, cartUser, itemUser, itemUser2, missingUserId}