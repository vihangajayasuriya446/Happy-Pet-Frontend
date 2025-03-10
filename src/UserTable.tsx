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
import { User } from "./types"; // Import the shared User type

interface UserTableProps {
  rows: User[];
  selectedUser: (user: User) => void;
  deleteUser: (user: User) => void;
}

const UserTable: React.FC<UserTableProps> = ({ rows, selectedUser, deleteUser }) => {
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
    <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: '8px', overflow: 'hidden' }}>
      <Table sx={{ minWidth: 650, borderCollapse: 'collapse' }}>
        <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', padding: '16px' }}>ID</TableCell>
            <TableCell sx={{ fontWeight: 'bold', padding: '16px' }}>Pet Name</TableCell>
            <TableCell sx={{ fontWeight: 'bold', padding: '16px' }}>Type</TableCell>
            <TableCell sx={{ fontWeight: 'bold', padding: '16px' }}>Age</TableCell>
            <TableCell sx={{ fontWeight: 'bold', padding: '16px' }}>Gender</TableCell>
            <TableCell sx={{ fontWeight: 'bold', padding: '16px' }}>Breed</TableCell>
            <TableCell sx={{ fontWeight: 'bold', padding: '16px' }}>Location</TableCell>
            <TableCell sx={{ fontWeight: 'bold', padding: '16px' }}>Pet Photo</TableCell>
            <TableCell sx={{ fontWeight: 'bold', padding: '16px' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length > 0 ? (
            rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' }, '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" sx={{ padding: '12px' }}>
                  {row.id}
                </TableCell>
                <TableCell component="th" scope="row" sx={{ padding: '12px' }}>
                  {row.name}
                </TableCell>
                <TableCell component="th" scope="row" sx={{ padding: '12px' }}>
                  {row.type}
                </TableCell>
                <TableCell component="th" scope="row" sx={{ padding: '12px' }}>
                  {row.age}
                </TableCell>
                <TableCell component="th" scope="row" sx={{ padding: '12px' }}>
                  {row.gender}
                </TableCell>
                <TableCell component="th" scope="row" sx={{ padding: '12px' }}>
                  {row.breed}
                </TableCell>
                <TableCell component="th" scope="row" sx={{ padding: '12px' }}>
                  {row.location}
                </TableCell>
                <TableCell component="th" scope="row" sx={{ padding: '12px' }}>
                  {row.photo && (
                    <img
                      src={
                        typeof row.photo === 'string'
                          ? `data:image/jpeg;base64,${row.photo}` // For existing Base64 strings
                          : URL.createObjectURL(row.photo) // For new files
                      }
                      alt="Pet"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "8px",
                        objectFit: 'cover',
                      }}
                    />
                  )}
                </TableCell>
                <TableCell sx={{ padding: '12px' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ margin: "4px", padding: '6px 12px', fontSize: '0.875rem' }}
                    onClick={() => handleUpdate(row)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ margin: "4px", padding: '6px 12px', fontSize: '0.875rem' }}
                    onClick={() => handleDelete(row)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row" colSpan={9} align="center" sx={{ padding: '20px', fontWeight: 'bold', color: 'grey' }}>
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