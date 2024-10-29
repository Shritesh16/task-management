import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const Header = () => {
   
    const [searchText , setSearchText] = useState("");
    const [debouncedText , setDebouncedText] = useState(searchText);

    

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
        marginTop: { xs: "4px", sm: "4px", md: "4px" },
        padding:"5px"
      }}
    >
      {/* Title & Subtitle */}
      <Box>
        <Typography variant="h5" sx={{color:"white",fontWeight:"bold"}}>Projects</Typography>
        <Typography sx={{color:"#d1d5db"}}>A list of all Projects</Typography>
      </Box>

      {/* Search Input */}
      <Box sx={{ display: "flex", gap: 15 }}>
        <TextField
          type="search"
          placeholder="Search Projects"
          value={searchText}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          sx={{
            width: "300px",
            color: "white",
            backgroundColor: "#1f2937",
            borderRadius: "25px",

            input: { color: "white" },
          }}
        />
        {/* Button */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: " #5046e5",
            color: "white",
            borderRadius: "10px",
            height: "55px",
          }}
        >
          Add Project
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
