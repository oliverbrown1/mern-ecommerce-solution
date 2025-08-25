const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const User = require("../models/userModel.js")
const nodemailer = require('nodemailer');
require('dotenv').config()

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
        const { email, user, pwd } = req.body
        const emailExists = await User.findOne({ email: email })
        const userExists = await User.findOne({ username: user })
        if(emailExists){
            return res.status(400).json({message : "Email already in use."})
        }
        if(userExists){
            return res.status(400).json({message : "Username already in use."})
        }
        const newUser = new User({
            email : email,
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
        const { email, pwd } = req.body;
        const foundUser = await User.findOne({ email: email });
        if(!foundUser){
            return res.status(401).json({message: "Email not recognised."})
        }

        // when we hash passwords
        // const pwdMatch = await bcrypt.compare(pwd, foundUser.password);
        const pwdMatch = (pwd === foundUser.password)
        if(!pwdMatch){
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
const forgotPassword = async (req, res) => {
    const { email, user, useUser } = req.body;
    let foundUser;
    if (useUser){
        foundUser = await User.findOne({ username: user });
    }
    else{
        foundUser = await User.findOne({ email: email });
    }
    if(!foundUser){
        return res.status(401).json({message: "Email or username not recognised."})
    }
    const expirationToken = jwt.sign({ uid : foundUser.id}, process.env.SECRET_KEY, {
        expiresIn: '1h',
    })
    foundUser.passwordResetToken = expirationToken;
    await foundUser.save();

    const url = `${process.env.FRONTEND_URL}/reset-password/${foundUser.id}/${expirationToken}`;
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.MY_EMAIL,
          pass: process.env.GOOGLE_APP_PASSWORD,
        },
      });

    const mail_configs = {
        from: process.env.MY_EMAIL,
        to: foundUser.email,
        subject: "No-Reply: Password Reset for Mern Marketplace",
        html: `<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8">
  <title>CodePen - OTP Email Template</title>
  

</head>
<body>
<!-- partial:index.partial.html -->
<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:80%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Mern Marketplace</a>
    </div>
    <p style="font-size:1.1em">Dear ${foundUser.username},</p>
    <p>Here is a link to the password reset you have requested, if you did not request this email you may safely ignore it. This link is valid for 1 hour.</p>
    <div style="margin: 24px 0; text-align: center;">
        <a 
            href="${url}" 
            style="
                background: #2563eb;
                color: #ffffff;
                text-decoration: none;
                padding: 12px 24px;
                border-radius: 6px;
                font-weight: 500;
                display: inline-block;
                margin: 16px 0;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                transition: all 0.2s ease-in-out;
            "
            onmouseover="this.style.background='#1d4ed8'; this.style.boxShadow='0 4px 8px rgba(0, 0, 0, 0.15)';"
            onmouseout="this.style.background='#2563eb'; this.style.boxShadow='0 2px 4px rgba(0, 0, 0, 0.1)';"
        >
            Reset My Password
        </a>
    </div>
    <p style="font-size:0.9em;">Sincerely,<br />The Mern Marketplace Team</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>Mern Marketplace</p>
      <p>Example location</p>
    </div>
  </div>
</div>
<!-- partial -->
  
</body>
</html>`
    };

    transporter.sendMail(mail_configs, function(error, info){
    if (error) {
        console.log(error);
        res.status(500).json({message: 'Email could not be sent: ' + error});
    } else {
        res.status(200).json({message: 'Email sent: ' + info.response});
    }
    });
}

// todo
const resetPassword = async (req, res) => {
    const {id, token, pwd} = req.body;
    const user = await User.findById(id);
    if (!user) {
        console.log("User not found");
        return res.status(404).json({ message: "User not found." });
    }

    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
        console.log("verifying token")
        if (err || user.passwordResetToken !== token) {
            return res.status(401).json({ message: "Your link has expired!" });
        }
        console.log("token verified")
    
        try {
            user.password = pwd;
            user.passwordResetToken = null;
            await user.save();
            return res.status(200).json({ message: "Password reset successfully." });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "An error occurred while resetting your password."});
        }
    });
}

const logout = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({message: "You have successfully logged out"});
}

const getUser = async (req, res) => {
    try{
        const user = await User.findById(req.user);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        res.status(200).json({ message: "User found successfully.", user: user });
    }
    catch(error){
        console.log(error)
        return res.status(500).json({ message: "An error occurred while getting your user."});
    }
}


module.exports = { verifyToken, signupUser, loginUser, forgotPassword, resetPassword, getUser}