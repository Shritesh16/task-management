import axios from "axios"
import { POST_LOGIN_SUCCESS } from "./actionTypes"

const loginUrl = `http://localhost:8080/login`



export const getUser = (payload) => async(dispatch)=>{
     try {
           const resp = await axios.post(loginUrl,payload)
           dispatch({type:POST_LOGIN_SUCCESS, payload:resp.data})

     } catch (error) {
           //dispatch({type:POST_LOGIN_FAILURE,payload:error})
           console.log(error)

     }
}