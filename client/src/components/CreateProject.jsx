import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";

const CreateProject = ({ handleClose, open }) => {

  const { register, handleSubmit, reset ,formState:{errors} } = useForm();

  //Handle Form submission
  const onSubmit = (data) => {
    //Post data to respective API of projects
    console.log(data);
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
                
                {...register("projectTitle", { required: "Enter project title" })}
                errors={!!errors.projectTitle}
                helperText={errors.projectTitle ? <Typography sx={{color:"red"}}>{errors.projectTitle.message}</Typography> : ""}
                InputProps={{
                  disableUnderline: true,
                  style: { color: "white", backgroundColor: "#1f2937", borderRadius:"10px" },
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
                {...register("description", { required: "Enter project description" })}
                errors={!!errors.description}
                helperText={errors.description ? <Typography sx={{color:"red"}}>{errors.description.message}</Typography> : ""}
                InputProps={{
                  disableUnderline: true,
                  style: { color: "white", backgroundColor: "#1f2937",borderRadius:"10px" },
                }}
              />
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
    </Box>
  );
};

export default CreateProject;
