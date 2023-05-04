import { combineReducers } from "redux";
import { reducer as basketReducer } from "./counter";
const rootReducer = combineReducers({
    counter : basketReducer
})

export {rootReducer};