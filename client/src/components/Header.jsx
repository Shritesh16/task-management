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
import { useEffect, useState } from "react";
import CreateProject from "./CreateProject";
import CreateTask from "./CreateTask";
import { useSelector } from "react-redux";

const Header = ({ page , recievedText }) => {
  const [searchText, setSearchText] = useState("");
  const [debouncedText, setDebouncedText] = useState(searchText);
  const [open, setOpen] = useState(false);

  // const data = useSelector((state) => state.authReducer);
  // const role = data.user?.user?.role

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const role = storedUser.user.role

  // Open dialog
  const handleOpen = () => setOpen(true);

  // Close dialog
  const handleClose = () => setOpen(false);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // setDebouncedText(searchText);
      recievedText(searchText)
    }
  };

  //get data from server for pojects based on Searched title
  // const fetchData = async (text) => {
  //   console.log(text);
  // };

  //Debounching
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedText(searchText);
    }, 300);

    return () => clearTimeout(timerId);
  }, [searchText]);

  // useEffect(() => {
  //   if (debouncedText) {
  //     fetchData(debouncedText);
  //   }
  // }, [debouncedText]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        //  640   225px
        gap: { xs: "0px", sm: "195px", md: "337px", lg: "670px" },
        padding: "5px",
      }}
    >
      {/* Title & Subtitle */}
      <Box>
        <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
          {page}
        </Typography>
        <Typography
          noWrap
          sx={{ color: "#d1d5db" }}
        >{`A list of all ${page}`}</Typography>
      </Box>

      {/* Search Input */}
      <Box sx={{ display: "flex", gap: { xs: 6, sm: 8, md: 15 } }}>
        <TextField
          type="search"
          placeholder={`Search ${page}`}
          value={searchText}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          sx={{
            // width: "300px",
            width: { xs: "160px", sm: "200px", md: "300px" },
            color: "white",
            backgroundColor: "#1f2937",
            borderRadius: "25px",

            input: { color: "white" },
          }}
        />

        {/* Filter Icon */}
        {page === "Task" && <></>}

        {/* Button */}
        <Button
          variant="contained"
          onClick={handleOpen}
          sx={{
            width: "140px",
            backgroundColor: " #5046e5",
            color: "white",
            borderRadius: "10px",
            height: "55px",
            opacity: page ==="Project" && role !=="Manager" ? 0.3 : 1,
            pointerEvents:page ==="Project" && role !=="Manager" ? "none" :"auto"
          }}
        >
          {` Add ${page}`}
        </Button>
      </Box>

      {/* Dialog */}
      {page === "Project" ? (
        <CreateProject handleClose={handleClose} open={open} />
      ) : (
        <CreateTask handleClose={handleClose} open={open} />
      )}
    </Box>
  );
};

export default Header;
