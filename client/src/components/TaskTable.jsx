// import * as React from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

// import Paper from '@mui/material/Paper';
import {
  AppBar,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import Header from "./Header";
import Pagination from "./Pagination";

const Initialrows = [
  {
    title: "Frozen yoghurt",
    desciption:
      "Frozen yoghurtFrozen yoghurtFrozen yoghurt Frozen yoghurtFrozen",
    date : "26/10/2024",
    priority: "Critical",
    status : "To-Do",

  },
  {
    title: "Frozen yoghurt",
    desciption:
      "Frozen yoghurtFrozen yoghurtFrozen yoghurt Frozen yoghurtFrozen",
    date : "26/10/2024",
    priority: "Critical",
    status : "To-Do",
  },
  {
    title: "Frozen yoghurt",
    desciption:
      "Frozen yoghurtFrozen yoghurtFrozen yoghurt Frozen yoghurtFrozen",
    date : "26/10/2024",
    priority: "Critical",
    status : "To-Do",
  },
  {
    title: "Frozen yoghurt",
    desciption:
      "Frozen yoghurtFrozen yoghurtFrozen yoghurt Frozen yoghurtFrozen",
    date : "26/10/2024",
    priority: "Critical",
    status : "To-Do",
  },
  {
    title: "Frozen yoghurt",
    desciption:
      "Frozen yoghurtFrozen yoghurtFrozen yoghurt Frozen yoghurtFrozen",
    date : "26/10/2024",
    priority: "Critical",
    status : "To-Do",
  },
  
];

const TaskTable = ({page}) => {
  const [rows, setRows] = useState(Initialrows);
  const [editCell, setEditCell] = useState({ rowIndex: null, field: "" });



  const handleCellClick = (rowIndex, field) => {
    // console.log(rowIndex,field)
    setEditCell({ rowIndex, field });
  };

  const handleCellChange = (e, rowIndex, field) => {
    // console.log(rowIndex,field)
    const newRow = [...rows];
    newRow[rowIndex][field] = e.target.value;
    setRows(newRow);
  };

  const handleBlur = () => {
    // console.log("clicked")
    setEditCell({ rowIndex: null, field: "" });
  };

  const handleStatusChange = (e, rowIndex) => {
    const newRows = [...rows];
    newRows[rowIndex].Status = e.target.value;
    setRows(newRows);
  };
 


  return (
    <AppBar
      position="fixed"
      sx={{
        width: "100%",
        backgroundColor: "#111926",
        marginTop: { xs: "47px", sm: "64px", md: "69px" },
        padding: "30px",
      }}
    >
      <TableContainer>
        
        {/* Header for Projects page */}
        <Header page={page}/>
        <br />

        {/* Table for Projects page */}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Title</TableCell>
              <TableCell sx={{ color: "white" }}>Description</TableCell>
              <TableCell sx={{ color: "white" }}>Due Date</TableCell>
              <TableCell sx={{ color: "white" }}>priority</TableCell>
              <TableCell sx={{ color: "white" }}>Status</TableCell>
              {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  sx={{ color: "white" }}
                  onClick={() => handleCellClick(index, "title")}
                >
                  {editCell.rowIndex === index && editCell.field === "title" ? (
                    <TextField
                      value={row.title}
                      onChange={(e) => handleCellChange(e, index, "title")}
                      onBlur={handleBlur}
                      autoFocus
                      size="small"
                      variant="standard"
                      sx={{ input: { color: "white" } }}
                    />
                  ) : (
                    row.title
                  )}
                </TableCell>

                <TableCell
                  sx={{ color: "white" }}
                  onClick={() => handleCellClick(index, "desciption")}
                >
                  {editCell.rowIndex === index &&
                  editCell.field === "desciption" ? (
                    <TextField
                      value={row.desciption}
                      onChange={(e) => handleCellChange(e, index, "desciption")}
                      onBlur={handleBlur}
                      autoFocus
                      variant="standard"
                      sx={{ input: { color: "white" }, width: "100%" }}
                    />
                  ) : (
                    row.desciption
                  )}
                </TableCell>

                <TableCell sx={{color:"white"}}>
                  
                   {row.date}
                  
                </TableCell>

                <TableCell sx={{color:"white"}}>
                  
                    {row.priority}
                
                </TableCell>

                <TableCell sx={{ color: "white" }}>
                    <Select
                      value={row.status}
                      onChange={(e) => handleStatusChange(e, index)}
                      sx={{
                        width:"125px",
                        color: "white",
                        ".MuiSelect-select": { padding: "8px 32px 8px 8px" },
                        ".MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#5046e5" },
                      }}
                     >
                       <MenuItem value="To-Do">To-Do</MenuItem>
                       <MenuItem value="In Progress">In Progress</MenuItem>
                       <MenuItem value="Complete">Complete</MenuItem>
                    </Select>
                  </TableCell>
                {/* <TableCell align="right">{row.protein}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <br/>
        <br />
        <Pagination/>
      </TableContainer>
    </AppBar>
  );
};

export default TaskTable;






//   const handleView = (index) => {
//     //  Navigate to task page
//     console.log(index);
//   };
//   const handleDelete = (index) => {
//     console.log(index);
//   };