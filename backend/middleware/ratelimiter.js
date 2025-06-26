const ratelimit = require("../config/redis.js")

const limiter = async (req, res, next) => {
    try{
        const { success } = await ratelimit.limit(req.ip);
        
        if(!success){
            return res.status(420).json({message : "Too many requests in a short amount of time, please try again later."});

        }
        next();
    }
    catch(error){
        return res.status(500).json({message: "Server error occurred"});
    }
}

module.exports = limiter