require("dotenv").config({ path: "./config/config.env" });
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const user = require("./routes/user");
const restaurant = require("./routes/restaurant");

app.use("/api", user);
app.use("/api", restaurant);

module.exports = app;
