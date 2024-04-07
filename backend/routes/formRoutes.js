const express = require("express");
const router = express.Router();
const Form = require("../models/formSchema");
const { isAdmin } = require("../verify");

router.get("/formget", isAdmin, async (req, res) => {
  try {
    const form = await Form.find();
    res.json(form);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
