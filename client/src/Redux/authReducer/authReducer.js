import { POST_LOGIN_FAILURE, POST_LOGIN_SUCCESS } from "./actionTypes"


const initialAuthState = {
     isAuth : {}
}


export const authReducer = (state= initialAuthState, {type, payload}) =>{
   
    switch(type){

        case POST_LOGIN_SUCCESS:
            return {
                ...state,
                isAuth : payload
            }  
        case POST_LOGIN_FAILURE:
            return {
                ...state,
                isAuth: payload
            }
        default: {
            return state
        }
    }

}