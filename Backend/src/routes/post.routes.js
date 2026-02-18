const express = require("express");
const postController = require("../controllers/postcontroller");
const postRouter = express.Router()
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() })
const identifyUser = require("../middlewares/auth.middleware")




postRouter.post("/", upload.single("image"), identifyUser, postController.createPostController)
postRouter.get("/", identifyUser, postController.getPostController)
postRouter.get("/details/:postid", identifyUser, postController.getPostDetailsController)

module.exports = postRouter