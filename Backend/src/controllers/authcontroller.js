const authRouter = require("express").Router();
const bcrypt = require("bcryptjs");
const userModel = require('../models/user.model')
const jwt = require("jsonwebtoken");




// user model creation
async function registerController(req, res) {

    const { username, email, password, bio, profilePic } = req.body;

    // email and username should be unique
    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            { email },
            { username }
        ]
    });
    if (isUserAlreadyExists) {
        return res.status(409).json({
            message: "User with the given email or username already exists",
        });
    }


    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // creating user in the database
    const user = await userModel.create({
        username,
        email,
        bio,
        profilePic,
        password: hashedPassword
    })

    const token = jwt.sign({
        id: user._id,
        username: user.username

    }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    })

    res.cookie("token", token)
    res.status(201).json({
        message: "User registered successfully",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profilePic: user.profilePic
        }
    })
}


async function loginController(req, res) {

    const { email, username, password } = req.body

    const user = await userModel.findOne({
        $or: [
            { email: email },
            { username: username }
        ]
    })
    if (!user) {
        return res.status(404).json({
            message: "User not found with the given email or username",
        });
    }
    const hashedPassword = await bcrypt.compare(password, user.password);
    if (!hashedPassword) {
        return res.status(401).json({
            message: "Invalid credentials",
        });
    }

    const token = jwt.sign({
        id: user._id,
        username: user.username

    }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    })
    res.cookie("token", token)
    res.status(200).json({
        message: "User logged in successfully",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profilePic: user.profilePic
        }
    })

}


async function getMeController(req, res) {
    const userId = req.user.id

    const user = await userModel.findById(userId)

    res.status(200).json({
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}

module.exports = {
    registerController,
    loginController,
    getMeController
}