import {legacy_createStore,combineReducers, applyMiddleware} from "redux"
import {authReducer} from "../Redux/authReducer/authReducer"
import { thunk } from "redux-thunk"
import { projectReducer } from "./projectReducer/projectReducer"
import { taskReducer } from "./taskReducer/taskReducer"


const middleware = [thunk]

const rootReducer = combineReducers({authReducer,projectReducer,taskReducer})

export const store = legacy_createStore(rootReducer,applyMiddleware(...middleware))