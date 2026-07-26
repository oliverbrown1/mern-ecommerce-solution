const express = require('express')
const router = express.Router()
const ac = require("../controllers/authController.js")
const uc = require("../controllers/userController.js")

router.get("/cart", ac.verifyToken, uc.getCart)

router.post("/cart/items/:itemId/:quantity", ac.verifyToken, uc.addToCart)

module.exports = router;