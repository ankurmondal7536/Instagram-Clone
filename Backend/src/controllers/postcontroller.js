const postModel = require("../models/post.model")
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");



const client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
})

async function createPostController(req, res) {
    // console.log(req.body, req.file)

    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: "Token not provided, Unauthorized access"
        })
    }

    let decoded

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        return res.status(401).json({
            message: "user not authorized"
        })
    }


    // console.log(decoded)

    const file = await client.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "image",
        folder: "insta-clone"
    })

    const post = await postModel.create({
        caption: req.body.caption,
        imageUrl: file.url,
        user: decoded.id
    })

    res.status(201).json({
        message: "Post created successfully.",
        post
    })
}


async function getPostController(req, res) {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({
            message: "Token not Provided, Unauthorized"
        })
    }
    let decode
    try {
        decode = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        return res.status(401).json({
            message: "Invalid token, user unauthorized"
        })
    } const userId = decode.id
    const posts = await postModel.find({
        user: userId
    })
    res.status(200).json({
        message: "Posts fetched successfully",
        posts: posts
    })
}

async function getPostDetailsController(req, res) {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({
            message: "Token not Provided, Unauthorized"
        })
    }
    let decode
    try {
        decode = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        return res.status(401).json({
            message: "Invalid token, user unauthorized"
        })
    }

    const userId = decode.id
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


module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController

}
