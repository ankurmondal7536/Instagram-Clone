const authRouter = require("express").Router();
const crypto = require("crypto");
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
    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

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
            { email },
            { username }
        ]
    })  
     if (!user) {
        return res.status(404).json({
            message: "User not found",
        });
    }
    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");
    if (hashedPassword !== user.password) {
        return res.status(401).json({
            message: "Invalid credentials",
        });
    }
    else if (hashedPassword === user.password) {
        const token = jwt.sign({
            id : user._id,

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
}


module.exports = {
    registerController,
    loginController
}