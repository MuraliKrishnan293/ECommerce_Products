const express = require("express");
const router = express.Router();
const { Middleware, isAdmin } = require("../verify");
const Product = require("../models/productSchema");

// router.use(isAdmin);
router.post("/addproduct", isAdmin, async (req, res) => {
  const { title, price, description, image, category } = req.body;
  // console.log('Entered');
  try {
    const newProduct = await Product.create({
      title: title,
      price: price,
      description: description,
      image: image,
      category: category,
    });
    // console.log('Hi');
    console.log("Product added successfully:", newProduct);
    res.status(200).json({ success: true, product: newProduct });
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ error: "Failed to add product" });
  }
});

router.put("/updateproduct/:id", isAdmin, async (req, res) => {
  const { id } = req.params;
  const { title, price, description, image, category } = req.body;
  // console.log('Entered');
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, {
      title: title,
      price: price,
      description: description,
      image: image,
      category: category,
    });
    console.log(updatedProduct);
    res.status(200).json({ success: true, product: updatedProduct });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Updating failed");
  }
});

module.exports = router;
