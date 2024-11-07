import { Box } from "@mui/material"
import Navbar from "../components/Navbar"
import ProjectTable from "../components/ProjectTable"
import Pagination from "../components/Pagination"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"



const Projects = ()=>{
    const page = "Project";
    //const {user} = useSelector((state) => state.authReducer);
    const navigate = useNavigate()
    //console.log(user)

    useEffect(()=>{
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if(!storedUser){
           navigate("/login")
        }
    },[navigate])


    return(
        <>
            <Navbar/> 
            <ProjectTable page={page}/>
            {/* <Pagination/> */}
        </>
    )
}


export default Projects