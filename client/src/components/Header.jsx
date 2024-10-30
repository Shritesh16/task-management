import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CreateProject from "./CreateProject";

const Header = ({page}) => {
   
    const [searchText , setSearchText] = useState("");
    const [debouncedText , setDebouncedText] = useState(searchText);
    const [open, setOpen] = useState(false);
  
      // Open dialog
    const handleOpen = () => setOpen(true);

      // Close dialog
    const handleClose = () => setOpen(false);
    

    const handleSearchChange =(e)=>{
         setSearchText(e.target.value)
    }


    const handleKeyDown = (e)=>{

         if(e.key === "Enter"){
             setDebouncedText(searchText)
         }
    }
    
    //get data from server for pojects based on Searched title
    const fetchData = async(text)=>{
         console.log(text)
    }


    //Debounching 
    useEffect(()=>{

      const timerId = setTimeout(()=>{
          setDebouncedText(searchText)
      },300)
    
          return ()=>clearTimeout(timerId)
    },[searchText])

    useEffect(()=>{
        if(debouncedText){
            fetchData(debouncedText)
        }


    },[debouncedText])


  
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",

        gap: { xs: "0px", sm: "28px", md: "225px" , lg:"640px" },
        padding:"5px"
      }}
    >
      {/* Title & Subtitle */}
      <Box >
        <Typography variant="h5" sx={{color:"white",fontWeight:"bold"}}>{page}</Typography>
        <Typography noWrap sx={{color:"#d1d5db"}}>{`A list of all ${page}`}</Typography>
      </Box>

      {/* Search Input */}
      <Box sx={{ display: "flex", gap: {xs:6 , sm: 8 , md:15} }}>
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
        {page === "Task" && (<></>)}

        {/* Button */}
        <Button
          variant="contained"
          onClick={handleOpen}
          sx={{
            width:"140px",
            backgroundColor: " #5046e5",
            color: "white",
            borderRadius: "10px",
            height: "55px",
          }}
        >
         {` Add ${page}`}
        </Button>
      </Box>


      {/* Dialog */}
      <CreateProject handleClose={handleClose} open={open}/>
      
    </Box>
  );
};

export default Header;
