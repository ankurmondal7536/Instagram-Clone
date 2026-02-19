const postModel = require("../models/post.model")
const likeModel = require("../models/like.model")
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");
const identifyUser = require("../middlewares/auth.middleware");


const client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
})

async function createPostController(req, res) {
    // console.log(req.body, req.file)
    // console.log(decoded)
    const file = await client.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "image",
        folder: "insta-clone"
    })

    const post = await postModel.create({
        caption: req.body.caption,
        imageUrl: file.url,
        user: req.user.id
    })

    res.status(201).json({
        message: "Post created successfully.",
        post
    })
}


async function getPostController(req, res) {

    const userId = req.user.id
    const posts = await postModel.find({
        user: userId
    })
    res.status(200).json({
        message: "Posts fetched successfully",
        posts: posts
    })
}



async function getPostDetailsController(req, res) {

    const userId = req.user.id
    const postId = req.params.postid

    const post = await postModel.findById(postId)
    if (!post) {
        return res.status(404).json({
            message: "Post not found with the given id"
        })
    }
    const isValidUser = post.user.toString() === userId
    if (!isValidUser) {
        return res.status(403).json({
            message: "Access denied, you are not the owner of this post"
        })
    }
    res.status(200).json({
        message: "Post details fetched successfully",
        post: post
    })
}

async function likePostController(req, res) {
    const postId = req.params.postid
    const userId = req.user.id
    // console.log(postId, userId)
    const post = await postModel.findById(postId)
    if (!post) {
        return res.status(404).json({
            message: "Post not found with the given id"
        })
    }
    const isAlreadyLiked = await likeModel.findOne({
        post: postId,
        user: userId
    })
    if (isAlreadyLiked) {
        return res.status(400).json({
            message: "Post is already liked by the user"
        })
    }
    const likes = await likeModel.create({
        post: postId,
        user: userId
    })
    res.status(200).json({
        message: "Post liked successfully",
        likes
    })
}


module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController,
    likePostController

}
