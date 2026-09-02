const { test, describe, before, after, beforeEach, afterEach } = require("node:test")
const {connectDB, disconnectDB } = require("./config/db.config")
const {userTestItem, missingItemId } = require("./config/item.config")
const {cartUser, missingUserId} = require("./config/user.config")
const assert = require("node:assert/strict");
const request = require("supertest");
const path = require("path");
const jwt = require("jsonwebtoken")
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const app = require("../app.js");
const Item = require("../models/itemModel.js");
const User = require("../models/userModel.js")
const Purchase = require("../models/purchaseModel.js")

const secretKey = process.env.SECRET_KEY;

if (!secretKey) {
    throw new Error("SECRET_KEY is not configured");
}

describe("Cart Routes", () => {
    const newUser = new User(cartUser);
    const newItem = new Item(userTestItem);
    let jwtToken = "";
    let invalidToken = "";

    before(async () => {
        await connectDB();
        await User.deleteOne({ email: cartUser.email });

        await newUser.save();
        await newItem.save();

        jwtToken = jwt.sign(
            { uid: newUser._id.toString() },
            secretKey,
            { expiresIn: "1h" }
        );
        invalidToken = jwt.sign(
            { uid: missingUserId.toString() },
            secretKey,
            { expiresIn: "1h" }
        );
    });

    after(async () => {
        await User.findByIdAndDelete(newUser._id);
        await Item.findByIdAndDelete(newItem._id);
        await disconnectDB();
    });

    beforeEach(async () => {
        await User.updateOne(
            { _id: newUser._id },
            {
                $set: {
                    "cart.items": [],
                    balance: 0
                }
            }
        );
    });
    afterEach(async () => {
        await User.updateOne(
            { _id: newUser._id },
            {
                $set: {
                    "cart.items": [],
                    balance: 0
                }
            }
        );
    });


    describe("GET /cart/get", ()=> {
        beforeEach(async () => {
            await User.updateOne(
                { _id: newUser._id },
                {
                    $set: {
                        "cart.items": [{
                            item_id: newItem._id,
                            quantity: 1
                        }]
                    }
                }
            );
        });

        test("cart fetched successfully", async () => {
            const response = await request(app)
            .get(`/cart/get`)
            .set({"authtoken" : jwtToken});
            
            assert.equal(response.status, 200);
            const updatedUser = await User.findById(newUser._id);
            assert.ok(updatedUser);
            assert.deepEqual(response.body, { message: `Cart retrieved successfully`, cart: JSON.parse(JSON.stringify(updatedUser.cart)), total: newItem.price });
            
        });

        test("Invalid user ID", async () =>{

            const response = await request(app)
                .get(`/cart/get`)
                .set({"authtoken" : invalidToken});
            
            assert.equal(response.status, 404)
            assert.deepEqual(response.body, {message: "User not found."})
            
        });

    });

    describe("POST /cart/add", () => {

        test("New item added to cart", async () => {
            const response = await request(app)
                .post(`/cart/add`)
                .send({itemId : newItem.id, quantity : 1})
                .set({"authtoken" : jwtToken});
            
            assert.equal(response.status, 201)

            // check item in user.cart
            const updatedUser = await User.findById(newUser._id);
            assert.ok(updatedUser);
            assert.deepEqual(response.body, { message: `Item added to cart`, cart : JSON.parse(JSON.stringify(updatedUser.cart))});
            const addedItem = updatedUser.cart.items.find(item => item.item_id.toString() == newItem.id);
            assert.ok(addedItem)
            assert.equal(addedItem.quantity, 1)
            
        });

        test("Quantity added to existing cart item", async () => {
            // add item to cart again:
            await User.updateOne(
                { _id: newUser._id },
                {
                    $set: {
                        "cart.items": [{
                            item_id: newItem._id,
                            quantity: 1
                        }]
                    }
                }
            );
            const response = await request(app)
                .post(`/cart/add`)
                .send({itemId : newItem.id, quantity : 2})
                .set({"authtoken" : jwtToken});
            
            assert.equal(response.status, 200)

            // check item in user.cart
            const updatedUser = await User.findById(newUser._id);
            assert.ok(updatedUser);
            assert.deepEqual(response.body, { message: `Item found, quantity increased`, cart : JSON.parse(JSON.stringify(updatedUser.cart))});
            const addedItem = updatedUser.cart.items.find(item => item.item_id.toString() == newItem.id);
            assert.ok(addedItem)
            assert.equal(addedItem.quantity, 3)
            
        });

        test("Invalid user ID", async () => {

            const response = await request(app)
                .post(`/cart/add`)
                .send({itemId : newItem.id, quantity : 1})
                .set({"authtoken" : invalidToken});
            
            assert.equal(response.status, 404)
            assert.deepEqual(response.body, {message: "User not found."})
            
        });

        test("Invalid quantity", async () => {
            const response = await request(app)
                .post(`/cart/add`)
                .send({itemId : newItem.id, quantity : -1})
                .set({"authtoken" : jwtToken});
            
            assert.equal(response.status, 400)
            assert.deepEqual(response.body, {message : "Quantity must be a non-negative integer."})     
        });

    });

    describe("PATCH /cart/modify/:itemId", () => {
        beforeEach(async () => {
            await User.updateOne(
                { _id: newUser._id },
                {
                    $set: {
                        "cart.items": [{
                            item_id: newItem._id,
                            quantity: 1
                        }]
                    }
                }
            );
        });

        test("Item quantity modified successfully", async () => {
            const response = await request(app)
                .patch(`/cart/modify/${newItem.id}`)
                .send({quantity : 2})
                .set({"authtoken" : jwtToken});
            
            assert.equal(response.status, 200)

            // check item updated in user.cart
            const updatedUser = await User.findById(newUser._id);
            assert.ok(updatedUser);
            assert.deepEqual(response.body, { message: `Item quantity updated.`, cart : JSON.parse(JSON.stringify(updatedUser.cart))});
            const addedItem = updatedUser.cart.items.find(item => item.item_id.toString() == newItem.id);
            assert.ok(addedItem)
            assert.equal(addedItem.quantity, 2)
            
        });

        test("Item successfully removed from cart", async () => {
            const response = await request(app)
                .patch(`/cart/modify/${newItem.id}`)
                .send({quantity : 0})
                .set({"authtoken" : jwtToken});
            
            assert.equal(response.status, 200)

            // check item NOT in user.cart
            const updatedUser = await User.findById(newUser._id);
            assert.ok(updatedUser);
            assert.deepEqual(response.body, { message: `Item removed from cart.`, cart : JSON.parse(JSON.stringify(updatedUser.cart))});
            const addedItem = updatedUser.cart.items.find(item => item.item_id.toString() == newItem.id);
            assert.ok(!addedItem);
        });

        test("Invalid user ID", async () => {

            const response = await request(app)
                .patch(`/cart/modify/${newItem.id}`)
                .send({quantity : 2})
                .set({"authtoken" : invalidToken});
            
            assert.equal(response.status, 404)
            assert.deepEqual(response.body, {message : "User not found."})
        });

        test("Invalid quantity", async () => {
            const response = await request(app)
                .patch(`/cart/modify/${newItem.id}`)
                .send({quantity : -1})
                .set({"authtoken" : jwtToken});
            
            assert.equal(response.status, 400)
            assert.deepEqual(response.body, {message : "Quantity must be a non-negative integer."})
        });

        test("Invalid quantity", async () => {
            const response = await request(app)
                .patch(`/cart/modify/${missingItemId}`)
                .send({quantity : 2})
                .set({"authtoken" : jwtToken});
            
            assert.equal(response.status, 404)
            assert.deepEqual(response.body, {message : "Item not found in Cart."})
        });



    });
    describe("DELETE /cart/empty", () => {
        beforeEach(async () => {
            await User.updateOne(
                { _id: newUser._id },
                {
                    $set: {
                        "cart.items": [{
                            item_id: newItem._id,
                            quantity: 1
                        }]
                    }
                }
            );
        });

        test("Cart emptied successfully", async () => {
            const response = await request(app)
                .delete(`/cart/empty`)
                .set({"authtoken" : jwtToken});
            
            assert.equal(response.status, 200)
            assert.deepEqual(response.body, { message: `Cart emptied.`})

            // check item NOT in user.cart
            const updatedUser = await User.findById(newUser._id);
            assert.ok(updatedUser);
            assert.ok(updatedUser.cart.items.length == 0)
        });

        test("UserID not found", async () => {

            const response = await request(app)
                .delete(`/cart/empty`)
                .set({"authtoken" : invalidToken});
            
            assert.equal(response.status, 404)
            assert.deepEqual(response.body, { message: "User not found."})
        });


    });

    // TODO
    describe("POST /cart/checkout", () => {
        beforeEach(async () => {
            await User.updateOne(
                { _id: newUser._id },
                {
                    $set: {
                        "balance" : newItem.price,
                        "cart.items": [{
                            item_id: newItem._id,
                            quantity: 1
                        }],
                    }
                }
            );
            await Purchase.deleteMany({ user_id: newUser._id });
        });
        after(async () => {
            await Purchase.deleteMany({ user_id: newUser._id });
        });

        test("Items purchased successfully", async () => {
            const response = await request(app)
                .post(`/cart/checkout`)
                .send({ useBalance : "true"})
                .set({"authtoken" : jwtToken});
            
            assert.equal(response.status, 201)
            assert.deepEqual(response.body, {message: `Cart successfully purchased`});

            const updatedUser = await User.findById(newUser._id);
            assert.ok(updatedUser);
            // empty cart
            assert.ok(updatedUser.cart.items.length == 0);
            // balance deducted
            assert.equal(updatedUser.balance, 0);
            // purchase logged
            const purchase = await Purchase.findOne({ user_id : newUser._id});
            const purchaseData = JSON.parse(JSON.stringify(purchase));
            assert.ok(purchaseData);
            assert.partialDeepStrictEqual(purchaseData, {
                user_id: newUser.id,
                total: newItem.price,
                cart: [
                    {
                        item_id : newItem.id,
                        title : newItem.title,
                        price : newItem.price,
                        quantity: 1
                    }
                ]
            });

        });

        test("Insufficient Balance", async () => {
            await User.updateOne(
                { _id: newUser._id },
                {
                    $set: {
                        "balance" : 0
                    }
                }
            );

            const response = await request(app)
                .post(`/cart/checkout`)
                .send({ useBalance : "true"})
                .set({"authtoken" : jwtToken});
            
            assert.equal(response.status, 402)
            assert.deepEqual(response.body, { message: "Insufficient balance"});
            const purchase = await Purchase.findOne({ user_id : newUser._id});
            assert.ok(!purchase);

        });

        test("Cart is Empty", async () => {
            await User.updateOne(
                { _id: newUser._id },
                {
                    $set: {
                        "cart.items" : []
                    }
                }
            );

            const response = await request(app)
                .post(`/cart/checkout`)
                .send({ useBalance : "true"})
                .set({"authtoken" : jwtToken});
            
            assert.equal(response.status, 400)
            assert.deepEqual(response.body, { message: "Cart is empty." });
            const purchase = await Purchase.findOne({ user_id : newUser._id});
            assert.ok(!purchase);
        });
        test("UserID not found", async () => {

            const response = await request(app)
                .post(`/cart/checkout`)
                .send({ useBalance : "true"})
                .set({"authtoken" : invalidToken});
            
            assert.equal(response.status, 404)
            assert.deepEqual(response.body, { message: "User not found." });
            const purchase = await Purchase.findOne({ user_id : newUser._id});
            assert.ok(!purchase);

        });
    });

});