import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../Redux/authReducer/action";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const theme = createTheme();

const Login = () => {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();


  // useEffect(()=>{
  //   const storedUser = JSON.parse(localStorage.getItem("user"));
  //   if(storedUser?.isLogged && storedUser?.token){
  //      navigate("/project")
  //   }
    
  // },[navigate])


  const onSubmit = (data) => {
    dispatch(getUser(data));
  };
 
  useEffect(()=>{
    const storedUser = JSON.parse(localStorage.getItem("user"));
     if(storedUser?.isLogged){
       navigate("/project")
     }
     
  },[user,navigate])

  
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={
            {
              // marginTop: 1,
              // display: "flex",
              // flexDirection: "column",
              // alignItems: "center",
            }
          }
        >
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
          </Box>

          <Typography
            component="h1"
            variant="h5"
            sx={{ display: "flex", justifyContent: "center" }}
          >
            Sign in to your account
          </Typography>

          {/* Display login error message */}
          {user?.isLogged === false && (
            <Typography
              component="p"
              variant="body2"
              sx={{ color: "red", textAlign: "center", mt: 2 }}
            >
              Invalid user credentials
            </Typography>
          )}

          <Box
            onSubmit={handleSubmit(onSubmit)}
            component="form"
            noValidate
            sx={{
              mt: 1,
              marginTop: 5,
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
              padding: 3,
              borderRadius: 2,
            }}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Enter your email"
              name="email"
              autoComplete="email"
              autoFocus
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Enter your password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 3,
                  message: "Password must be atleast 3 charaters long",
                },
              })}
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ""}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#5046e5" }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
