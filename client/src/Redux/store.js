import {legacy_createStore,combineReducers, applyMiddleware} from "redux"
import {authReducer} from "../Redux/authReducer/authReducer"
import { thunk } from "redux-thunk"


const middleware = [thunk]

const rootReducer = combineReducers({authReducer})

export const store = legacy_createStore(rootReducer,applyMiddleware(...middleware))