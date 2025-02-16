const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


// @desc Register a user
// @route POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registerd");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username, email, password: hashedPassword
    })

    if (user) {
        res.status(201).json({ _id: User.id, email: User.email })
    }
    else {
        res.status(400);
        throw new Error("User data is not valid")
    }

    res.status(200).json(user)
});

// @desc login  user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400)
        throw new Error("All fields are mandatory")
    }

    const user = await User.findOne({ email });

    // Compare passord
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            },
        },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        )
        res.status(200).json({ accessToken })
    }
    else {
        res.status(400);
        throw new Error("Email or Password is not valid")
    }

});

// @desc get Current User
// @route POST /api/users/current
// @access Private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user)
});

module.exports = { registerUser, loginUser, currentUser }