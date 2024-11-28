import { Box } from "@mui/material";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Projects from "./pages/Projects";
import Pagination from "./components/Pagination";
import Tasks from "./pages/Tasks";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const { user } = useSelector((state) => state.authReducer);
  //const  isAuthenticated  = user.isLogged;
  //const isAuthenticated = true
  //console.log(isAuthenticated)
  //   const storedUser = JSON.parse(localStorage.getItem("user"));
  // const isAuthenticated = storedUser.isLogged

  // routes path should be plural
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/project" element={<Projects />} />
      <Route path="/task/:project_id" element={<Tasks />} />

      {/* <Login/> */}
      {/* <Navbar/> */}
      {/* <Projects/> */}
      {/* <Tasks/> */}
    </Routes>
  );
}

export default App;


