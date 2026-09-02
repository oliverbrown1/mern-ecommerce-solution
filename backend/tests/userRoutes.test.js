const { test, describe, before, after, beforeEach, afterEach } = require("node:test")
const {connectDB, disconnectDB } = require("./config/db.config")
const {profileUser, missingUserId, billingAddress, shippingAddress, topUpAmount} = require("./config/user.config")
const assert = require("node:assert/strict");
const request = require("supertest");
const path = require("path");
const jwt = require("jsonwebtoken")
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const app = require("../app.js");
const User = require("../models/userModel.js")

const secretKey = process.env.SECRET_KEY;

if (!secretKey) {
    throw new Error("SECRET_KEY is not configured");
}

describe("User Routes", () => {
    const newUser = new User(profileUser);
    let jwtToken = "";
    let invalidToken = "";

    before(async () => {
        await connectDB();
        await User.deleteOne({ email: profileUser.email });

        await newUser.save();

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
        await disconnectDB();
    });

    beforeEach(async () => {
        await User.updateOne(
            { _id: newUser._id },
            {
                $unset: {
                    billing_address: "",
                    shipping_address: ""
                },
                $set: {
                    balance: 0
                }
            }
        );
    });
    afterEach(async () => {
        await User.updateOne(
            { _id: newUser._id },
            {
                $unset: {
                    billing_address: "",
                    shipping_address: ""
                },
                $set: {
                    balance: 0
                }
            }
        );
    });

    describe("GET /user/addresses", () => {

        test("Addresses fetched successfully", async () => {
            await User.updateOne(
                { _id: newUser._id },
                {
                    $set: {
                        billing_address: billingAddress,
                        shipping_address: shippingAddress
                    }
                }
            );

            const response = await request(app)
                .get(`/user/addresses`)
                .set({"authtoken" : jwtToken});

            assert.equal(response.status, 200)

            const user = await User.findById(newUser._id);
            assert.ok(user)
            assert.partialDeepStrictEqual(response.body, {message: "Addresses retrieved successfully", billing : user?.billing_address, shipping: user?.shipping_address});
        });

        test("UserID not found", async () => {
            const response = await request(app)
                .get(`/user/addresses`)
                .set({"authtoken" : invalidToken});
            
            assert.equal(response.status, 404)
            assert.deepEqual(response.body, { message: "User not found." });
        });

    });

    describe("PATCH /user/address/shipping", () => {
        test("Shipping address set successfully", async () => {
            const response = await request(app)
                .patch(`/user/address/shipping`)
                .send({address : shippingAddress})
                .set({"authtoken" : jwtToken});
            
            assert.equal(response.status, 200)
            assert.deepEqual(response.body, { message: "Shipping address saved." });

            const user = await User.findById(newUser._id);
            assert.ok(user)
            assert.partialDeepStrictEqual(user.shipping_address, shippingAddress);

        });

        test("UserID not found", async () => {

            const response = await request(app)
                .patch(`/user/address/shipping`)
                .send({address : shippingAddress})
                .set({"authtoken" : invalidToken});
            
            assert.equal(response.status, 404)
            assert.deepEqual(response.body, { message: "User not found." });

        });

    });
    
    describe("PATCH /user/address/billing", () => {
        test("Billing address set successfully", async () => {
            const response = await request(app)
                .patch(`/user/address/billing`)
                .send({address : billingAddress})
                .set({"authtoken" : jwtToken});
            
            assert.equal(response.status, 200)
            assert.deepEqual(response.body, { message: "Billing address saved." });

            const user = await User.findById(newUser._id);
            assert.ok(user)
            assert.partialDeepStrictEqual(user.billing_address, billingAddress);
        });

        test("UserID not found", async () => {

            const response = await request(app)
                .patch(`/user/address/billing`)
                .send({address : billingAddress})
                .set({"authtoken" : invalidToken});
            
            assert.equal(response.status, 404)
            assert.deepEqual(response.body, { message: "User not found." });

        });
    });

    describe("GET /user/balance", () => {
        test("Balance retrieved successfully", async () => {
            await User.updateOne(
                { _id : newUser._id},
                {
                    $set: {
                        balance: topUpAmount
                    }
                }
            )
            const response = await request(app)
                .get("/user/balance")
                .set({"authtoken" : jwtToken});

            assert.equal(response.status, 200);
            assert.deepEqual(response.body, {message : "Balance retrieved successfully", balance: Number(topUpAmount)});

        });

        test("UserID not found.", async () => {
            await User.updateOne(
                { _id : newUser._id},
                {
                    $set: {
                        balance: topUpAmount
                    }
                }
            )
            const response = await request(app)
                .get("/user/balance")
                .set({"authtoken" : invalidToken});

            assert.equal(response.status, 404);
            assert.deepEqual(response.body, {message : "User not found."});

        });
    
    });

    describe("POST /user/balance/top-up", () => {

        test("Balance topped up successfully", async () => {
            const response = await request(app)
                .post("/user/balance/top-up")
                .send({addedBalance : topUpAmount})
                .set({"authtoken" : jwtToken});

            assert.equal(response.status, 200);
            assert.deepEqual(response.body, {message : "Balance topped up successfully", balance: Number(topUpAmount)});

            const updatedUser = await User.findById(newUser._id);
            assert.ok(updatedUser);
            assert.equal(updatedUser.balance, Number(topUpAmount))

        });

        test("Negative balance top up rejected",  async () => {
            const response = await request(app)
                .post("/user/balance/top-up")
                .send({addedBalance : "-1"})
                .set({"authtoken" : jwtToken});

            assert.equal(response.status, 400);
            assert.deepEqual(response.body, {message : "Added balance must be non-negative and to 2 decimal places."});

            const updatedUser = await User.findById(newUser._id);
            assert.ok(updatedUser);
            assert.equal(updatedUser.balance, 0)

        });

        test("Non-integer balance top up rejected",  async () => {
            const response = await request(app)
                .post("/user/balance/top-up")
                .send({addedBalance : "test"})
                .set({"authtoken" : jwtToken});

            assert.equal(response.status, 400);
            assert.deepEqual(response.body, {message : "Added balance must be non-negative and to 2 decimal places."});

            const updatedUser = await User.findById(newUser._id);
            assert.ok(updatedUser);
            assert.equal(updatedUser.balance, 0)

        });

        test("UserID not found.",  async () => {
            const response = await request(app)
                .post("/user/balance/top-up")
                .send({addedBalance : topUpAmount})
                .set({"authtoken" : invalidToken});

            assert.equal(response.status, 404);
            assert.deepEqual(response.body, {message : "User not found."});

        });
    });
});