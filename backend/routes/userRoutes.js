const express = require('express')
const router = express.Router()
const ac = require("../controllers/authController.js")
const uc = require("../controllers/userController.js")

// preceded by /cart
router.get("/get", ac.verifyToken, uc.getCart);

router.post("/add/:itemId/:quantity", ac.verifyToken, uc.addToCart);

router.patch("/modify/:itemId/:quantity", ac.verifyToken, uc.modifyCart);

router.delete("/empty", ac.verifyToken, uc.emptyCart);

router.post("/checkout/:useBalance", ac.verifyToken, uc.checkoutCart);

module.exports = router;