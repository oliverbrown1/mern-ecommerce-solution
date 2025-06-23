mg = require("mongoose");
require('dotenv').config()

const connectDB = async () => {
    try{
        await mg.connect(process.env.MGURL);
        console.log("DB connected");

    }
    catch(error){
        console.log("Ran into error connecting to DB... ");
        console.log(error);
        process.exit(1)

    }
}

module.exports = connectDB