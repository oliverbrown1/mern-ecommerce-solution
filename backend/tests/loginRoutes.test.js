const { test, describe, before, after, beforeEach } = require("node:test")
const {connectDB, disconnectDB } = require("./config/db.config")
const {loginUser1, loginUser2, missingUserId} = require("./config/user.config")
const assert = require("node:assert/strict");
const request = require("supertest");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const jwt = require("jsonwebtoken")
const app = require("../app.js");
const User = require("../models/userModel.js");

const secretKey = process.env.SECRET_KEY;

if (!secretKey) {
    throw new Error("SECRET_KEY is not configured");
}

describe("Login Routes", () => {
    before(async () => {
        await connectDB();
    });

    after(async () => {
        await User.deleteMany({
            $or: [
                { email: { $in: [loginUser1.email, loginUser2.email] } },
                { username: { $in: [loginUser1.username, loginUser2.username] } }
            ]
        });

        await disconnectDB();
    });
    describe("POST /auth/signup", () => {
        beforeEach(async () =>{
            await User.deleteMany({
                $or: [
                    { email: { $in: [loginUser1.email, loginUser2.email] } },
                ]
            });
        });

        after(async () => {
            await User.deleteMany({
                $or: [
                    { email: { $in: [loginUser1.email, loginUser2.email] } },
                ]
            });
        });

        test("First-time signup", async () => {
            const response = await request(app)
                .post("/auth/signup")
                .send({
                    email : loginUser1.email,
                    user : loginUser1.username,
                    pwd : loginUser1.password
                });
            
            assert.equal(response.status, 201)
            assert.deepEqual(response.body, {message : 'You have registered successfully.'})
        });

        test("Failed signup - same email", async () => {
            const user = new User(loginUser1);
            await user.save();
            const response = await request(app)
                .post("/auth/signup")
                .send({
                    email: loginUser1.email,
                    user: loginUser2.username,
                    pwd: loginUser1.password,
                });
            
            assert.equal(response.status, 400)
            assert.deepEqual(response.body, {message : "Email already in use."})
        });

        test("Failed signup - same username", async () => {
            const user = new User(loginUser1);
            await user.save();
            const response = await request(app)
                .post("/auth/signup")
                .send({
                    email: loginUser2.email,
                    user: loginUser1.username,
                    pwd: loginUser1.password
                });
            
            assert.equal(response.status, 400)
            assert.deepEqual(response.body, {message : "Username already in use."})
        });
    });

    describe("POST /auth/login", () => {

        const newUser = new User(loginUser1)
        before(async () =>{
            await newUser.save()

        });

        after(async () => {
            await User.deleteOne({ email: loginUser1.email })

        });

        test("Successful login", async () => {
            const response = await request(app)
                .post("/auth/login")
                .send({
                    email: loginUser1.email,
                    pwd: loginUser1.password
                });
            
                assert.equal(response.status, 200)
                assert.equal(
                    response.body.message,
                    "You have logged in successfully"
                );
                assert.equal(response.body.role, "User");
                const login_token = response.body.token
                assert.equal(typeof login_token, "string");
                const decoded = jwt.verify(login_token, secretKey);
                assert.equal(decoded.uid, newUser._id.toString())

        });

        test("Unsuccessful login - unrecognised email", async () =>{
            const response = await request(app)
                .post("/auth/login")
                .send({
                    email: loginUser2.email,
                    pwd: loginUser1.password
                })

            assert.equal(response.status, 401)
            assert.deepEqual(response.body, {"message" : "Email not recognised."})
        });

        test("Unsuccessful login - wrong password", async () =>{
            const response = await request(app)
                .post("/auth/login")
                .send({
                    email: loginUser1.email,
                    pwd: loginUser2.password
                })

            assert.equal(response.status, 401)
            assert.deepEqual(response.body, {"message" : "Password is invalid."})
        });
    });

    describe("POST /auth/logout", () => {
        test("Successful logout response", async () => {
            const response = await request(app)
                .post("/auth/logout")

            assert.equal(response.status, 200);
            assert.deepEqual(response.body, {
                message: "You have successfully logged out"
            });
        })

    })

    describe("POST /auth/verify-token", () => {
        const newUser = new User(loginUser1)
        before(async () =>{
            await newUser.save()

        });

        after(async () => {
            await User.deleteOne({ email: loginUser1.email })

        });

        test("Authorised token", async () =>{
            const jwtToken = jwt.sign({ uid : newUser._id.toString()}, secretKey, {
                expiresIn: '1d',
            })
            const response = await request(app)
                .post("/auth/verify-token")
                .set({"authtoken" : jwtToken});

            assert.equal(response.status, 200);
            assert.equal(
                response.body.message,
                "User found successfully."
            );
            assert.equal(response.body.user._id, newUser.id);
            assert.equal(response.body.user.email, newUser.email);
            assert.equal(response.body.user.username, newUser.username);
        });

        test("Authorised token - invalid user", async () =>{
            const jwtToken = jwt.sign({ uid : missingUserId}, secretKey, {
                expiresIn: '1d',
            })
            const response = await request(app)
                .post("/auth/verify-token")
                .set({"authtoken" : jwtToken});

            assert.equal(response.status, 404);
            assert.deepEqual(response.body, { message: "User not found." });
        });

        test("Unauthorised token", async () =>{
            const jwtToken = "123"
            const response = await request(app)
                .post("/auth/verify-token")
                .set({"authtoken" : jwtToken});

            assert.equal(response.status, 401);
            assert.deepEqual(response.body, { message: "Unauthorised token access"});
        });

        test("Missing token", async () =>{
            const response = await request(app)
                .post("/auth/verify-token")

            assert.equal(response.status, 402);
            assert.deepEqual(response.body, { message: "Missing token" });
        });
        
    });

    describe("POST /auth/forgot", () => {
        const newUser = new User(loginUser1)
        before(async () =>{
            await newUser.save()

        });

        after(async () => {
            await User.deleteOne({ email: loginUser1.email })

        });
        test("User found, email sent", async () => {
            const response = await request(app)
                .post("/auth/forgot")
                .send({
                    email: loginUser1.email,
                    user: "",
                    useUser: false
                });

            const newUserData = await User.findById(newUser._id);
            assert.ok(newUserData)
            // verify correct password reset token is stored
            const storedToken= newUserData.passwordResetToken;
            assert.equal(typeof storedToken, "string");

            const decoded = jwt.verify(
                storedToken,
                secretKey
            );

            assert.equal(decoded.uid, newUserData.id);
            assert.equal(response.status, 200);
            assert.match(response.body.message, /^Email sent:/);

        });

        test("Email not recognised", async () => {
            const response = await request(app)
                .post("/auth/forgot")
                .send({
                    email: loginUser2.email,
                    user: "",
                    useUser: false
            });

            assert.equal(response.status, 401)
            assert.deepEqual(response.body, {message: "Email or username not recognised."})
        });

        test("User not recognised", async () => {
            const response = await request(app)
                .post("/auth/forgot")
                .send({
                    email: "",
                    user: loginUser2.username,
                    useUser: true
            });

            assert.equal(response.status, 401)
            assert.deepEqual(response.body, {message: "Email or username not recognised."})
        });

    });

    describe("POST /auth/reset-password", () => {
        const newUser = new User(loginUser1)
        before(async () =>{
            await newUser.save()

        });

        after(async () => {
            await User.deleteOne({ email: loginUser1.email })

        });

        test("Password reset successfully", async() => {
            const jwtToken = jwt.sign({ uid : newUser._id.toString()}, secretKey, {
                expiresIn: '1d',
            });
            newUser.passwordResetToken = jwtToken;
            await newUser.save();

            // post new password in request
            const response = await request(app)
                .post("/auth/reset-password")
                .send({
                    id: newUser._id,
                    token: jwtToken,
                    pwd: loginUser2.password
            });

            assert.equal(response.status, 200)
            assert.deepEqual(response.body, {message: "Password reset successfully."})
            // verify new password
            const updatedUser = await User.findById(newUser._id);
            assert.ok(updatedUser);
            assert.equal(updatedUser.password, loginUser2.password);
            assert.equal(updatedUser.passwordResetToken, null);
            
        });

        test("Invalid link", async () => {
            const jwtToken = "123";
            newUser.passwordResetToken = jwtToken;
            await newUser.save();

            // post new password in request
            const response_1 = await request(app)
                .post("/auth/reset-password")
                .send({
                    id: newUser._id,
                    token: jwtToken,
                    pwd: loginUser2.password 
            });

            assert.equal(response_1.status, 401)
            assert.deepEqual(response_1.body, {message: "Your link has expired!"})


        });
        test("User not recognised", async () => {
            const jwtToken = jwt.sign({ uid : newUser._id.toString()}, secretKey, {
                expiresIn: '1d',
            });
            newUser.passwordResetToken = jwtToken;
            await newUser.save();

            // post new password in request
            const response_1 = await request(app)
                .post("/auth/reset-password")
                .send({
                    id: missingUserId,
                    token: jwtToken,
                    pwd: loginUser2.password
            });

            assert.equal(response_1.status, 404)
            assert.deepEqual(response_1.body, {message: "User not found."})

        });

    });
});