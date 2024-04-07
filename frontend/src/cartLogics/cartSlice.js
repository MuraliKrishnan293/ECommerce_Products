import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await axios.get('http://localhost:5000/app/getcart', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      // const size =  response.data.cart.length;
      // console.log(size)
      return response.data.cart;
    } catch (error) {
      // return rejectWithValue(error.response.data);
      console.log(error);
    }
  }
);

export const removeCart =  createAsyncThunk(
  'cart/removeCart',
  async(id)=>{
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await axios.delete(`http://localhost:5000/app/removeFromCart/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      return response.data.cart;
    } catch (error) {
      console.log(error);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    // size: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // state.size = action.payload.length;
        state.items = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(removeCart.fulfilled,(state,action)=>{
        // state.items = state.items.filter(item => item.id !== action.payload.id);
        state.items = action.payload;
        // state.size = state.items.length;
      })
  },
});

export default cartSlice.reducer;

