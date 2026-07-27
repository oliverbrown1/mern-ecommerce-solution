const loginRoutes = require("./routes/loginRoutes.js")
const itemRoutes = require("./routes/itemRoutes.js")
const userRoutes = require("./routes/userRoutes.js");
const express = require('express')
const connectDB = require("./config/database.js")
const limiter = require("./middleware/ratelimiter.js")
const { verifyToken } = require('./controllers/authController')
const app = express()
const port = 3001
const cors = require('cors')



// middleware routess
app.use(express.json());
app.use(cors());
// app.use(limiter)
app.use("/auth",loginRoutes);
app.use("/items", itemRoutes);
app.use("/cart", userRoutes);

// initiate DB connection
connectDB();

// protected route
app.get("/", verifyToken, (req,res) => {
    // token verification successful - can access protected routes
    res.status(200).send("You are now logged in");
});

app.get("/help", (req, res) => {
    res.status(200).send("Hi");
})

// app.get('/{*any}', (req, res) => {
//     res.redirect('/');
// });

// start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
