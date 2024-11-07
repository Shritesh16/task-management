import { POST_LOGIN_FAILURE, POST_LOGIN_SUCCESS, LOGIN_SUBMITTING } from "./actionTypes"


const initialAuthState = {
     user : {},
     //isSubmitting: false,
}


export const authReducer = (state= initialAuthState, {type, payload}) =>{
   
    switch(type){
        // case LOGIN_SUBMITTING:
        //     return {
        //         ...state,
        //         isSubmitting: true
        //     }
        case POST_LOGIN_SUCCESS:
            //console.log(payload)
            return {
                ...state,
                //isSubmitting: false,
                user : payload
            }  
        case POST_LOGIN_FAILURE:
            return {
                ...state,
                //isSubmitting: false,
                user: payload
            }
        default: {
            return state
        }
    }

}