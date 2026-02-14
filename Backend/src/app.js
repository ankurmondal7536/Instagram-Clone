require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const postRouter = require("./routes/post.routes");
const authRouter = require("./routes/auth.routes");

app.use(express.json());

app.use(cookieParser());

app.use("/api/auth", authRouter);

app.use("/api/posts", postRouter)

module.exports = app;