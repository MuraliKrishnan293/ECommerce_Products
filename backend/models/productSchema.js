const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: String,
  title: String,
  price: Number,
  description: String,
  image: String,
  category: String,
});

module.exports = new mongoose.model("Product", productSchema);
