const express = require("express");
const authController = require("../controllers/authcontroller");
const authRouter = express.Router()



// POST /api/auth/register
authRouter.post("/register", authController.registerController)
authRouter.post("/login", authController.loginController)


module.exports = authRouter;