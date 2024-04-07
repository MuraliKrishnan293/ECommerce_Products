const express = require("express");
const router = express.Router();
const Form = require("../models/formSchema");

router.post("/formpost", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newForm = await Form.create({
      name,
      email,
      message,
    });
    res.json(newForm);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
