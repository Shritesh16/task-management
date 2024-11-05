import Navbar from "../components/Navbar"
import ProjectTable from "../components/ProjectTable"
import TaskTable from "../components/TaskTable";





const Tasks = ()=>{
  
  const page = "Task";
   

  return (
    <>
      <Navbar/> 
      <TaskTable page={page}/>
    </>
  )
}


export default Tasks