require('dotenv').config()
const connectDB = require("../config/database");
const Item = require("../models/itemModel.js")

const homeScreenItems = async (req, res) => {
    // TODO - gets X items for home screen display
    try{
        const items = await Item.find().limit(20);
        const processedItems = items.map((item) => ({
            id: item._id,
            name: item.title,
            price: item.price,
            image_url: item.thumbnail,
            rating: item.rating
        }));


        return res.status(200).json(processedItems);
    }
    catch(error){
        return res.status(500).json({message: `Server error has occurred: ${error}`})
    }
}

const getItem = async (req, res) => {
    // TODO - gets singular item details
    try{
        const { sku } = req.body;
        const item = await Item.findOne({ sku });
        if(!item){
            return res.status(404).json({ message: "Item not found." });
        }
        return res.status(200).json(item);
    }
    catch(error){
        return res.status(500).json({message: `Server error has occurred: ${error}`})
    }
}

const addItem = async (req, res) => {
    // TODO - adds a new item, requires auth
    try{
        const {title, price, description, thumbnail, category, stock, rating, brand, sku, tags, reviews} = req.body;
        const owner = req.user || "Admin";

        const item = await Item.findOne({ sku });
        if(item){
            return res.status(409).json({ message: "Item already exists." });
        }

        const newItem = new Item({
            title,
            price,
            description,
            thumbnail,
            category,
            stock,
            rating,
            brand,
            sku,
            tags,
            reviews,
            owner
        });

        await newItem.save();
        return res.status(201).json(newItem);
    }
    catch(error){
        return res.status(500).json({message: `Server error has occurred: ${error}`})
    }
}

const removeItem = async (req, res) => {
    // TODO - removes an item, requires auth
    try{
        const { sku } = req.body;
        const item = await Item.findOne({ sku });
        if(!item){
            return res.status(404).json({ message: "Item not found." });
        }
        await Item.deleteOne({ sku });
        return res.status(200).json({ message: "Item deleted successfully." });
    }
    catch(error){
        return res.status(500).json({message: `Server error has occurred: ${error}`})
    }
}

module.exports = { homeScreenItems, getItem, addItem, removeItem }
