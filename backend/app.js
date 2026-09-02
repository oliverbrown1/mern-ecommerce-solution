const loginRoutes = require("./routes/loginRoutes.js");
const itemRoutes = require("./routes/itemRoutes.js");
const cartRoutes = require("./routes/cartRoutes.js")
const userRoutes = require("./routes/userRoutes.js");
const express = require('express')
// const limiter = require("./middleware/ratelimiter.js")
const { verifyToken } = require('./controllers/authController')
const app = express()
const cors = require('cors')


// middleware routess
app.use(express.json());
app.use(cors());
// app.use(limiter)
app.use("/auth",loginRoutes);
app.use("/items", itemRoutes);
app.use("/user", userRoutes)
app.use("/cart", cartRoutes);


// protected route
app.get("/", verifyToken, (req,res) => {
    // token verification successful - can access protected routes
    res.status(200).send("You are now logged in");
});

app.get("/help", (req, res) => {
    res.status(200).send("Hi");
})

module.exports = app;
