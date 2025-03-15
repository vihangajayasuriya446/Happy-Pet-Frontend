import React from "react";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Avatar, Chip, Box } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import for navigation
import { Pet } from "./types";

interface PetTableProps {
  rows: Pet[];
  selectedPet: (pet: Pet) => void;
  deletePet: (pet: Pet) => void;
}

const PetTable: React.FC<PetTableProps> = ({ rows, selectedPet, deletePet }) => {
  const navigate = useNavigate(); // Hook for navigation

  // Function to get status color
  type StatusColor = "success" | "warning" | "default";

  const getStatusColor = (status: string): StatusColor => {
    switch (status) {
      case "Available": return "success";
      case "Pending": return "warning";
      case "Adopted": return "default";
      default: return "default";
    }
  };

  const goToUserDetailsDashboard = () => {
    navigate('/user-dashboard'); // Navigate to the UserDetailsDashboard route
  };

  return (
    <>
      {/* Header with navigation button */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap', // Ensures button wraps on small screens
          gap: 2, // Adds spacing when wrapped
          mb: 2, // Adjust margin-bottom for better spacing
          p: 2 // Padding for spacing
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "#002855",
            fontWeight: "bold",
            flex: "1 1 auto" // Ensures text takes space and button moves correctly
          }}
        >
          Pet Management Dashboard
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={goToUserDetailsDashboard}
          sx={{
            textTransform: "none",
            borderRadius: "4px",
            flexShrink: 0 // Prevents button from shrinking too much
          }}
        >
          User Details Dashboard
        </Button>
      </Box>

      {/* Table with full responsiveness */}
      <TableContainer component={Paper}
        sx={{
          borderRadius: "8px",
          boxShadow: 3,
          overflowX: "auto", // Enables scrolling on small screens
          width: "100%" // Makes table take full width
        }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", color: "#002855", textAlign: "center" }}>ID</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#002855", textAlign: "center" }}>Photo</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#002855", textAlign: "center" }}>Pet Name</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#002855", textAlign: "center" }}>Type</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#002855", textAlign: "center" }}>Age</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#002855", textAlign: "center" }}>Gender</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#002855", textAlign: "center" }}>Breed</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#002855", textAlign: "center" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#002855", textAlign: "center" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row) => (
                <TableRow key={row.pet_id} sx={{ "&:nth-of-type(odd)": { backgroundColor: '#f9f9f9' } }}>
                  <TableCell sx={{ textAlign: 'center' }}>{row.pet_id}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    {row.image_url && (
                      <Avatar
                        alt={row.pet_name}
                        src={`http://localhost:8080${row.image_url}`}
                        sx={{ width: 50, height: 50, margin: "0 auto" }}
                      />
                    )}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.pet_name}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.pet_species}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.pet_age}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.pet_gender}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>{row.pet_breed}</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    <Chip
                      label={row.pet_adoptionStatus}
                      color={getStatusColor(row.pet_adoptionStatus) as "default" | "success" | "warning"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
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
    </>
  );
};

export default PetTable;
