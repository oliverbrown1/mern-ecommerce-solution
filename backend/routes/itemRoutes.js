// TODO - define routes to allow site to get items and their data from mongodb
const ic = require("../controllers/itemController.js");
const ac = require("../controllers/authController.js")
const express = require('express');
const router = express.Router();

router.get("/home-screen-items/:category", ic.homeScreenItems);
router.get("/get/:id", ic.getItem);
router.get("/categories", ic.getCategories);
router.post("/add", ac.verifyToken, ic.addItem);
router.delete("/remove/:id", ac.verifyToken, ic.removeItem);

module.exports = router;