import {applyMiddleware, compose, createStore} from "redux";
import {logger} from "redux-logger/src";
import thunk from 'redux-thunk'
import {rootReducer} from "./root";

const middleWares = [logger, thunk]
const enhancers = compose(applyMiddleware(...middleWares))
export const store = createStore(rootReducer, undefined, enhancers)