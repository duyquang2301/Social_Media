const express = require("express");
const app = express();

const mongoose = require("mongoose");
const morgan = require("morgan");
const userRoute = require("./router/user");
const authRoute = require("./router/auth");
const postRoute = require("./router/post");
const database = require("./config/db.js");

database.connect();

//middleware
app.use(express.json());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/auth", authRoute);

app.listen(3000, () => {
  console.log("sever is running");
});
