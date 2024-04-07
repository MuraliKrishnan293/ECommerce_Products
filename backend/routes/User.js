const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRETKEY = "abcdefg";
const User = require("../models/userSchema");

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const UC = await User.findOne({ username: username });
    if (UC) {
      return res.status(400).json("Username Exists");
    }
    const EC = await User.findOne({ email: email });
    if (EC) {
      return res.status(400).json("Email Exists");
    }
    if (!UC && !EC) {
      const salt = await bcrypt.genSalt(10);
      let newPassword = await bcrypt.hash(password, salt);
      const newuser = await User.create({
        username,
        email,
        password: newPassword,
      });
      return res.status(200).json("User Registered Successfully");
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  const admine = "admin@gmail.com";
  const adminp = "adminpassword";
  const { email, password } = req.body;
  try {
    const cuser = await User.findOne({ email: email });
    if (!cuser) {
      return res.status(400).json("Email does not exist");
    }
    pwdCompare = await bcrypt.compare(password, cuser.password);
    if (!pwdCompare) {
      return res.status(400).json("Password does not match");
    }
    let isAdmin = false;
    if (cuser.email === admine) {
      isAdmin = true;
    }

    const data = {
      user: {
        id: cuser.id,
        isAdmin: isAdmin,
      },
    };
    req.isAdmin = isAdmin;
    const authToken = jwt.sign(data, SECRETKEY);
    // console.log(cuser.id);
    res.status(200).json({
      success: true,
      authToken: authToken,
      username: cuser.username,
      userid: cuser.id,
      email: cuser.email,
      isAdmin: isAdmin,
    });
    // console.log(userId);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
