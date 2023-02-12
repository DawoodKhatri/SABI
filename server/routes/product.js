const express = require("express");
const { addProduct, deleteProduct, getProduct, getProducts } = require("../controllers/Product");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.route("/product/add").post(isAuthenticated, addProduct);
router.route("/product/:id").delete(isAuthenticated, deleteProduct);
router.route("/product/:id").get(getProduct);
router.route("/products/:id").get(getProducts);

module.exports = router;
