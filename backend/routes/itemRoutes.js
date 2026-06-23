// TODO - define routes to allow site to get items and their data from mongodb
const ic = require("../controllers/itemController.js");
const express = require('express');
const router = express.Router();

router.get("/home-screen-items/:category", ic.homeScreenItems);
router.get("/item/:id", ic.getItem);
router.get("/categories", ic.getCategories);
router.post("/item", ic.addItem);
router.delete("/item/:id", ic.removeItem);

module.exports = router;