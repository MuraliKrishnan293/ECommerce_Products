const express = require("express");
const router = express.Router();
const UserCart = require("../models/cartSchema");

router.post("/addtocart", async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).send("Please login first");
    }

    const { title, price, image } = req.body;
    const userId = req.user.id;
    console.log("useridaddtocart:", userId);

    let userCart = await UserCart.findOne({ userid: userId });

    if (!userCart) {
      userCart = new UserCart({ userid: userId, items: [] });
    }
    if (!userCart.items) {
      userCart.items = [];
    }

    userCart.items.push({ title, price, image });
    await userCart.save();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/getcart", async (req, res) => {
  const userid = req.user.id;
  console.log("user", userid);
  // const {userid} = req.user;

  try {
    const userCart = await UserCart.find({ userid: userid });
    // console.log('Userid : ',userid);

    if (!userCart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    // if(userCart){
    // console.log(userCart)
    // console.log(userCart.data)
    res.status(200).json({ success: true, cart: userCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.delete("/removeFromCart/:itemId", async (req, res) => {
  const userid = req.user.id;
  const { cartId, itemId } = req.params;
  try {
    const cart = await UserCart.findOne({ userid: userid });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    cart.items = cart.items.filter((item) => item._id != itemId);
    await cart.save();
    res
      .status(200)
      .json({ success: true, message: "Item removed from the cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error occurred" });
  }
});

module.exports = router;
