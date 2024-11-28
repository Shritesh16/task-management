// import * as React from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

// import Paper from '@mui/material/Paper';
import { AppBar, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Header from "./Header";
import Pagination from "./Pagination";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTask, updateTask } from "../Redux/taskReducer/action";
import Loading from "./Loading";

const TaskTable = ({ page }) => {
  const [rows, setRows] = useState([]);
  const [singleTaskUpdate, setsingleTaskUpdate] = useState({});
  const [taskId, setTaskId] = useState("");
  const [editCell, setEditCell] = useState({ rowIndex: null, field: "" });

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 5;
  const [totalPages, setTotalPages] = useState(0);
  const [searchedText, setSearchText] = useState("");

  const { project_id } = useParams();
  const dispatch = useDispatch();
  const {isLoading} = useSelector((store) => store.taskReducer);
  // console.log(isLoading)
  //console.log(project_id)
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const role = storedUser.user.role;
  const user_id = storedUser.user._id;
  const token = storedUser.token;

  const onPageChange = (page) => {
    setSearchParams({ page, limit });
  };

  const recievedText = (searchText) => {
    setSearchText(searchText);
  };

  const handleCellClick = (rowIndex, field) => {
    //console.log(rowIndex, field);
    setEditCell({ rowIndex, field });
  };

  const handleCellChange = (e, rowIndex, field) => {
    // console.log(rowIndex,field)
    const newRow = [...rows];
    newRow[rowIndex][field] = e.target.value;
    const updatedRow = newRow[rowIndex];
    setsingleTaskUpdate({
      taskTitle: updatedRow.taskTitle,
      description: updatedRow.description,
      
    });
    
    setTaskId(updatedRow._id);
    // setRows(newRow);
  };

  const handleBlur = () => {
    // console.log("clicked")
    dispatch(updateTask(taskId, singleTaskUpdate, token));
    setEditCell({ rowIndex: null, field: "" });
  };

  const handleStatusChange = (e, rowIndex) => {
    const newRows = [...rows];
    newRows[rowIndex].status = e.target.value;
    setRows(newRows);
    // handleCellChange(e,rowIndex,"status")
    // handleBlur()
  };

  useEffect(() => {
    dispatch(getTask(project_id, user_id, role, token,currentPage, limit, searchedText)).then((data) => {
      if (data) {
        //console.log(data)
        setRows(data.tasks);
        setTotalPages(data.totalPages);
      }
    });
  }, [project_id, user_id, role, token, dispatch,currentPage, limit, searchedText]);

  
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
        {/* Header for Task page */}
        <Header page={page} recievedText={recievedText}/>
        <br />

        {/* Table for Task page */}
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
          {isLoading ? (
            <Loading />
          ) : (
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    sx={{ color: "white" }}
                    onClick={() => handleCellClick(index, "taskTitle")}
                  >
                    {editCell.rowIndex === index &&
                    editCell.field === "taskTitle" ? (
                      <TextField
                        value={row.taskTitle}
                        onChange={(e) =>
                          handleCellChange(e, index, "taskTitle")
                        }
                        onBlur={handleBlur}
                        autoFocus
                        size="small"
                        variant="standard"
                        sx={{ input: { color: "white" } }}
                      />
                    ) : (
                      row.taskTitle
                    )}
                  </TableCell>

                  <TableCell
                    sx={{ color: "white" }}
                    onClick={() => handleCellClick(index, "description")}
                  >
                    {editCell.rowIndex === index &&
                    editCell.field === "description" ? (
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

                  <TableCell sx={{ color: "white" }}>{row.due_date}</TableCell>

                  <TableCell sx={{ color: "white" }}>{row.priority}</TableCell>

                  <TableCell sx={{ color: "white" }}>
                    <Select
                      value={row.status}
                      onChange={(e) => handleStatusChange(e, index)}
                      sx={{
                        width: "125px",
                        color: "white",
                        ".MuiSelect-select": { padding: "8px 32px 8px 8px" },
                        ".MuiOutlinedInput-notchedOutline": {
                          borderColor: "white",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#5046e5",
                        },
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
          )}
        </Table>

        <br />
        <br />
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange}/>
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

// const Initialrows = [
//   {
//     title: "Frozen yoghurt",
//     desciption:
//       "Frozen yoghurtFrozen yoghurtFrozen yoghurt Frozen yoghurtFrozen",
//     date: "26/10/2024",
//     priority: "Critical",
//     status: "To-Do",
//   },
//   {
//     title: "Frozen yoghurt",
//     desciption:
//       "Frozen yoghurtFrozen yoghurtFrozen yoghurt Frozen yoghurtFrozen",
//     date: "26/10/2024",
//     priority: "Critical",
//     status: "To-Do",
//   },
//   {
//     title: "Frozen yoghurt",
//     desciption:
//       "Frozen yoghurtFrozen yoghurtFrozen yoghurt Frozen yoghurtFrozen",
//     date: "26/10/2024",
//     priority: "Critical",
//     status: "To-Do",
//   },
//   {
//     title: "Frozen yoghurt",
//     desciption:
//       "Frozen yoghurtFrozen yoghurtFrozen yoghurt Frozen yoghurtFrozen",
//     date: "26/10/2024",
//     priority: "Critical",
//     status: "To-Do",
//   },
//   {
//     title: "Frozen yoghurt",
//     desciption:
//       "Frozen yoghurtFrozen yoghurtFrozen yoghurt Frozen yoghurtFrozen",
//     date: "26/10/2024",
//     priority: "Critical",
//     status: "To-Do",
//   },
// ];
