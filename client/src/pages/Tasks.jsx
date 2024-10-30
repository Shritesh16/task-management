import Navbar from "../components/Navbar"
import ProjectTable from "../components/ProjectTable"





const Tasks = ()=>{
  
  const page = "Task";
   

  return (
    <>
      <Navbar/> 
      <ProjectTable page={page}/>
    </>
  )
}


export default Tasks