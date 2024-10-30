import { Box } from "@mui/material"
import Navbar from "../components/Navbar"
import ProjectTable from "../components/ProjectTable"
import Pagination from "../components/Pagination"



const Projects = ()=>{
    const page = "Project";

    return(
        <>
            <Navbar/> 
            <ProjectTable page={page}/>
            {/* <Pagination/> */}
        </>
    )
}


export default Projects