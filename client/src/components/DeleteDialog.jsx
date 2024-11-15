import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";


const DeleteDialog = ({openDialog,handleCloseDialog,handleDelete, deleteId})=>{
    


    return (
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
            onClick={(e) => handleDelete(e, deleteId)}
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
    )

}


export default DeleteDialog;