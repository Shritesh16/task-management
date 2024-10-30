// import * as React from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
// import Paper from '@mui/material/Paper';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Header from "./Header";
import Pagination from "./Pagination";

const Initialrows = [
  {
    title: "Frozen yoghurt",
    desciption:
      "Frozen yoghurtFrozen yoghurtFrozen yoghurt Frozen yoghurtFrozen",
  },
  {
    title: "Frozen yoghurt",
    desciption:
      "Frozen yoghurtFrozen yoghurtFrozen yoghurt Frozen yoghurtFrozen",
  },
  {
    title: "Frozen yoghurt",
    desciption:
      "Frozen yoghurtFrozen yoghurtFrozen yoghurt Frozen yoghurtFrozen",
  },
  {
    title: "Frozen yoghurt",
    desciption:
      "Frozen yoghurtFrozen yoghurtFrozen yoghurt Frozen yoghurtFrozen",
  },
  {
    title: "Frozen yoghurt",
    desciption:
      "Frozen yoghurtFrozen yoghurtFrozen yoghurt Frozen yoghurtFrozen",
  },
  
];

const ProjectTable = ({page}) => {
  const [rows, setRows] = useState(Initialrows);
  const [editCell, setEditCell] = useState({ rowIndex: null, field: "" });

  const handleView = (index) => {
    //  Navigate to task page
    console.log(index);
  };
  const handleDelete = (index) => {
    console.log(index);
  };

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

  // aria-label="simple table"   component={Paper}
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
              <TableCell sx={{ color: "white" }}></TableCell>
              <TableCell sx={{ color: "white" }}></TableCell>
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

                <TableCell>
                  <Button
                    sx={{
                      color: "#5046e5",
                      fontWeight: "bold",
                      fontSize: "medium",
                    }}
                    onClick={() => handleView(index)}
                  >
                    View
                  </Button>
                </TableCell>

                <TableCell>
                  <IconButton
                    aria-label="delete"
                    sx={{ color: "white" }}
                    onClick={() => handleDelete(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
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

export default ProjectTable;