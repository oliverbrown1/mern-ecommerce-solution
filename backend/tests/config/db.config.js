const mg = require("mongoose");
require('dotenv').config()

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

module.exports = {connectDB, disconnectDB}