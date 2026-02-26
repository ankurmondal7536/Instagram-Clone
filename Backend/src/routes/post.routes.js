const express = require("express");
const postController = require("../controllers/postcontroller");
const postRouter = express.Router()
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() })
const identifyUser = require("../middlewares/auth.middleware")



// POST /api/posts/
postRouter.post("/", upload.single("image"), identifyUser, postController.createPostController)


// GET /api/posts/details/:postid
postRouter.get("/", identifyUser, postController.getPostController)

// GET /api/posts/details/:postid
postRouter.get("/details/:postid", identifyUser, postController.getPostDetailsController)

// like routes
// POST /api/posts/like/:postid
postRouter.post("/like/:postid", identifyUser, postController.likePostController)   

// get  /api/posts/feed
// get all post created in the DB
// private access
postRouter.get("/feed", identifyUser, postController.getFeedController)


module.exports = postRouter