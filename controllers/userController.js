const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const asyncHandler = require('express-async-handler')

// get a user
const login = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body; // Correctly destructure req.body

        // Find the user by email
        const user = await User.findOne({ email });
    
        // Check if user exists
        if (user) {
            // Compare the provided password with the hashed password stored in the database
            const isPasswordMatch = await bcrypt.compare(password, user.password);

            if (isPasswordMatch) {
                // Password matches, respond with user details or token
                res.status(200).json({ message: 'Login successful', user });
            } else {
                // Password does not match
                res.status(400).json({ message: 'Incorrect password' });
            }
        } else {
            // User not found
            res.status(400).json({ message: 'Email not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// create a user
const signup = asyncHandler(async(req, res) => {
    const data = {
        name: req.body.name,
        email: req.body.email, 
        username: req.body.username, 
        password: req.body.password
    }
    
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword;
        
        const user = await User.create(data);
        console.log(user);
        res.status(200).json(user);
    } catch (error) {
        res.status(500);
        throw new Error('error.message');
    }
})

//checking for user
const check = async (req, res) => {
    const { email } = req.body;
    try {
      const user = await User.findOne({ email });
      if (user) {
        return res.status(200).json({ exists: true });
      }else{
        return res.status(200).json({ exists: false });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
  };

module.exports = {
check,
login,
signup,
}