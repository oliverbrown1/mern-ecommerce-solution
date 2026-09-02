const express = require('express')
const router = express.Router()
const ac = require("../controllers/authController.js")
const uc = require("../controllers/userController.js")

// preceded by /cart
router.get("/addresses", ac.verifyToken, uc.getAddresses);

router.patch("/address/shipping", ac.verifyToken, uc.setShippingAddress);

router.patch("/address/billing", ac.verifyToken, uc.setBillingAddress)

router.get("/balance", ac.verifyToken, uc.getBalance)

// top-up balance, not modify
router.post("/balance/top-up", ac.verifyToken, uc.addBalance)

module.exports = router;