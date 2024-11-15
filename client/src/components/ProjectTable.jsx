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
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import Header from "./Header";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  deleteProject,
  getProject,
  updateProject,
} from "../Redux/projectReducer/action";
import DeleteDialog from "./DeleteDialog";

const ProjectTable = ({ page }) => {
  const [rows, setRows] = useState([]);
  const [singleProjectUpdate, setsingleProjectUpdate] = useState({});
  const [projectId, setProjectId] = useState("");
  const [editCell, setEditCell] = useState({ rowIndex: null, field: "" });

  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const dispatch = useDispatch();
  //const {projects} = useSelector((store) => store.projectReducer)
  //console.log(projects)

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const role = storedUser.user.role;
  const manager_id = storedUser.user._id;
  const token = storedUser.token;

  const handleView = (index) => {
    //  Navigate to task page
    console.log(index);
  };

  const handleDelete = (e, projectId) => {
    e.preventDefault();
    console.log("clicked", projectId);
    dispatch(deleteProject(projectId, token));
    setOpenDialog(false);
  };

  const handleCellClick = (rowIndex, field) => {
    //console.log(rowIndex,field)
    if (role === "Manager") {
      setEditCell({ rowIndex, field });
    }
  };

  const handleCellChange = (e, rowIndex, field) => {
    //console.log(rowIndex,field)
    const newRow = [...rows];
    newRow[rowIndex][field] = e.target.value;
    //console.log(newRow)
    const updatedRow = newRow[rowIndex];
    // console.log({title:updatedRow.title,description:updatedRow.description })
    // console.log({project_ID:updatedRow._id})
    setsingleProjectUpdate({
      title: updatedRow.title,
      description: updatedRow.description,
    });
    setProjectId(updatedRow._id);
    // console.log(singleProjectUpdate)
    // setRows(newRow);
  };

  const handleBlur = () => {
    // console.log(singleProjectUpdate)
    dispatch(updateProject(projectId, singleProjectUpdate, token));
    console.log("clicked");
    setEditCell({ rowIndex: null, field: "" });
  };

  const handleOpenDialog = (id) => {
    setDeleteId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDeleteId(null);
  };

  useEffect(() => {
    dispatch(getProject(manager_id, token)).then((data) => {
      if (data) {
        setRows(data);
      }
    });
  }, [manager_id, token, dispatch]);

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
        <Header page={page} />
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
                  {editCell.rowIndex === index &&
                  editCell.field === "title" &&
                  role === "Manager" ? (
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
                  onClick={() => handleCellClick(index, "description")}
                >
                  {editCell.rowIndex === index &&
                  editCell.field === "description" &&
                  role === "Manager" ? (
                    <TextField
                      value={row.description}
                      onChange={(e) =>
                        handleCellChange(e, index, "description")
                      }
                      onBlur={handleBlur}
                      autoFocus
                      variant="standard"
                      sx={{ input: { color: "white" }, width: "100%" }}
                    />
                  ) : (
                    row.description
                  )}
                </TableCell>

                <TableCell>
                  <Link to="/task">
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
                  </Link>
                </TableCell>

                <TableCell>
                  <IconButton
                    aria-label="delete"
                    sx={{
                      color: "white",
                      opacity: role === "Manager" ? 1 : 0.3,
                      pointerEvents: role === "Manager" ? "auto" : "none",
                    }}
                    onClick={() => handleOpenDialog(row._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
                {/* <TableCell align="right">{row.protein}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <br />
        <br />
        <Pagination />
      </TableContainer>

      {/* Delete confirmation dialog */}
      <DeleteDialog
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        handleDelete={handleDelete}
        deleteId={deleteId}
      />
    </AppBar>
  );
};

export default ProjectTable;

// const Initialrows = [
//   {
//     title: "Frozen yoghurt",
//     desciption:
//       "Frozen yoghurtFrozen yoghurtFrozen yoghurt Frozen yoghurtFrozen",
//   },
//   {
//     title: "Frozen yoghurt",
//     desciption:
//       "Frozen yoghurtFrozen yoghurtFrozen yoghurt Frozen yoghurtFrozen",
//   },
//   {
//     title: "Frozen yoghurt",
//     desciption:
//       "Frozen yoghurtFrozen yoghurtFrozen yoghurt Frozen yoghurtFrozen",
//   },
//   {
//     title: "Frozen yoghurt",
//     desciption:
//       "Frozen yoghurtFrozen yoghurtFrozen yoghurt Frozen yoghurtFrozen",
//   },
//   {
//     title: "Frozen yoghurt",
//     desciption:
//       "Frozen yoghurtFrozen yoghurtFrozen yoghurt Frozen yoghurtFrozen",
//   },

// ];
