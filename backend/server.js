const connectDB = require("./config/database.js")
const app = require("./app.js")
const port = 3001


connectDB();
// start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
