import axios from "axios";
import { GET_TASK_REQUEST, GET_TASK_SUCCESS, PATCH_TASK_FAILURE, PATCH_TASK_REQUEST, PATCH_TASK_SUCCESS, POST_TASK_FAILURE, POST_TASK_REQUEST, POST_TASK_SUCCESS } from "./actionTypes";


const taskUrl = import.meta.env.VITE_TASK_URL

const getAuthConfig = (token)=>({
    headers : {Authorization: `Bearer ${token}`}
})

// http://localhost:8080/tasks/6736cf8d9d004efbf31d558b?role=Team-Member&user_id=5dd6325482160722dc88eeea

export const getTask = (project_id,user_id,role,token,page, limit, searchedText)=> async(dispatch)=>{
    try {
        dispatch({type:GET_TASK_REQUEST});
        const resp = await axios.get(`${taskUrl}/${project_id}?user_id=${user_id}&role=${role}&page=${page}&limit=${limit}&search=${searchedText}`,getAuthConfig(token))
        //console.log(resp.data)
        dispatch({type:GET_TASK_SUCCESS , payload:resp.data.tasks})
        return resp.data
    } catch (error) {
        console.log(error)
    }
}


export const createTask = (payload,token)=>async(dispatch)=>{
    try {
       dispatch({type:POST_TASK_REQUEST})
       const resp = await axios.post(`${taskUrl}/create` , payload, getAuthConfig(token))
    //    console.log(resp)
       dispatch({type:POST_TASK_SUCCESS})
    } catch (error) {
       //dispatch({type:POST_TASK_FAILURE})
       console.log(error)
    }
}

export const updateTask = (TaskID,payload,token)=> async(dispatch)=>{
    try {
       dispatch({type:PATCH_TASK_REQUEST})
       const resp = await axios.patch(`${taskUrl}/${TaskID}`,payload, getAuthConfig(token))
       //console.log(resp)
       dispatch({type:PATCH_TASK_SUCCESS})
    } catch (error) {
       //dispatch({type:PATCH_TASK_FAILURE})
       console.log(error)
    }
}