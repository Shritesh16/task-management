import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Snackbar,
} from "@mui/material";
import { useState } from "react";

const DeleteDialog = ({
  openDialog,
  handleCloseDialog,
  handleDelete,
  deleteId,
}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleDeleteWithSnackbar = (e) => {
    handleDelete(e, deleteId);
    setSnackbarOpen(true);
  };

  return (
    <>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        sx={{ backdropFilter: "blur(2px)" }}
        PaperProps={{
          sx: {
            borderRadius: "10px",
          },
        }}
      >
        <DialogTitle sx={{ backgroundColor: "#1f2938", color: "white" }}>
          Are you sure you want to delete
        </DialogTitle>
        <DialogActions
          sx={{ backgroundColor: "#1f2938", justifyContent: "center" }}
        >
          <Button
            // onClick={(e) => handleDelete(e, deleteId)}
            onClick={handleDeleteWithSnackbar}
            sx={{ backgroundColor: "#ff3d00", color: "white" }}
          >
            Yes
          </Button>
          <Button
            onClick={handleCloseDialog}
            sx={{ backgroundColor: "#4caf50", color: "white" }}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        // message="Project deleted successfully"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        
      >
        <Alert
          // onClose={handleSnackbarClose}
          severity="error"
          sx={{ width: "100%" }}
          // icon={<CheckIcon fontSize="inherit" />}
        >
          Project created successfully, please refresh.
        </Alert>
      </Snackbar>
      
    </>
  );
};

export default DeleteDialog;
