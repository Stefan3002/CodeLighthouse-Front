import {combineReducers} from "redux";
import authReducer from "./auth-store/auth-store-reducer";
import utilsReducer from "./utils-store/utils-store-reducer";
import userReducer from "./user-store/user-store-reducer";

export const rootReducer = combineReducers({
    authStore: authReducer,
    utilsStore: utilsReducer,
    userStore: userReducer
})