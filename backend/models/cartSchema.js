const mongoose = require("mongoose");
const user = require("../models/userSchema");

const userCartSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  items: [
    {
      title: { type: String },
      price: { type: Number },
      image: { type: String },
    },
  ],
});

module.exports = mongoose.model("UserCart", userCartSchema);
