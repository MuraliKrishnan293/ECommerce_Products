const mongoose = require("mongoose");
// const user = require('./models/userSchema')


const itemSchema = new mongoose.Schema({
    id: Number,
    title: String,
    price: Number,
    description: String,
    image: String
  });


const cartSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
},
  // id:Number,
  // title:String,
  // price:Number,
  // // description:String,
  // image:String
  orderdata: {
    type: [itemSchema],
    required: true,
  },
});

module.exports = new mongoose.model("cart", cartSchema);
