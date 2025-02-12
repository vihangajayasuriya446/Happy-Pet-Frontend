import React, { useCallback } from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const UserTable = ({ rows, selectedUser, deleteUser }) => {
  const handleUpdate = useCallback(
    (row) => {
      selectedUser(row);
    },
    [selectedUser]
  );

  const handleDelete = useCallback(
    (row) => {
      if (window.confirm("Are you sure you want to delete this user?")) {
        deleteUser(row);
      }
    },
    [deleteUser]
  );

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Pet Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Breed</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Pet Photo</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length > 0 ? (
            rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.type}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.age}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.gender}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.breed}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.location}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.photo && (
                    <img
                      src={`data:image/jpeg;base64,${row.photo}`}
                      alt="Pet"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "8px",
                      }}
                    />
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    sx={{ margin: "0px 10px" }}
                    onClick={() => handleUpdate(row)}
                  >
                    Update
                  </Button>
                  <Button
                    sx={{ margin: "0px 10px" }}
                    onClick={() => handleDelete(row)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                No Data
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
