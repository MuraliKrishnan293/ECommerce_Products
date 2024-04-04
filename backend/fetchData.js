const express = require("express");
const router = express.Router();

router.get("/getData", async (req, res) => {
  try {
    const fetchData = await fetch("https://fakestoreapi.com/products");
    const data = await fetchData.json();
    // console.log(data);
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

router.get('/getsingledata/:id', async(req,res)=>{
  const {id} = req.params;
  try {
    const getData = await fetch(`https://fakestoreapi.com/products/${id}`)
    const data = await getData.json();
    // console.log(data)
    res.json(data)
  } catch (error) {
    console.log(error)
  }
})

router.get('/getCategories', async(req,res)=>{
  try {
    const get = await fetch('https://fakestoreapi.com/products/categories')
    const data = await get.json();
    // console.log(data)
    res.json(data)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router;