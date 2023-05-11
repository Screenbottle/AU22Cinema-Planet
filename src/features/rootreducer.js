import { combineReducers } from "redux";
import { reducer as authReducer } from "./firebaseRedux";

const rootReducer = combineReducers({
    user: authReducer
})

export { rootReducer };