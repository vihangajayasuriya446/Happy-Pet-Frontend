import React, { useState } from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Avatar,
  Chip,
  Box,
  TextField,
  Container,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Pet } from "./types";
import SearchIcon from '@mui/icons-material/Search';

interface PetTableProps {
  rows: Pet[];
  deletePet: (pet: Pet) => void;
  onOpenForm: () => void;
  onEdit: (pet: Pet) => void;
}

const PetTable: React.FC<PetTableProps> = ({ rows, deletePet, onOpenForm, onEdit }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>("");

  type StatusColor = "success" | "warning" | "default";

  const getStatusColor = (status: string): StatusColor => {
    switch (status) {
      case "Available":
        return "success";
      case "Pending":
        return "warning";
      case "Adopted":
        return "default";
      default:
        return "default";
    }
  };

  const goToUserDetailsDashboard = () => {
    navigate("/user-dashboard");
  };

  return (
    <Container maxWidth="xl" sx={{ px: { xs: 1, sm: 2, md: 3 }, py: 2 }}>
      {/* Header with Title */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "#002855",
            fontWeight: "bold",
          }}
        >
          Pet Management Dashboard
        </Typography>
      </Box>

      {/* Search Bar and Add Pet Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          width: "100%",
        }}
      >
        {/* Search Bar (Left Side) - Matched with UserDetailsDashboard */}
        <TextField
          placeholder="Search Pet"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ 
            width: '300px',
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
              },
              '&.Mui-focused': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
              }
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* Add Pet Button (Right Side) */}
        <Button
          variant="contained"
          color="primary"
          onClick={onOpenForm}
          sx={{
            textTransform: "none",
            borderRadius: "4px",
          }}
        >
          + Add a Pet
        </Button>
      </Box>

      {/* Pet Table - Fixed width and stability issues */}
      <Box sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: "8px",
            boxShadow: 3,
            width: "100%",
            tableLayout: "fixed",
          }}
        >
          <Table stickyHeader sx={{ minWidth: 650 }}>
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell width="5%" sx={{ fontWeight: "bold", color: "#002855", textAlign: "center" }}>ID</TableCell>
                <TableCell width="10%" sx={{ fontWeight: "bold", color: "#002855", textAlign: "center" }}>Photo</TableCell>
                <TableCell width="12%" sx={{ fontWeight: "bold", color: "#002855", textAlign: "center" }}>Pet Name</TableCell>
                <TableCell width="10%" sx={{ fontWeight: "bold", color: "#002855", textAlign: "center" }}>Type</TableCell>
                <TableCell width="8%" sx={{ fontWeight: "bold", color: "#002855", textAlign: "center" }}>Age</TableCell>
                <TableCell width="10%" sx={{ fontWeight: "bold", color: "#002855", textAlign: "center" }}>Gender</TableCell>
                <TableCell width="15%" sx={{ fontWeight: "bold", color: "#002855", textAlign: "center" }}>Breed</TableCell>
                <TableCell width="10%" sx={{ fontWeight: "bold", color: "#002855", textAlign: "center" }}>Status</TableCell>
                <TableCell width="20%" sx={{ fontWeight: "bold", color: "#002855", textAlign: "center" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .filter((row) => row.pet_name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((row) => (
                  <TableRow key={row.pet_id} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" } }}>
                    <TableCell sx={{ textAlign: "center" }}>{row.pet_id}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {row.image_url && (
                        <Avatar
                          alt={row.pet_name}
                          src={`http://localhost:8080${row.image_url}`}
                          sx={{ width: 50, height: 50, margin: "0 auto" }}
                        />
                      )}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{row.pet_name}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{row.pet_species}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{row.pet_age}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{row.pet_gender}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{row.pet_breed}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <Chip
                        label={row.pet_adoptionStatus}
                        color={getStatusColor(row.pet_adoptionStatus)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{
                          marginRight: 1,
                          textTransform: "none",
                          borderRadius: "4px",
                        }}
                        onClick={() => onEdit(row)}
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
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* User Details Dashboard Button (Below the Table, Right Side) */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mt: 3,
          mb: 2,
          width: "100%",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={goToUserDetailsDashboard}
          sx={{
            textTransform: "none",
            borderRadius: "4px",
          }}
        >
          User Details Dashboard
        </Button>
      </Box>
    </Container>
  );
};

export default PetTable;