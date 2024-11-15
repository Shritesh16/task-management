import axios from "axios"
import { DELETE_PROJECT_FAILURE, DELETE_PROJECT_REQUEST, DELETE_PROJECT_SUCCESS, GET_PROJECT_FAILURE, GET_PROJECT_REQUEST, GET_PROJECT_SUCCESS, PATCH_PROJECT_FAILURE, PATCH_PROJECT_REQUEST, PATCH_PROJECT_SUCCESS, POST_PROJECT_FAILURE, POST_PROJECT_REQUEST, POST_PROJECT_SUCCESS } from "./actionTypes"


const projectUrl = `http://localhost:8080/projects`


const getAuthConfig = (token)=>({
    headers : {Authorization: `Bearer ${token}`}
})




export const getProject = (manager_id,token)=> async(dispatch)=>{
     try {
        //dispatch({type:GET_PROJECT_REQUEST})
        const resp = await axios.get(`${projectUrl}/${manager_id}` , getAuthConfig(token))
        //console.log(resp.data)
        dispatch({type:GET_PROJECT_SUCCESS , payload:resp.data})
        return resp.data

     } catch (error) {
         //dispatch({type:GET_PROJECT_FAILURE})
         console.log(error)
     }
}

export const createProject = (payload,token)=>async(dispatch)=>{
     try {
        //dispatch({type:POST_PROJECT_REQUEST})
        const resp = await axios.post(`${projectUrl}/create` , payload, getAuthConfig(token))
        console.log(resp)
        dispatch({type:POST_PROJECT_SUCCESS})
     } catch (error) {
        //dispatch({type:POST_PROJECT_FAILURE})
        console.log(error)
     }
}

export const updateProject = (projectID,payload,token)=> async(dispatch)=>{
     try {
        //dispatch({type:PATCH_PROJECT_REQUEST})
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
        //dispatch({type:DELETE_PROJECT_REQUEST})
        const resp = await axios.delete(`${projectUrl}/${projectID}`, getAuthConfig(token))
        console.log(resp)
        dispatch({type:DELETE_PROJECT_SUCCESS})
     } catch (error) {
        //dispatch({type:DELETE_PROJECT_FAILURE})
        console.log(error)
     }
}