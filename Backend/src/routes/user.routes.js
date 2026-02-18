const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/usercontroller");
const identifyUser = require("../middlewares/auth.middleware")

// follow routes
// POST /api/users/follow/:username
userRouter.post("/follow/:username", identifyUser, userController.followUserController)


module.exports = userRouter;
