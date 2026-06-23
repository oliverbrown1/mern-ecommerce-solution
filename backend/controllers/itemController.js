require('dotenv').config()
const Item = require("../models/itemModel.js")

const homeScreenItems = async (req, res) => {
    // TODO - gets X items for home screen display
    try{
        const { category } = req.params;
        const items = await Item.find({ category: category }).limit(20);
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

const getCategories = async (req, res) => {
    try{
        const categories = await Item.distinct("category");
        return res.status(200).json({ categories: categories.slice(0,3) });
    }
    catch(error){
        return res.status(500).json({message: `Server error has occurred: ${error}`})
    }

}

const getItem = async (req, res) => {
    // TODO - gets singular item details
    try{
        const { id } = req.params;
        const item = await Item.findById(id);
        if(!item){
            return res.status(404).json({ message: "Item not found." });
        }

        // get similar items
        const similarItems = await Item.find({ category: item.category, _id: { $ne: id } }).limit(5);
        return res.status(200).json({ item : item, similar : similarItems });
    }
    catch(error){
        return res.status(500).json({message: `Server error has occurred: ${error}`})
    }
}


const addItem = async (req, res) => {
    // TODO - adds a new item, requires auth
    try{
        const {title, price, description, thumbnail, images, category, stock, rating, brand, sku, tags, reviews} = req.body;
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
            images,
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
        const { id } = req.params;
        const item = await Item.findById(id);
        if(!item){
            return res.status(404).json({ message: "Item not found." });
        }
        await Item.findByIdAndDelete(id);
        return res.status(200).json({ message: "Item deleted successfully." });
    }
    catch(error){
        return res.status(500).json({message: `Server error has occurred: ${error}`})
    }
}

module.exports = { homeScreenItems, getCategories, getItem, addItem, removeItem }
