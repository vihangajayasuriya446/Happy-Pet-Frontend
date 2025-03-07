import React, { useState } from "react";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface Adoption {
  adoption_id: number;
  user: {
    user_id: number;
    user_name: string;
    email: string;
    phone: string;
    address: string;
  };
  pet: {
    pet_id: number;
    pet_name: string;
    pet_species: string;
    pet_age: number;
    pet_gender: string;
    pet_breed: string;
    status: string;
    image_url: string;
  };
  status: string;
  applied_at: string;
}

const UserDetailsDashboard: React.FC = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch adoption records
  const { data: adoptions = [] as Adoption[], isError, error: queryError, isLoading } = useQuery<Adoption[], Error>({
    queryKey: ["adoptions"],
    queryFn: async (): Promise<Adoption[]> => {
      const response = await axios.get("http://localhost:8080/api/adoptions/all");
      return response.data as Adoption[];
    }
  });

  React.useEffect(() => {
    if (isLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }

    if (isError) {
      setError(queryError?.message || "An error occurred");
    }
  }, [isLoading, isError, queryError]);

  // Delete adoption record
  const deleteAdoptionMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await axios.delete(`http://localhost:8080/api/adoptions/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adoptions"] });
    },
  });

  const handleDeleteAdoption = (id: number) => {
    deleteAdoptionMutation.mutate(id);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: "2rem", textAlign: "center" }}>
        <Typography color="error">{error}</Typography>
        <Button variant="contained" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "2rem" }}>
      <Typography variant="h4" sx={{ mb: 4, color: "#003366", fontWeight: "bold" }}>
        User Adoption Details
      </Typography>
      <TableContainer component={Paper} sx={{ borderRadius: "8px", boxShadow: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", color: "#002855", textAlign: "center" }}>User Name</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#002855", textAlign: "center" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#002855", textAlign: "center" }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#002855", textAlign: "center" }}>Address</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#002855", textAlign: "center" }}>Pet Name</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#002855", textAlign: "center" }}>Pet Type</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#002855", textAlign: "center" }}>Pet Age</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#002855", textAlign: "center" }}>Pet Gender</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#002855", textAlign: "center" }}>Pet Breed</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#002855", textAlign: "center" }}>Adoption Status</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#002855", textAlign: "center" }}>Applied At</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#002855", textAlign: "center" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(adoptions) && adoptions.map((adoption) => (
              <TableRow key={adoption.adoption_id}>
                <TableCell sx={{ textAlign: "center" }}>{adoption.user.user_name}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{adoption.user.email}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{adoption.user.phone}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{adoption.user.address}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{adoption.pet.pet_name}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{adoption.pet.pet_species}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{adoption.pet.pet_age}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{adoption.pet.pet_gender}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{adoption.pet.pet_breed}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{adoption.status}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{adoption.applied_at}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteAdoption(adoption.adoption_id)}
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
  );
};

export default UserDetailsDashboard;