import { DELETE_PROJECT_FAILURE, DELETE_PROJECT_REQUEST, DELETE_PROJECT_SUCCESS, GET_PROJECT_FAILURE, GET_PROJECT_REQUEST, GET_PROJECT_SUCCESS, PATCH_PROJECT_FAILURE, PATCH_PROJECT_REQUEST, PATCH_PROJECT_SUCCESS, POST_PROJECT_FAILURE, POST_PROJECT_REQUEST, POST_PROJECT_SUCCESS } from "./actionTypes"

const intialProjectState = {
     projects :[],
     isLoading : false
}


export const projectReducer = (state= intialProjectState , {type,payload})=>{
     
     switch(type){ 
         // GET PROJECT
         case GET_PROJECT_REQUEST:
            return{
                ...state,
                isLoading : true
            }
         case GET_PROJECT_SUCCESS:
            return{
                ...state,
                projects : payload,
                isLoading : false
            }
        case GET_PROJECT_FAILURE:
            return{
                ...state,
                projects : payload,
                isLoading : false
            }
        //POST PROJECT
        case POST_PROJECT_REQUEST:
            return{
                ...state,
                isLoading:true
            }
        case POST_PROJECT_SUCCESS:
            return{
                ...state,
                isLoading:false
            }
        
        case POST_PROJECT_FAILURE:
            return{
                ...state,
                isLoading:false
            }
        // PATCH PROJECT
        case PATCH_PROJECT_REQUEST:
            return{
                ...state,
                isLoading:true
            }
        case PATCH_PROJECT_SUCCESS:
            return{
                ...state,
                isLoading:false
            }
        case PATCH_PROJECT_FAILURE:
            return{
                ...state,
                isLoading:false
            }
        //DELETE PROJECT
        case DELETE_PROJECT_REQUEST:
            return{
                ...state,
                isLoading:true
            }
        case DELETE_PROJECT_SUCCESS:
            return{
                ...state,
                isLoading:false
            }
        case DELETE_PROJECT_FAILURE:
            return{
                ...state,
                isLoading:false
            }         
        
        default:{
            return state
        }

     }
}