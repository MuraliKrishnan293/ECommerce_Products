const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRETKEY = "abcdefg";
const user = require("./models/userSchema");

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  let newPassword = await bcrypt.hash(password, salt);
  try {
    const newuser = await user.create({
      username,
      email,
      password: newPassword,
    });
    res.json("User Created Successfully");
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const cuser = await user.findOne({ email:email });
    if (!cuser) {
      return res.json("User Not Found");
    }
    pwdCompare = await bcrypt.compare(password, cuser.password);
    if (!pwdCompare) {
      return res.json("Password Wrongly Entered");
    }
    const data = {
      user: {
        id: cuser.id,
      },
    };
    const authToken = jwt.sign(data, SECRETKEY);
    res.json({
      success: true,
      authToken: authToken,
      username: cuser.username,
      userid: cuser.id,
      email:cuser.email
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
