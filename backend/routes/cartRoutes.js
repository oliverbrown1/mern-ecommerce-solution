const express = require('express')
const router = express.Router()
const ac = require("../controllers/authController.js")
const cc = require("../controllers/cartController.js")

// preceded by /cart
router.get("/get", ac.verifyToken, cc.getCart);

router.post("/add", ac.verifyToken, cc.addToCart);

router.patch("/modify/:itemId", ac.verifyToken, cc.modifyCart);

router.delete("/empty", ac.verifyToken, cc.emptyCart);

router.post("/checkout", ac.verifyToken, cc.checkoutCart);

module.exports = router;