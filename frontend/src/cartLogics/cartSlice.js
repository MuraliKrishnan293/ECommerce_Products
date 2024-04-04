import { createSlice } from "@reduxjs/toolkit";

const id = localStorage.getItem("id");

const initialState = [];

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart(state, action) {
      const existIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existIndex !== -1) {
        //if the product already exists in the cart we just increase its quantity by one
        state[existIndex].count++;
      } else {
        //if the product is not in the cart we add it to the cart
        state.push({ ...action.payload, count: 1 });
      }
    //   localStorage.setItem(`cartItems_${id}`, JSON.stringify(state));
      //   state.isLoading=false;
      //   return state;
    }, 
    removeFromCart(state, action) {
        // Remove from cart logic
        const updatedCartItems = state.filter(
            (item) => item.id !== action.payload
        );
    
        // Update localStorage after removing item
        // localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    
        // Return the updated state
        return updatedCartItems;
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
