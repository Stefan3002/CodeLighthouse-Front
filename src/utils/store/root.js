import {combineReducers} from "redux";
import authReducer from "./auth-store/auth-store-reducer";

export const rootReducer = combineReducers({
    authStore: authReducer
})