const express = require('express');
const router = express.Router();
const Cart = require('./models/cartSchema');


router.post('/addtocart', async (req, res) =>{
    const { orderdata } = req.body;
    const userid = req.user.id;
    // console.log( orderdata)
    // try {
        const useridCheck = await Cart.findOne({ userid : userid });
        if(!useridCheck){
            try {
                console.log( orderdata)
            const cartItem = await Cart.create({
                userid,
                orderdata
            })
            // res.json(cartItem)
            // res.json({success:true,'CartItems : ':cartItem});
            return res.status(200).json({ success: true, message: 'Item added to cart' });
        }
     catch (error) {
        console.log(error);
    }}
    else{
        try {
            const updatedCart = await Cart.findOneAndUpdate(
                { userid: userid },
                { $push: { orderdata: orderdata } }
            );
            if (updatedCart) {
                return res.status(201).json({ success: true, message: "Item has been updated in the existing cart" });
            } else {
                return res.status(404).json({ success: false, message: "Cart not found for the user" });
            }
        } 
        catch (error) {
            console.log(error);
        }
}})


router.get('/getcart', async (req, res) => {
    const userid = req.user.id; // Assuming userId is available in req.user.id

    try {
        const userCart = await Cart.find({ userid : userid });

        if (!userCart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }

        res.status(200).json({ success: true, cart: userCart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});


// Route to add a product to the cart
// router.post('/addtocart', async (req, res) => {
//     const { id, title, price, image } = req.body;
//     const userId = req.user.id; // Assuming userId is available in req.user.id

//     try {
//         // Check if the item already exists in the cart
//         const existingItem = await Cart.findOne({ user: userId, id });

//         if (existingItem) {
//             // If the item exists, update its quantity
//             existingItem.quantity += 1;
//             await existingItem.save();
//             return res.status(200).json({ success: true, message: 'Item quantity updated in cart' });
//         }

//         // If the item doesn't exist, add it to the cart
//         const cartItem = await Cart.create({
//             user: userId,
//             id,
//             title,
//             price,
//             image,
//             quantity: 1 // Assuming the initial quantity is 1
//         });

//         if (!cartItem) {
//             return res.status(400).json({ success: false, message: 'Failed to add item to cart' });
//         }

//         res.status(200).json({ success: true, message: 'Item added to cart successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: 'Server error' });
//     }
// });

// // Route to retrieve cart items for a specific user
// router.get('/getcart', async (req, res) => {
//     const userId = req.user.id; // Assuming userId is available in req.user.id

//     try {
//         const userCart = await Cart.find({ user: userId });

//         if (!userCart) {
//             return res.status(404).json({ success: false, message: 'Cart not found' });
//         }

//         res.status(200).json({ success: true, cart: userCart });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: 'Server error' });
//     }
// });

module.exports = router;
