const User = require("../models/userModel.js")
const { cartItemSchema } = require("../models/cartModel.js")
require('dotenv').config()

const getCart = async (req, res) => {
    const { userId } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        return res.status(200).json({ message: `Cart retrieved successfully`, cart: user.cart });
    } catch (error) {
        return res.status(500).json({ message: `Server error has occurred: ${error}` });
    }
}

const addToCart = async (req, res) => {
    const userId = req.user
    const { itemId, quantity } = req.body;
    // arguments are string, need to be converted
    const quantityNum = Number(quantity)
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        const cartItem = user.cart.items.find(item => item.item.toString() === itemId);
        // found, increase quantity
        if (cartItem) {
            cartItem.quantity += quantityNum;
        }
        else{
            user.cart.items.push({item : itemId, quantity: quantityNum})

        }

        await user.save()
        return res.status(cartItem ? 200 : 201).json({ message: cartItem? `Item found, quantity increased` : `Item added to cart`, cart : user.cart})
    } catch (error) {
        return res.status(500).json({ message: `Server error has occurred: ${error}` });
    }
}

// modify cart item
const modifyCart = async (req, res) => {
    const userId = req.user
    const { itemId, quantity } = req.body;
    // arguments are string, need to be converted
    const quantityNum = Number(quantity)
    try {
        if (!Number.isInteger(quantityNum) || quantityNum < 0) {
        return res.status(400).json({
            message: "Quantity must be a non-negative integer.",
        });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        let cartItem = user.cart.items.find(item => item.item.toString() === itemId);
        if (!cartItem) { 
            return res.status(404).json({ message: "Item not found in Cart." });
        }
        if (quantityNum === 0){
            user.cart.items.pull(cartItem)
        }
        else {
            cartItem.quantity = quantityNum
        }

        await user.save()
        return res.status(200).json({ message: quantityNum === 0 ? `Item removed from cart.` : `Item quantity updated.`, cart : user.cart})

    } catch (error) {
        return res.status(500).json({ message: `Server error has occurred: ${error}` });
    }
}

const emptyCart = async (req, res) => {
    const userId = req.user
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        user.cart = null
        await user.save()

        return res.status(200).json({ message: `cart emptied`})

    } catch (error) {
        return res.status(500).json({ message: `Server error has occurred: ${error}` });
    }

}

const checkoutCart = async (req, res) => {

}

module.exports = {
    getCart,
    addToCart,
    modifyCart,
    emptyCart,
    checkoutCart
}