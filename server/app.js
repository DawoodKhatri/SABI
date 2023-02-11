require("dotenv").config({ path: "./config/config.env" });
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const user = require("./routes/user");
const restaurant = require("./routes/restaurant");

const app = express();
app.use(bodyParser());
app.use(cookieParser());

app.use("/api/user", user);
app.use("/api", restaurant);

module.exports = app;
