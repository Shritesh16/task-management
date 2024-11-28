import { GET_TASK_FAILURE, GET_TASK_REQUEST, GET_TASK_SUCCESS, PATCH_TASK_FAILURE, PATCH_TASK_REQUEST, PATCH_TASK_SUCCESS, POST_TASK_FAILURE, POST_TASK_REQUEST, POST_TASK_SUCCESS } from "./actionTypes"

const initialTaskState = {
    tasks: [],
    isLoading : false
}


export const taskReducer = (state =initialTaskState, {type , payload}) =>{
    switch(type){
        // GET TASK
        case GET_TASK_REQUEST:
            return{
                ...state,
                isLoading : true
            }
         case GET_TASK_SUCCESS:
            return{
                ...state,
                tasks : payload,
                isLoading : false
            }
        case GET_TASK_FAILURE:
            return{
                ...state,
                tasks : payload,
                isLoading : false
            }

        //POST TASK
        case POST_TASK_REQUEST:
            return{
                ...state,
                isLoading:true
            }
        case POST_TASK_SUCCESS:
            return{
                ...state,
                isLoading:false
            }
        
        case POST_TASK_FAILURE:
            return{
                ...state,
                isLoading:false
            }
        // PATCH PROJECT
        case PATCH_TASK_REQUEST:
            return{
                ...state,
                isLoading:true
            }
        case PATCH_TASK_SUCCESS:
            return{
                ...state,
                isLoading:false
            }
        case PATCH_TASK_FAILURE:
            return{
                ...state,
                isLoading:false
            }

        default:{
            return state
        }
    }
}