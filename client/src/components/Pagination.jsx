import { Box, Button, Typography } from "@mui/material";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#111926",
        padding: "8px 16px",
      }}
    >
      {/* sx={{ display: "flex", alignItems:"center" ,gap: 2 }} */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 3,
        }}
      >
        <Button
          sx={{
            color: "white",
            opacity: currentPage === 1 ? 0.3 : 1,
            pointerEvents: currentPage === 1 ? "none" : "auto",
          }}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Prev
        </Button>

        <Typography variant="h6" noWrap component="div" sx={{ color: "white" }}>
          {currentPage}
        </Typography>

        <Button
          sx={{
            color: "white",
            opacity: currentPage === totalPages ? 0.3 : 1,
            pointerEvents: currentPage === totalPages ? "none" : "auto",
          }}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </Button>
      </Box>
      {/* sx={{flexGrow:1, display:"flex",justifyContent:"flex-end"}} */}
      {/* <Box>
        <Button sx={{ color: "white" }}>Save</Button>
      </Box> */}
    </Box>
  );
};

export default Pagination;
