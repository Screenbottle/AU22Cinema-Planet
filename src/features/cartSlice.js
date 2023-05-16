import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const movie = action.payload;
       state.cartItems.push(movie);
       
    },
    clearCart: (state) => {
      state.cartItems = [];
      
    },
    removeItem: (state, action) => {
      const movie = action.payload;
      state.cartItems = state.cartItems.filter((movie) => {
        movie.id == !movie.id;
      });
    },
  },
});
export const { clearCart, removeItem, addToCart } = cartSlice.actions;
export default cartSlice.reducer;
