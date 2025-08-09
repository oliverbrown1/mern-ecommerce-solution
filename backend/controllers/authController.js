const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const User = require("../models/userModel.js")

// intermediate middleware function
const verifyToken = async (req, res, next) => {
    let token = req.headers["authtoken"] || req.headers["authorization"]
    
    if(!token){
        return res.status(402).json({message : "Missing token"})
    }

    // token might have "Bearer" prefix ??
    if(token.startsWith("Bearer ")){
        token = token.slice(7, token.length)
    }

    try{
        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        // test if we need to check if user exists in DB
        req.user = decoded.uid
        next()
    }
    catch(error){
        return res.status(401).json({message: "Unauthorised token access"})

    }
}

const signupUser = async (req, res) => {
    try{
        const { user, pwd } = req.body
        const userExists = await User.findOne({ username: user })
        if(userExists){
            return res.status(400).json({message : "User already exists."})
        }
        const newUser = new User({
            username: user,
            password: pwd,
            role: "User"
        })
        
        // add user to DB
        await newUser.save()
        res.status(201).json({message: 'You have registered successfully.'})
    }
    catch(error){
        return res.status(500).json({message: `Server error has occurred: ${error}`})
    }
}
const loginUser = async (req, res) => {
    try{
        const { user, pwd } = req.body;
        const foundUser = await User.findOne({ username: user });
        if(!foundUser){
            return res.status(404).json({message: "Username not recognised."})
        }

        if(!bcrypt.compare(pwd, foundUser.password)){
            return res.status(401).json({message: "Password is invalid."})
        }

        const jwtToken = jwt.sign({ uid : foundUser.id}, process.env.SECRET_KEY, {
            expiresIn: '1d',
        })

        res.status(200).json({
            token: jwtToken,
            message: "You have logged in successfully",
            role: foundUser.role
        })
    }
    catch(error){
        return res.status(500).json({message: `Server error has occurred: ${error}`})
    }


}

// todo
// const forgotPassword = async (req, res) => {
// }

// todo
// const resetPassword = async (req, res) => {
// }

const logout = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({message: "You have successfully logged out"});
}


module.exports = { verifyToken, signupUser, loginUser }