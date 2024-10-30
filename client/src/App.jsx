
import { Box } from '@mui/material'
import './App.css'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Projects from './pages/Projects'
import Pagination from './components/Pagination'
import Tasks from './pages/Tasks'

function App() {
  

  return (
    <Box>
        {/* <Login/> */}
        {/* <Navbar/> */}
        {/* <Projects/> */}
        <Tasks/>
    </Box>
  )
}

export default App
