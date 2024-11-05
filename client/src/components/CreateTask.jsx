import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { useForm } from "react-hook-form";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { useState } from "react";

const CreateTask = ({ handleClose, open }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [dueDate, setDueDate] = useState(null);

  // Handle form submission
  const onSubmit = (data) => {
    data.dueDate = dueDate.$d
    console.log(data); // POSt form data to create task API
    handleClose();
    reset();
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
              variant="h6"
              sx={{ fontWeight: "bold", color: "white" }}
            >
              Task Information
            </Typography>
          </DialogTitle>
          <DialogContent sx={{ backgroundColor: "#111828" }}>
            <Box
              sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}
            >
              {/* Task Title Field */}
              {/* <InputLabel sx={{ color: "white" }}>Task Title</InputLabel> */}
              <TextField
                label="Task Title"
                variant="filled"
                fullWidth
                {...register("taskTitle", { required: "Enter task title" })}
                error={!!errors.taskTitle}
                helperText={
                  errors.taskTitle && (
                    <Typography sx={{ color: "red" }}>
                      {errors.taskTitle.message}
                    </Typography>
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

              {/* Priority Dropdown */}
              <Box>
                <InputLabel sx={{ color: "white" }}>Select Priority</InputLabel>
                <Select
                  fullWidth
                  variant="filled"
                  {...register("priority", { required: "Select a priority" })}
                  defaultValue=""
                  error={!!errors.priority}
                  sx={{
                    color: "white",
                    backgroundColor: "#1f2937",
                    borderRadius: "10px",
                    ".MuiSelect-icon": { color: "white" },
                  }}
                >
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Critical">Critical</MenuItem>
                </Select>
                {errors.priority && (
                  <Typography sx={{ color: "red", mt: 1 }}>
                    {errors.priority.message}
                  </Typography>
                )}
              </Box>

              {/* Description Field */}

              <TextField
                label="Description"
                variant="filled"
                fullWidth
                multiline
                rows={4}
                {...register("description", {
                  required: "Enter a description",
                })}
                error={!!errors.description}
                helperText={
                  errors.description && (
                    <Typography sx={{ color: "red" }}>
                      {errors.description.message}
                    </Typography>
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
                // sx={{ gridColumn: "span 2" }}
              />

              {/* Status Dropdown */}
              <Box>
                <InputLabel sx={{ color: "white" }}>Select Status</InputLabel>
                <Select
                  fullWidth
                  variant="filled"
                  {...register("status", { required: "Select a status" })}
                  defaultValue=""
                  error={!!errors.status}
                  sx={{
                    color: "white",
                    backgroundColor: "#1f2937",
                    borderRadius: "10px",
                    ".MuiSelect-icon": { color: "white" },
                  }}
                >
                  <MenuItem value="To-Do">To-Do</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Complete">Complete</MenuItem>
                </Select>
                {errors.status && (
                  <Typography sx={{ color: "red", mt: 1 }}>
                    {errors.status.message}
                  </Typography>
                )}
              </Box>

              {/* Due Date Picker */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Select Due Date"
                  value={dueDate}
                  //{...register("dueDate", { required: "Enter due date" })}
                  onChange={(newValue) => setDueDate(newValue)}
                  sx={{
                    backgroundColor: "#1f2937",
                    borderRadius: "10px",
                    height: "80px",
                  }}
                  slotProps={{
                    textField: {
                      variant: "filled",
                      fullWidth: true,
                      error: !!errors.dueDate,
                      helperText: errors.dueDate && (
                        <Typography sx={{ color: "red" }}>
                          {errors.dueDate.message}
                        </Typography>
                      ),
                      InputProps:{
                        disableUnderline: true,
                        style: {
                          color: "white",
                          backgroundColor: "#1f2937",
                          borderRadius: "10px",
                        },
                      }
                    },
                  }}
                  
                />
              </LocalizationProvider>

              {/* Assignee Dropdown */}
              <Box>
                <InputLabel sx={{ color: "white" }}>Assign to</InputLabel>
                <Select
                  fullWidth
                  variant="filled"
                  {...register("assignee", { required: "Select an assignee" })}
                  defaultValue=""
                  error={!!errors.assignee}
                  sx={{
                    color: "white",
                    backgroundColor: "#1f2937",
                    borderRadius: "10px",
                    ".MuiSelect-icon": { color: "white" },
                  }}
                >
                  <MenuItem value="User1">User1</MenuItem>
                  <MenuItem value="User2">User2</MenuItem>
                  <MenuItem value="User3">User3</MenuItem>
                </Select>
                {errors.assignee && (
                  <Typography sx={{ color: "red", mt: 1 }}>
                    {errors.assignee.message}
                  </Typography>
                )}
              </Box>
            </Box>
          </DialogContent>
          <DialogActions sx={{ backgroundColor: "#111828" }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#5046e5",
                color: "white",
                borderRadius: "10px",
                padding: "10px 20px",
                marginRight: "16px",
              }}
            >
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default CreateTask;

//  {/* Due Date Picker */}
//  <LocalizationProvider dateAdapter={AdapterDateFns}>
//  <DatePicker
//    label="Select Due Date"
//    value={dueDate}
//    onChange={(newValue) => setDueDate(newValue)}
//    renderInput={(params) => (
//      <TextField
//        {...params}
//        variant="filled"
//        fullWidth
//        error={!!errors.dueDate}
//        helperText={
//          errors.dueDate && (
//            <Typography sx={{ color: "red" }}>
//              {errors.dueDate.message}
//            </Typography>
//          )
//        }
//        InputProps={{
//          disableUnderline: true,
//          style: {
//            color: "white",
//            backgroundColor: "#1f2937",
//            borderRadius: "10px",
//          },
//        }}
//      />
//    )}
//  />
// </LocalizationProvider>

// sx={{
//     backgroundColor:"#1f2937",
//     borderRadius:"10px",
//     "& .MuiFilledInput-root":{
//         backgroundColor:"#1f2937"
//     },
//     "& .MuiFormLabel-root":{
//         backgroundColor:"white"
//     },
//     "& .MuiInputBase-root":{
//         backgroundColor:"white"
//     }
// }}
// //   InputProps={{
// //     disableUnderline: true,
// //     style: {
// //       color: "white",
// //       backgroundColor: "#1f2937",
// //       borderRadius: "10px",
// //     },
// //   }}
