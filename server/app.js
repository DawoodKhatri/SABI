const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

require("dotenv").config({ path: "./config/config.env" });

const user = require("./routes/user");
const restaurant = require("./routes/restaurant");
const product = require("./routes/product");

app.use("/api", user);
app.use("/api", restaurant);
app.use("/api", product);

module.exports = app;
