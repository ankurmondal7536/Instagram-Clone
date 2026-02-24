const express = require("express");
const authController = require("../controllers/authcontroller");
const authRouter = express.Router()
const identifyUser = require("../middlewares/auth.middleware")



// POST /api/auth/register
authRouter.post("/register", authController.registerController)
authRouter.post("/login", authController.loginController)



/**
 * @route GET /api/auth/get-me
 * @desc Get the currently logged in user's information
 * @access Private
 */
authRouter.get("/get-me", identifyUser, authController.getMeController)

module.exports = authRouter;