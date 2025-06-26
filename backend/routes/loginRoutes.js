const express = require('express')
const router = express.Router()
const ac = require("../controllers/authController.js")

router.post("/login", ac.loginUser)

router.post("/logout", (req, res) => {
    res.clearCookie('token');
    res.status(200).json({message: "You have successfully logged out"});
})

router.post("/signup", ac.signupUser)

module.exports = router;