import { Box } from "@mui/material"
import Navbar from "../components/Navbar"
import ProjectTable from "../components/ProjectTable"
import Pagination from "../components/Pagination"



const Projects = ()=>{


    return(
        <>
            <Navbar/> 
            <ProjectTable />
            {/* <Pagination/> */}
        </>
    )
}


export default Projects