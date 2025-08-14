const express = require('express')
const router = express.Router()
const ac = require("../controllers/authController.js")

router.post("/login", (req, res) => {
  console.log('Login route hit', req.body);
//   res.status(200).json({message: "You have logged in successfully"})
  ac.loginUser(req, res);
})

router.post("/logout", (req, res) => {
    res.clearCookie('token');
    res.status(200).json({message: "You have successfully logged out"});
})

router.post("/signup", ac.signupUser)

router.post("/forgot", ac.forgotPassword)

router.post("/reset-password", ac.resetPassword)

module.exports = router;