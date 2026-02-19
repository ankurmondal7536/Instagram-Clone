const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/usercontroller");
const identifyUser = require("../middlewares/auth.middleware")

// follow routes
// POST /api/users/follow/:username
userRouter.post("/follow/:username", identifyUser, userController.followUserController)

// unfollow routes
// POST /api/users/unfollow/:username
userRouter.post("/unfollow/:username", identifyUser, userController.unfollowUserController) 



// userRouter.get("/follow/pendingrequests", identifyUser, userController.getPendingFollowRequestsController)

module.exports = userRouter;
