import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({children}) => {
  // const navigate = useNavigate();
  const { user} = useSelector((state) => state.authReducer);
  const isAuthenticated = user.isLogged;
  
  
  //console.log(isAuthenticated)

  
   return isAuthenticated ? children :<Navigate to="/login"/>
  
};

export default PrivateRoute;


