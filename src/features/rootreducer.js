import { combineReducers } from "redux";
import cartReducer from './cartSlice';
import { reducer as authReducer } from "./firebaseRedux";

const rootReducer = combineReducers({
    user: authReducer,
    cart: cartReducer

})

export { rootReducer };

