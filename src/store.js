import { configureStore, createReducer } from "@reduxjs/toolkit";
import cartReducer from './features/cartSlice'


export const store =configureStore({
    reducer: {
        cart : cartReducer,   
    },
});