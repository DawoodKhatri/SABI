require("dotenv").config({ path: "./config/config.env" });
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const user = require("./routes/user");

const app = express();
app.use(bodyParser());
app.use(cookieParser());

app.use("/api", user);

module.exports = app;
