const { test, describe, before, after } = require("node:test")
const assert = require("node:assert/strict");
const request = require("supertest");
const mg = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const jwt = require("jsonwebtoken")
const app = require("../app.js");
const User = require("../models/userModel.js");

// vars
const testEmail1 = "test1@gmail.com"
const testUser1 = "test1"
const testEmail2 = "test2@gmail.com"
const testUser2 = "test2"
const testPassword1 = "test1"
const testPassword2 = "test2"
const missingUserId = new mg.Types.ObjectId().toString();

// test("description", async () => {
//     // Arrange
//     // Act
//     // Assert
// });

// authenticated routes
// describe("cart routes", () => {
//     before(async () => {
//         await mongoose.connect(process.env.TEST_MGURL);
//         // Create test data
//     });

//     after(async () => {
//         // Remove test data
//         await mongoose.disconnect();
//     });

//     test("authenticated user can retrieve their cart", async () => {
//         // Login
//         // Call route with token
//         // Assert response
//     });
// });

const connectDB = async () => {
    try{
        await mg.connect(process.env.TEST_MGURL);
        console.log("DB connected");

    }
    catch(error){
        console.log("Ran into error connecting to DB... ");
        console.log(error);
        process.exit(1)

    }
}

const disconnectDB = async () => {
       try{
        await mg.disconnect();
        console.log("DB disconnected");

    }
    catch(error){
        console.log("Ran into error disconnecting from DB... ");
        console.log(error);
        process.exit(1)

    } 
}

test("GET /cart/get", async () => {
    const response = await request(app).get("/cart/get")

    assert.equal(response.status, 402)
    assert.deepEqual(response.body, {message : "Missing token"})
});

describe("POST /auth/signup", () => {
    before(async () =>{
        await connectDB();
        await User.deleteMany({
            $or: [
                { email: { $in: [testEmail1, testEmail2] } },
                { username: { $in: [testUser1, testUser2] } }
            ]
    });

    });

    after(async () => {
        await User.deleteOne({ email: testEmail1})
        await User.deleteOne({ email : testEmail2})
        await disconnectDB();

    });

    test("First-time signup", async () => {
        const response = await request(app)
            .post("/auth/signup")
            .send({
                email: testEmail1,
                user: testUser1,
                pwd: testPassword1
            });
        
        assert.equal(response.status, 201)
        assert.deepEqual(response.body, {message : 'You have registered successfully.'})
    });

    test("Failed signup - same email", async () => {
        const response = await request(app)
            .post("/auth/signup")
            .send({
                email: testEmail1,
                user: testUser2,
                pwd: testPassword1,
            });
        
        assert.equal(response.status, 400)
        assert.deepEqual(response.body, {message : "Email already in use."})
    });

    test("Failed signup - same username", async () => {
        const response = await request(app)
            .post("/auth/signup")
            .send({
                email: testEmail2,
                user: testUser1,
                pwd: testPassword1
            });
        
        assert.equal(response.status, 400)
        assert.deepEqual(response.body, {message : "Username already in use."})
    });
});

describe("POST /auth/login", () => {

    const newUser = new User({
        email : testEmail1,
        username: testUser1,
        password: testPassword1,
        role: "User"
    })
    before(async () =>{
        await connectDB();
        await newUser.save()

    });

    after(async () => {
        await User.deleteOne({ email: testEmail1 })
        await disconnectDB();

    });

    test("Successful login", async () => {
        const response = await request(app)
            .post("/auth/login")
            .send({
                email: testEmail1,
                pwd: testPassword1
            });
        
            assert.equal(response.status, 200)
            assert.equal(
                response.body.message,
                "You have logged in successfully"
            );
            assert.equal(response.body.role, "User");
            const login_token = response.body.token
            assert.equal(typeof login_token, "string");
            const decoded = jwt.verify(login_token, process.env.SECRET_KEY);
            assert.equal(decoded.uid, newUser._id.toString())

    });

    test("Unsuccessful login - unrecognised email", async () =>{
        const response = await request(app)
            .post("/auth/login")
            .send({
                email: testEmail2,
                pwd: testPassword1
            })

        assert.equal(response.status, 401)
        assert.deepEqual(response.body, {"message" : "Email not recognised."})
    });

    test("Unsuccessful login - wrong password", async () =>{
        const response = await request(app)
            .post("/auth/login")
            .send({
                email: testEmail1,
                pwd: testPassword2
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
    const newUser = new User({
        email : testEmail1,
        username: testUser1,
        password: testPassword1,
        role: "User"
    })
    before(async () =>{
        await connectDB();
        await newUser.save()

    });

    after(async () => {
        await User.deleteOne({ email: testEmail1 })
        await disconnectDB();

    });

    test("Authorised token", async () =>{
        const jwtToken = jwt.sign({ uid : newUser._id.toString()}, process.env.SECRET_KEY, {
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
        const jwtToken = jwt.sign({ uid : missingUserId}, process.env.SECRET_KEY, {
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
    const newUser = new User({
        email : testEmail1,
        username: testUser1,
        password: testPassword1,
        role: "User"
    })
    before(async () =>{
        await connectDB();
        await newUser.save()

    });

    after(async () => {
        await User.deleteOne({ email: testEmail1 })
        await disconnectDB();

    });
    test("User found, email sent", async () => {
        const response = await request(app)
            .post("/auth/forgot")
            .send({
                email: testEmail1,
                user: "",
                useUser: false
            });

        assert.equal(response.status, 200)

    });

    test("Email or user not recognised")

});

describe("POST /auth/reset-password", () => {

});
