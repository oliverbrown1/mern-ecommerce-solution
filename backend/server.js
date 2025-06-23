const loginRoutes = require("./routes/loginRoutes.js")
const express = require('express')
const connectDB = require("./config/database.js")
const app = express()
const port = 3001



// middleware
app.use("/test",loginRoutes);

connectDB();

app.listen(port, () => {
    console.log(`server started on ${port}`);
})

app.get("/help", (req,res) => {
    res.status(200).send("Hi");
})

// REMOVED