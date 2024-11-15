import {legacy_createStore,combineReducers, applyMiddleware} from "redux"
import {authReducer} from "../Redux/authReducer/authReducer"
import { thunk } from "redux-thunk"
import { projectReducer } from "./projectReducer/projectReducer"


const middleware = [thunk]

const rootReducer = combineReducers({authReducer,projectReducer})

export const store = legacy_createStore(rootReducer,applyMiddleware(...middleware))