import { createAction, createReducer } from "@reduxjs/toolkit";


const addToBasket = createAction('add to basket');
const removeFromBasket= createAction('remove from basket');

const actions = {addToBasket, removeFromBasket};

const initialState = 0 ;


const reducer = createReducer(initialState, builder => {

    builder
    
    .addCase(addToBasket, (state, action) => state + 1)
    .addCase(removeFromBasket, (state, action) => state - 1)
    
    });



export {actions, reducer};