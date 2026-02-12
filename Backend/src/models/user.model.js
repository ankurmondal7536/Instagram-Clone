const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "Username already exists"],
        required: [true, "Username is required"],
    },
    email: {
        type: String,
        unique: [true, "Email already exists"],
        required: [true, "Email is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    bio: {
        type: String,
    },
    profilePic: {
        type: String,
        default: "https://ik.imagekit.io/ankur7536/default%20profile"
    },
})

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;