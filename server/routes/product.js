const express = require("express");
const { addProduct, deleteProduct } = require("../controllers/Product");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.route("/product/add").post(isAuthenticated, addProduct);
router.route("/product/:id").delete(isAuthenticated, deleteProduct);

module.exports = router;
