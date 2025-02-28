import React, { useState } from "react";
import PetForm from "./AdoptionUserForm";
import PetTable from "./AdoptionTable";
import { Box } from "@mui/material";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Pet } from "./types";

const Pets: React.FC = () => {
  const queryClient = useQueryClient();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const { data: pets = [] } = useQuery<Pet[]>({
    queryKey: ["pets"],
    queryFn: async () => {
      const response = await axios.get<Pet[]>("http://localhost:8080/api/v1/getpets");
      return response.data;
    },
  });

  const addPetMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await axios.post("http://localhost:8080/api/v1/addpet", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pets"] });
      setSubmitted(true);
    },
  });

  const updatePetMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await axios.put("http://localhost:8080/api/v1/updatepet", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pets"] });
      setSubmitted(true);
    },
  });

  const deletePetMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await axios.delete(`http://localhost:8080/api/v1/deletepet/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pets"] });
    },
  });

  const addPet = (data: Pet) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });
    addPetMutation.mutate(formData);
  };

  const updatePet = (data: Pet) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });
    updatePetMutation.mutate(formData);
  };

  const deletePet = (pet: Pet) => {
    deletePetMutation.mutate(pet.id);
  };

  const handleSelectPet = (pet: Pet) => {
    setSelectedPet(pet);
    setIsEdit(true);
  };

  const resetForm = () => {
    setSelectedPet(null);
    setIsEdit(false);
    setSubmitted(false);
  };

  return (
    <Box sx={{ width: "100%", margin: "auto", mt: 4, p: 2 }}>
      <PetForm
        addPet={addPet}
        updatePet={updatePet}
        submitted={submitted}
        data={selectedPet || undefined}
        isEdit={isEdit}
        resetForm={resetForm}
      />
      <Box sx={{ mt: 4 }}>
        <PetTable rows={pets} selectedPet={handleSelectPet} deletePet={deletePet} />
      </Box>
    </Box>
  );
};

export default Pets;