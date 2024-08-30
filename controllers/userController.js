const User = require("../models/userModel")
const asyncHandler = require('express-async-handler')

// get a single product
const login = asyncHandler(async(req, res) => {
    try {
        const {email} = req.body
        const Email = await User.find({email});
        res.status(200).json(Email);
    } catch (error) {
        console.log(error)
        res.status(500);
        throw new Error('error.message');
    }
})

// create a user
const signup = asyncHandler(async(req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(200).json(user);
    } catch (error) {
        res.status(500);
        throw new Error('error.message');
    }
})

module.exports = {
login,
signup,
}