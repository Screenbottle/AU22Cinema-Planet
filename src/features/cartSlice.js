import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    cartItems: [],
    amount: 0,
    total: 0,
    isLoading: true,

};
const cartSlice = createSlice({
    name : 'cart',
    initialState,
    reducers: {
        clearCart : (state)=>{
            state.cartItems = [] ;
        },
        removeItem : (state,action)=>{
            const itemId =action.payload
            state.cartItems=state.cartItems.filter((item)=>{item.id ==!itemId});
        }

     }
});
export const {clearCart,removeItem} = cartSlice.actions;
export default cartSlice.reducer;