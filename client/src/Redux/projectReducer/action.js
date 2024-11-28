import axios from "axios"
import { DELETE_PROJECT_FAILURE, DELETE_PROJECT_REQUEST, DELETE_PROJECT_SUCCESS, GET_PROJECT_FAILURE, GET_PROJECT_REQUEST, GET_PROJECT_SUCCESS, PATCH_PROJECT_FAILURE, PATCH_PROJECT_REQUEST, PATCH_PROJECT_SUCCESS, POST_PROJECT_FAILURE, POST_PROJECT_REQUEST, POST_PROJECT_SUCCESS } from "./actionTypes"

const projectUrl = import.meta.env.VITE_PROJECT_URL

const getAuthConfig = (token)=>({
    headers : {Authorization: `Bearer ${token}`}
})

// http://localhost:8080/projects/5dd6325482160722dc88eed1?role=Team-Member&page=1&limit=5&search=title 1
export const getProject = (user_id,role,token, page, limit, searchedText)=> async(dispatch)=>{
     try {
        dispatch({type:GET_PROJECT_REQUEST})
        const resp = await axios.get(`${projectUrl}/${user_id}?role=${role}&page=${page}&limit=${limit}&search=${searchedText}` , getAuthConfig(token))
        //console.log(resp.data.projects)
        dispatch({type:GET_PROJECT_SUCCESS , payload:resp.data.projects})
        //return resp.data.projects
        return resp.data

     } catch (error) {
         //dispatch({type:GET_PROJECT_FAILURE})
         console.log(error)
     }
}

export const createProject = (payload,token)=>async(dispatch)=>{
     try {
        dispatch({type:POST_PROJECT_REQUEST})
        const resp = await axios.post(`${projectUrl}/create` , payload, getAuthConfig(token))
        //console.log(resp)
        dispatch({type:POST_PROJECT_SUCCESS})
     } catch (error) {
        //dispatch({type:POST_PROJECT_FAILURE})
        console.log(error)
     }
}

export const updateProject = (projectID,payload,token)=> async(dispatch)=>{
     try {
        dispatch({type:PATCH_PROJECT_REQUEST})
        const resp = await axios.patch(`${projectUrl}/${projectID}`,payload, getAuthConfig(token))
        console.log(resp)
        dispatch({type:PATCH_PROJECT_SUCCESS})
     } catch (error) {
        //dispatch({type:PATCH_PROJECT_FAILURE})
        console.log(error)
     }
}

export const deleteProject = (projectID,token)=> async(dispatch)=>{
     try {
        dispatch({type:DELETE_PROJECT_REQUEST})
        const resp = await axios.delete(`${projectUrl}/${projectID}`, getAuthConfig(token))
        console.log(resp)
        dispatch({type:DELETE_PROJECT_SUCCESS})
     } catch (error) {
        //dispatch({type:DELETE_PROJECT_FAILURE})
        console.log(error)
     }
}