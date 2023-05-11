import { combineReducers } from "redux";
import { reducer as basketReducer } from "./counter";
import { reducer as authReducer } from "./firebaseRedux";

const rootReducer = combineReducers({
    user: authReducer,
    counter : basketReducer
})

export { rootReducer };

