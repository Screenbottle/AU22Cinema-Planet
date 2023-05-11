import { createAction, createReducer } from "@reduxjs/toolkit";

const setCurrentUser = createAction('set current user');

const actions = { setCurrentUser };



const initialState = {
    currentUser: null
};

const reducer = createReducer(initialState, builder => {
    builder
        .addCase(setCurrentUser, (state, action) => ({...state, currentUser: action.payload}))
});

export { reducer, actions };