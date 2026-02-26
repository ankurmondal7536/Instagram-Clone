const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        default: "",
    },
    imageUrl: {
        type: String,
        required: [true, "Image URL is required"],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "user id is required for creating an post"]
    }
}) 


const postModel = mongoose.model("posts", postSchema)


module.exports = postModel