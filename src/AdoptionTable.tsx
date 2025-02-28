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
            <TableCell sx={{ fontWeight: "bold", color: "#002855", textAlign: "center" }}>ID</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#002855", textAlign: "center" }}>Pet Name</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#002855", textAlign: "center" }}>Type</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#002855", textAlign: "center" }}>Age</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#002855", textAlign: "center" }}>Gender</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#002855", textAlign: "center" }}>Breed</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#002855", textAlign: "center" }}>Adoption Status</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#002855", textAlign: "center" }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length > 0 ? (
            rows.map((row) => (
              <TableRow key={row.id} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" } }}>
                <TableCell sx={{ textAlign: "center" }}>{row.id}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{row.name}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{row.type}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{row.age}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{row.gender}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{row.breed}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{row.adoptionStatus}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginRight: 1, textTransform: "none", borderRadius: "4px" }}
                    onClick={() => selectedPet(row)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ textTransform: "none", borderRadius: "4px" }}
                    onClick={() => deletePet(row)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
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