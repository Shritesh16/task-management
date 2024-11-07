import axios from "axios"
import { redirect } from "react-router-dom"
import { LOGIN_SUBMITTING, POST_LOGIN_FAILURE, POST_LOGIN_SUCCESS } from "./actionTypes"

const loginUrl = `http://localhost:8080/login`



export const getUser = (payload) => async(dispatch)=>{
     try {
           //dispatch({type:LOGIN_SUBMITTING})
           const resp = await axios.post(loginUrl,payload)
           //Set data to local storage
           localStorage.setItem("user",JSON.stringify(resp.data))
           dispatch({type:POST_LOGIN_SUCCESS, payload:resp.data})
           //redirect("/project")
     } catch (error) {
           dispatch({type:POST_LOGIN_FAILURE,payload:error})
           console.log(error)

     }
}