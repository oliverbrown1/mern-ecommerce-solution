const { test, describe, before, after, beforeEach, afterEach } = require("node:test")
const {connectDB, disconnectDB} = require("./config/db.config")
const {testCategoryItems, testCategory, cartTestItem, missingItemId } = require("./config/item.config")
const {itemUser, itemUser2, missingUserId} = require("./config/user.config")
const assert = require("node:assert/strict");
const request = require("supertest");
const path = require("path");
const jwt = require("jsonwebtoken")
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const app = require("../app.js");
const Item = require("../models/itemModel.js");
const User = require("../models/userModel.js")

const secretKey = process.env.SECRET_KEY;

if (!secretKey) {
    throw new Error("SECRET_KEY is not configured");
}

describe("Item Routes" , () => {
    const newUser = new User(itemUser);
    const badUser = new User(itemUser2);
    let jwtToken = "";
    before(async () =>{
        await connectDB();
        await User.deleteMany({
            email: { $in: [itemUser.email, itemUser2.email] }
        });

        await newUser.save();
        await badUser.save()

        jwtToken = jwt.sign(
            { uid: newUser._id.toString() },
            secretKey,
            { expiresIn: "1h" }
        );
    });

    after(async () => {
        await User.findByIdAndDelete(newUser._id);
        await User.findByIdAndDelete(badUser._id);
        await disconnectDB();

    });

    describe("GET /items/home-screen-items/:category", ()=> {
        before(async () =>{
            await Item.deleteMany({ category: testCategory });
            await Item.insertMany(testCategoryItems);
        });

        after(async () => {
            await Item.deleteMany({ category: testCategory });

        });

        test("Valid category fetched", async () =>{
            const response = await request(app)
                .get(`/items/home-screen-items/${testCategory}`)
            
            assert.equal(response.status, 200)
            assert.deepEqual(
                response.body.map(item => ({
                    name: item.name,
                    price: item.price,
                    thumbnail: item.image_url,
                    rating: item.rating
                })).sort(),
                testCategoryItems.map(item => ({
                    name: item.title,
                    price: item.price,
                    thumbnail: item.thumbnail,
                    rating: item.rating
                })).sort()
            )

        });

            test("Invalid category fetched", async () =>{
            const response = await request(app)
                .get("/items/home-screen-items/random_category")
            
            assert.equal(response.status, 400)
            assert.deepEqual(response.body,{"message" : "No items found in that category"})

        });


    });

    describe("GET /items/get/:id", () => {
        const item = new Item({
            ...cartTestItem,
            owner: newUser._id.toString()
        });
        before(async () =>{
            await Item.deleteOne({ title: cartTestItem.title})
            await item.save()
        });

        after(async () => {
            await Item.findByIdAndDelete(item._id)
        });

        test("Item retrieved successfully", async () =>{
            const response = await request(app)
                .get(`/items/get/${item.id}`)
            
            assert.equal(response.status, 200)
            assert.deepEqual(response.body.item, JSON.parse(JSON.stringify(item)));

        });

        test("Item not found", async () =>{
            const response = await request(app)
                .get(`/items/get/${missingItemId}`)
            
            assert.equal(response.status, 404)
            assert.deepEqual(response.body, { message: "Item not found." })

        });
    })

    describe("GET /items/categories", () => {
        const item = new Item({
            ...cartTestItem,
            owner: newUser._id.toString()
        });
        before(async () =>{
            await Item.insertOne(item);
        });

        after(async () => {
            await Item.findByIdAndDelete(item._id)
        });

        test("Categories retrieved successfully", async () =>{
            const response = await request(app)
                .get(`/items/categories`)
            
            assert.equal(response.status, 200);
            assert.deepEqual(response.body, {categories : ["beauty"]});
        });
        
    })

    describe("POST /items/add", () => {
        beforeEach(async () =>{
            await Item.deleteOne({ sku: cartTestItem.sku });
        });

        after(async () => {
            await Item.deleteOne({ sku : cartTestItem.sku });
        });

        test("Item added successfully", async () => {
            const response = await request(app)
                .post(`/items/add`)
                .send(cartTestItem)
                .set("authtoken", jwtToken)
            
            assert.equal(response.status, 201)
            const item = await Item.findOne({ sku : cartTestItem.sku });
            assert.deepEqual(response.body, JSON.parse(JSON.stringify(item)));
        });

        test("Invalid user", async () => {
            const invalidToken = jwt.sign(
                { uid: missingUserId.toString() },
                secretKey,
                { expiresIn: "1h" }
            );
            const response = await request(app)
                .post(`/items/add`)
                .send(cartTestItem)
                .set("authtoken", invalidToken)
            
            assert.equal(response.status, 404)
            assert.deepEqual(response.body, {message: "User not found."});
        });

        test("Sku already exists", async () => {
            // have to add item
            const item = new Item(cartTestItem);
            await item.save();
            const response = await request(app)
                .post(`/items/add`)
                .send(cartTestItem)
                .set("authtoken", jwtToken)
            
            assert.equal(response.status, 409)
            assert.deepEqual(response.body, {message: "Item already exists."});
        });

    })

    describe("DELETE /items/remove/:id", () => {
        let item;

        beforeEach(async () =>{
            await Item.deleteOne({ sku: cartTestItem.sku });
            item = await Item.create({
                ...cartTestItem,
                owner: newUser._id.toString()
            });
        });

        after(async () => {
            if(item){
                await Item.findByIdAndDelete(item._id)
            }
        });


        test("Item deleted successfully", async () => {
            const response = await request(app)
                .delete(`/items/remove/${item.id}`)
                .set("authtoken", jwtToken);
            
            assert.equal(response.status, 200);
            assert.deepEqual(response.body, {message : "Item deleted successfully."});
            const itemPresent = await Item.findById(item._id)
            assert.ok(!itemPresent);
        });

        test("Item not found", async () => {
            const response = await request(app)
                .delete(`/items/remove/${missingItemId}`)
                .set("authtoken", jwtToken);
            
            assert.equal(response.status, 404);
            assert.deepEqual(response.body, {message : "Item not found."});
        });

        test("Invalid user", async () => {
            const invalidToken = jwt.sign(
                { uid: missingUserId.toString() },
                secretKey,
                { expiresIn: "1h" }
            );
            const response = await request(app)
                .delete(`/items/remove/${item.id}`)
                .set("authtoken", invalidToken);
            
            assert.equal(response.status, 404);
            assert.deepEqual(response.body, {message : "User not found."});
        });

        test("User does not have permission to delete item", async () => {
            const badUserToken = jwt.sign(
                { uid: badUser._id.toString() },
                secretKey,
                { expiresIn: "1h" }
            );
            const response = await request(app)
                .delete(`/items/remove/${item.id}`)
                .set("authtoken", badUserToken);
            
            assert.equal(response.status, 403);
            assert.deepEqual(response.body, {message : "User is not the owner of this item"});
        });

    })
});