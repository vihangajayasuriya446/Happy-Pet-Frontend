import React from "react";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Pet } from "./types";

interface PetTableProps {
  rows: Pet[];
  selectedPet: (pet: Pet) => void;
  deletePet: (pet: Pet) => void;
}

const PetTable: React.FC<PetTableProps> = ({ rows, selectedPet, deletePet }) => {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: "8px", boxShadow: 3 }}>
      <Table>
        <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", color: "#002855" }}>ID</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#002855" }}>Pet Name</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#002855" }}>Type</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#002855" }}>Age</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#002855" }}>Gender</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#002855" }}>Breed</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#002855" }}>Location</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#002855" }}>Adoption Status</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#002855" }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length > 0 ? (
            rows.map((row) => (
              <TableRow key={row.id} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" } }}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.age}</TableCell>
                <TableCell>{row.gender}</TableCell>
                <TableCell>{row.breed}</TableCell>
                <TableCell>{row.location}</TableCell>
                <TableCell>{row.adoptionStatus}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginRight: 1, textTransform: "none" }}
                    onClick={() => selectedPet(row)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ textTransform: "none" }}
                    onClick={() => deletePet(row)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} align="center" sx={{ py: 4 }}>
                <Typography variant="body1" color="textSecondary">
                  No pets available for adoption.
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PetTable;