import { Box, Button, Typography } from "@mui/material";

const Pagination = () => {



  
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent:"center",
        flexDirection: "row",
        backgroundColor: "#111926",
        padding: "8px 16px",
      }}
    >
        {/* sx={{ display: "flex", alignItems:"center" ,gap: 2 }} */}
      <Box sx={{ display: "flex", alignItems:"center" , gap:3 }}>
        <Button sx={{ color: "white" }}>Prev</Button>
        <Typography variant="h6" noWrap component="div" sx={{ color: "white" }}>
          1
        </Typography>
        <Button sx={{ color: "white" }}>Next</Button>
      </Box>
        {/* sx={{flexGrow:1, display:"flex",justifyContent:"flex-end"}} */}
      {/* <Box>
        <Button sx={{ color: "white" }}>Save</Button>
      </Box> */}
    </Box>
  );
};

export default Pagination;


