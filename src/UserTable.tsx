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
  useTheme,
  Typography,
  Avatar,
  Box,
} from "@mui/material";
import { User } from "./types"; // Import the shared User type

interface UserTableProps {
  rows: User[];
  selectedUser: (user: User) => void;
  deleteUser: (user: User) => void;
}

const UserTable: React.FC<UserTableProps> = ({ rows, selectedUser, deleteUser }) => {
  const theme = useTheme();

  const handleUpdate = useCallback(
    (row: User) => {
      selectedUser(row);
    },
    [selectedUser]
  );

  const handleDelete = useCallback(
    (row: User) => {
      if (window.confirm("Are you sure you want to delete this user?")) {
        deleteUser(row);
      }
    },
    [deleteUser]
  );

  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: theme.shadows[3],
        borderRadius: "12px",
        overflow: "hidden",
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Table sx={{ minWidth: 650 }}>
        <TableHead sx={{ backgroundColor: theme.palette.grey[100] }}>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", padding: "16px" }}>ID</TableCell>
            <TableCell sx={{ fontWeight: "bold", padding: "16px" }}>Pet Name</TableCell>
            <TableCell sx={{ fontWeight: "bold", padding: "16px" }}>Type</TableCell>
            <TableCell sx={{ fontWeight: "bold", padding: "16px" }}>Age</TableCell>
            <TableCell sx={{ fontWeight: "bold", padding: "16px" }}>Gender</TableCell>
            <TableCell sx={{ fontWeight: "bold", padding: "16px" }}>Breed</TableCell>
            <TableCell sx={{ fontWeight: "bold", padding: "16px" }}>Location</TableCell>
            <TableCell sx={{ fontWeight: "bold", padding: "16px" }}>Pet Photo</TableCell>
            <TableCell sx={{ fontWeight: "bold", padding: "16px" }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length > 0 ? (
            rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  "&:nth-of-type(odd)": { backgroundColor: theme.palette.action.hover },
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell sx={{ padding: "12px" }}>{row.id}</TableCell>
                <TableCell sx={{ padding: "12px" }}>{row.name}</TableCell>
                <TableCell sx={{ padding: "12px" }}>{row.type}</TableCell>
                <TableCell sx={{ padding: "12px" }}>{row.age}</TableCell>
                <TableCell sx={{ padding: "12px" }}>{row.gender}</TableCell>
                <TableCell sx={{ padding: "12px" }}>{row.breed}</TableCell>
                <TableCell sx={{ padding: "12px" }}>{row.location}</TableCell>
                <TableCell sx={{ padding: "12px" }}>
                  {row.photo && (
                    <Avatar
                      src={
                        typeof row.photo === "string"
                          ? `data:image/jpeg;base64,${row.photo}` // For existing Base64 strings
                          : URL.createObjectURL(row.photo) // For new files
                      }
                      alt="Pet"
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: "8px",
                      }}
                    />
                  )}
                </TableCell>
                <TableCell sx={{ padding: "12px" }}>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ textTransform: "none", borderRadius: "8px" }}
                      onClick={() => handleUpdate(row)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      sx={{ textTransform: "none", borderRadius: "8px" }}
                      onClick={() => handleDelete(row)}
                    >
                      Delete
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} align="center" sx={{ padding: "20px" }}>
                <Typography variant="body1" color="textSecondary">
                  No Data Available
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;