const loginRoutes = require("./routes/loginRoutes.js")
const express = require('express')
const connectDB = require("./config/database.js")
const app = express()
const port = 3001



// middleware routes
app.use(express.json());
app.use("/test",loginRoutes);

// initiate DB connection
connectDB();

// start message
app.listen(port, () => {
    console.log(`server started on ${port}`);
})

// routes
app.get("/help", (req,res) => {
    res.status(200).send("Hi");
})
