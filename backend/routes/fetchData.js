const express = require("express");
const router = express.Router();
const Product = require("../models/productSchema");
const User = require("../models/userSchema");

router.get("/getData", async (req, res) => {
  console.log(req.userid);
  try {
    const fetchData = await Product.find();
    // const data = await fetchData.json();
    // console.log(data);
    res.json(fetchData);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getsingledata/:id", async (req, res) => {
  const { id } = req.params;
  console.log("Params: ", id);
  try {
    const getData = await Product.findById(id);
    res.json(getData);
  } catch (error) {
    console.log(error);
  }
});

router.get("/getTotalProducts", async (req, res) => {
  console.log(req.userid);
  try {
    const fetchData = await Product.find();
    res.json({ len: fetchData.length });
  } catch (error) {
    console.log(error);
  }
});

router.get("/totalusers", async (req, res) => {
  const getUsers = await User.find();
  // const all = await getUsers.json();
  res.json(getUsers);
  console.log("Users: ", getUsers);
});

module.exports = router;
