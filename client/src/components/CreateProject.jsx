import {
  Alert,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ListItemText,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createProject } from "../Redux/projectReducer/action";
import { useEffect, useState } from "react";
import axios from "axios";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 100,
    },
  },
};

const CreateProject = ({ handleClose, open }) => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const manager_id = storedUser.user._id;
  const token = storedUser.token;

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const fetchUsers = async (manager_id, token) => {
    try {
      const getAuthConfig = (token) => ({
        headers: { Authorization: `Bearer ${token}` },
      });

      const resp = await axios.get(
        `http://localhost:8080/users?manager_id=${manager_id}`,
        getAuthConfig(token)
      );
      //console.log(resp.data.teamMembers);
      setTeamMembers(resp.data?.teamMembers || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers(manager_id, token);
  }, [manager_id, token]);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  //Handle Form submission
  const onSubmit = (data) => {
    //Post data to respective API of projects
    const projectData = { ...data, manager_id, team: selectedMembers };
    //console.log(projectData);
    dispatch(createProject(projectData, token));
    handleClose();
    reset();
    setSnackbarOpen(true);
  };

  const handleMemberChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedMembers(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        sx={{ backdropFilter: "blur(2px)" }}
        PaperProps={{
          sx: {
            borderRadius: "20px",
          },
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle sx={{ backgroundColor: "#111828" }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "white" }}
            >
              Projects Information
            </Typography>
          </DialogTitle>
          <DialogContent sx={{ backgroundColor: "#111828" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography variant="subtitle1" sx={{ color: "white" }}>
                Project Title
              </Typography>

              <TextField
                fullWidth
                variant="filled"
                {...register("title", {
                  required: "Enter project title",
                })}
                errors={!!errors.title}
                helperText={
                  errors.title ? (
                    <Typography sx={{ color: "red" }}>
                      {errors.title.message}
                    </Typography>
                  ) : (
                    ""
                  )
                }
                InputProps={{
                  disableUnderline: true,
                  style: {
                    color: "white",
                    backgroundColor: "#1f2937",
                    borderRadius: "10px",
                  },
                }}
              />

              <Typography variant="subtitle1" sx={{ color: "white" }}>
                Description
              </Typography>

              <TextField
                fullWidth
                variant="filled"
                multiline
                rows={4}
                {...register("description", {
                  required: "Enter project description",
                })}
                errors={!!errors.description}
                helperText={
                  errors.description ? (
                    <Typography sx={{ color: "red" }}>
                      {errors.description.message}
                    </Typography>
                  ) : (
                    ""
                  )
                }
                InputProps={{
                  disableUnderline: true,
                  style: {
                    color: "white",
                    backgroundColor: "#1f2937",
                    borderRadius: "10px",
                  },
                }}
              />

              <Typography variant="subtitle1" sx={{ color: "white" }}>
                Select Team Members
              </Typography>

              <Select
                multiple
                value={selectedMembers}
                onChange={handleMemberChange}
                displayEmpty
                renderValue={(selected) =>
                  selected.length
                    ? selected
                        .map((id) => {
                          const member = teamMembers.find((mem) => mem._id === id);
                          return member ? member.name : id;
                        })
                        .join(", ")
                    : "Select Team Members"
                }
                MenuProps={MenuProps}
                sx={{
                  backgroundColor: "#1f2937",
                  color: "white",
                  borderRadius: "10px",
                  width:"300px"
                }}
              >
                {teamMembers.map((member) => (
                  <MenuItem key={member._id} value={member._id}>
                    <Checkbox checked={selectedMembers.includes(member._id)} />
                    <ListItemText primary={member.name} />
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </DialogContent>
          <DialogActions sx={{ backgroundColor: "#111828" }}>
            <Button
              type="submit"
              variant="contained"
              // onClick={handleClose}
              sx={{
                backgroundColor: "#5046e5",
                color: "white",
                borderRadius: "10px",
                padding: "10px 20px",
                marginRight: "16px",
              }}
            >
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      {/* Snack for alert */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
          // icon={<CheckIcon fontSize="inherit" />}
        >
          Project created successfully, please refresh.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CreateProject;
