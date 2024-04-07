const jwt = require("jsonwebtoken");
const SECRETKEY = "abcdefg";
const User = require("./models/userSchema");
const bcrypt = require("bcryptjs");

const Middleware = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.json({ message: "Token Miss" });
  }
  try {
    const decoded = jwt.verify(token, SECRETKEY);
    const isAdmin = decoded.user.isAdmin;
    console.log("verify : ", decoded.user.id);
    next();
  } catch (error) {
    res.json({ message: "Token Wrong" });
  }
};

const isAdmin = (req, res, next) => {
  console.log("isAdmin middleware executed");
  console.log("req.isAdmin:", req.isAdmin);
  console.log("req.user.isAdmin:", req.user.isAdmin);
  if (req.isAdmin || (req.user && req.user.isAdmin)) {
    console.log("User is admin");
    next();
  } else {
    console.log("User is not admin");
    return res.status(403).json({ error: "Unauthorized Not An Admin" });
  }
};

// module.exports = isAdmin;

module.exports = { Middleware, isAdmin };
