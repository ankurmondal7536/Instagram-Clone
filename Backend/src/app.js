require("dotenv").config();
const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());

// cors error fix
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(cookieParser());


// importing routes
const postRouter = require("./routes/post.routes");
const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");


// using routes
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter)
app.use("/api/users", userRouter)

module.exports = app;