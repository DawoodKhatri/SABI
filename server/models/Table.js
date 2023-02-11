const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({});

module.exports = mongoose.model("Table", tableSchema);
