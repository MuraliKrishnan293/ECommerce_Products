const express = require("express");
const router = express.Router();
const user = require("../models/userSchema");

router.get("/getUserData/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const suser = await user.findById(id);
    if (!suser) {
      return res.json("Not Authenticated");
    }
    return res.json({ id: suser.id, name: suser.username, email: suser.email });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
