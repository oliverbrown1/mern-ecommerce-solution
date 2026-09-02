const User = require("../models/userModel.js");
const Item = require("../models/itemModel.js");
const Purchase = require("../models/purchaseModel.js");
require('dotenv').config();


async function calculateCartTotal(user){
    const cartCosts = await Promise.all(
        user.cart.items.map(async (item) => {
        const product = await Item.findById(item.item_id.toString());
        if (!product){
            return 0;
        }
        return product.price * item.quantity
    }));
    return cartCosts.reduce((a,b) => a+b, 0); 
}

// Controller functions
const getCart = async (req, res) => {
    const userId  = req.user;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        const cartTotal = await calculateCartTotal(user);
        return res.status(200).json({ message: `Cart retrieved successfully`, cart: user.cart, total: cartTotal });
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
        if (!Number.isInteger(quantityNum) || quantityNum <= 0) {
            return res.status(400).json({
                message: "Quantity must be a non-negative integer.",
            });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        const cartItem = user.cart.items.find(item => item.item_id.toString() === itemId);
        // found, increase quantity
        if (cartItem) {
            cartItem.quantity += quantityNum;
        }
        else{
            user.cart.items.push({item_id : itemId, quantity: quantityNum})

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
    const { itemId } = req.params
    const { quantity } = req.body;
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
        let cartItem = user.cart.items.find(item => item.item_id.toString() === itemId);
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
        user.cart.items.splice(0, user.cart.items.length);
        await user.save()

        return res.status(200).json({ message: `Cart emptied.`})

    } catch (error) {
        return res.status(500).json({ message: `Server error has occurred: ${error}` });
    }
}

const checkoutCart = async (req, res) => {
    const userId = req.user;
    const { useBalance } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        // cart check
        if (user.cart.items.length == 0){
            return res.status(400).json({ message: "Cart is empty." });
        }
        
        // balance check
        let outstandingBalance = await calculateCartTotal(user);
        const cartTotal = outstandingBalance;
        if(useBalance === "true"){
            const balanceUsed = Math.min(user.balance, outstandingBalance);
            user.balance -= balanceUsed;
            outstandingBalance -= balanceUsed;
        }
        if(outstandingBalance > 0){
            return res.status(402).json({ message: "Insufficient balance"})
        }

        // purchase items
        const purchaseItems = await Promise.all(
            user.cart.items.map(async (item) => {
            const product = await Item.findById(item.item_id.toString());
            if (!product){
                throw new Error("A product in the cart no longer exists.");
            }
            return {
                item_id : product._id,
                title: product.title,
                price: product.price,
                quantity: item.quantity,
            }
        }));

        // log purchase
        const purchase = new Purchase({
            user_id : userId,
            cart: purchaseItems,
            total : cartTotal,
            billing_address: user.billing_address,
            shipping_address: user.shipping_address
        })
        await purchase.save()
        user.cart.items.splice(0, user.cart.items.length);
        await user.save()
        return res.status(201).json({ message: `Cart successfully purchased`});
        // empty cart following this

    } catch (error) {
        return res.status(500).json({ message: `Server error has occurred: ${error}` });
    }
}

module.exports = {
    getCart,
    addToCart,
    modifyCart,
    emptyCart,
    checkoutCart
}