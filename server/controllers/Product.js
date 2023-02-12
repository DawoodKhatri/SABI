const { default: mongoose } = require("mongoose");
const Product = require("../models/Product");
const Restaurant = require("../models/Restaurant");

exports.addProduct = async (req, res) => {
  try {
    const { restaurantId, name, image, categories, cuisine, tag } = req.body;

    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    if (req.user._id.toString() !== restaurant.owner.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const newProduct = {
      name,
      image,
      categories,
      cuisine,
      tag,
    };

    const product = await Product.create(newProduct);

    restaurant.products.push(product._id);
    await restaurant.save();

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const restaurant = await Restaurant.findOne({
      products: mongoose.Types.ObjectId(req.params.id),
    });

    if (req.user._id.toString() !== restaurant.owner.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await product.remove();
    product.save();

    const index = restaurant.products.indexOf(req.params.id);
    restaurant.products.splice(index, 1);
    restaurant.save();

    res.status(200).json({
      success: true,
      message: "Product deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
