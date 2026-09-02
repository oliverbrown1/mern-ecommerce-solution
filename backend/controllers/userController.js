const User = require("../models/userModel.js");
require('dotenv').config();

const getAddresses = async (req, res) => {
    const userId = req.user;
    try{
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({ message : "User not found."})
        }

        return res.status(200).json({message: "Addresses retrieved successfully", billing : user?.billing_address, shipping: user?.shipping_address})
    }
    catch (error) {
        return res.status(500).json({ message: `Server error has occurred: ${error}` });
    }
}

const setShippingAddress = async (req, res) => {
    const userId = req.user;
    const { address } = req.body;
    const { line1, line2, city, postcode, country } = address ?? {};
    try{
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({ message : "User not found."})
        }

        user.shipping_address = {
            line1: line1,
            line2: line2,
            city: city,
            postcode: postcode,
            country: country
        }
        await user.save();
        return res.status(200).json({message : "Shipping address saved."});

    }
    catch (error) {
        return res.status(500).json({ message: `Server error has occurred: ${error}` });
    }
}

const setBillingAddress = async (req, res) => {
    const userId = req.user;
    const { address } = req.body;
    const { line1, line2, city, postcode, country } = address ?? {};
    try{
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({ message : "User not found."})
        }

        user.billing_address = {
            line1: line1,
            line2: line2,
            city: city,
            postcode: postcode,
            country: country
        }
        await user.save();
        return res.status(200).json({message : "Billing address saved."});

    }
    catch (error) {
        return res.status(500).json({ message: `Server error has occurred: ${error}` });
    }
}

const addBalance = async (req, res) => {
    const userId = req.user;
    const { addedBalance } = req.body;
    try{
        const topUpAmount = Number(addedBalance);
        if(!Number.isFinite(topUpAmount) || topUpAmount <= 0){
            return res.status(400).json({message : "Added balance must be non-negative and to 2 decimal places."})
        }

        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({ message : "User not found."})
        }

        user.balance += topUpAmount;
        await user.save();
        return res.status(200).json({message : "Balance topped up successfully", balance : user.balance});

    }
    catch (error) {
        return res.status(500).json({ message: `Server error has occurred: ${error}` });
    }
};

const getBalance = async (req, res) => {
    const userId = req.user;
    try{
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({ message : "User not found."})
        }

        return res.status(200).json({message : "Balance retrieved successfully", balance : user.balance});

    }
    catch (error) {
        return res.status(500).json({ message: `Server error has occurred: ${error}` });
    }

};

module.exports = {
    getAddresses,
    setBillingAddress,
    setShippingAddress,
    addBalance,
    getBalance
}