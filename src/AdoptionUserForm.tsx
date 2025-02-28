import React, { useEffect, useState } from "react";
import { Button, FormLabel, Box, Input, Typography, Select, MenuItem, Card, CardContent } from "@mui/material";
import { Pet } from "./types";

interface PetFormProps {
  addPet: (pet: Pet) => void;
  updatePet: (pet: Pet) => void;
  submitted: boolean;
  data?: Pet;
  isEdit: boolean;
  resetForm: () => void;
}

const PetForm: React.FC<PetFormProps> = ({
  addPet,
  updatePet,
  submitted,
  data,
  isEdit,
  resetForm,
}) => {
  const [id, setId] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [breed, setBreed] = useState<string>("");
  const [adoptionStatus, setAdoptionStatus] = useState<string>("Available");
  const [photo, setPhoto] = useState<string | File | null>(null);

  useEffect(() => {
    if (submitted || !isEdit) {
      resetFormState();
    }
  }, [submitted, isEdit]);

  useEffect(() => {
    if (isEdit && data) {
      populateForm(data);
    }
  }, [data, isEdit]);

  const resetFormState = () => {
    setId(0);
    setName("");
    setType("");
    setAge("");
    setGender("");
    setBreed("");
    setAdoptionStatus("Available");
    setPhoto(null);
    resetForm();
  };

  const populateForm = (data: Pet) => {
    setId(data.id);
    setName(data.name);
    setType(data.type);
    setAge(data.age);
    setGender(data.gender);
    setBreed(data.breed);
    setAdoptionStatus(data.adoptionStatus);
    setPhoto(data.photo || null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
    }
  };

  const handleSubmit = () => {
    const petData: Pet = {
      id,
      name,
      type,
      age,
      gender,
      breed,
      adoptionStatus,
      photo,
    };

    if (isEdit) {
      updatePet(petData);
    } else {
      addPet(petData);
    }
  };

  return (
    <Card sx={{ maxWidth: 600, margin: "auto", mt: 4, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 3, color: "#002855", fontWeight: "bold", textAlign: "center" }}>
          {isEdit ? "Edit Pet" : "Add a New Pet for Adoption"}
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box>
            <FormLabel sx={{ fontWeight: "bold", color: "#002855" }}>Pet Name</FormLabel>
            <Input fullWidth value={name} onChange={(e) => setName(e.target.value)} />
          </Box>

          <Box>
            <FormLabel sx={{ fontWeight: "bold", color: "#002855" }}>Pet Type</FormLabel>
            <Select fullWidth value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="Dog">Dog</MenuItem>
              <MenuItem value="Cat">Cat</MenuItem>
            </Select>
          </Box>

          <Box>
            <FormLabel sx={{ fontWeight: "bold", color: "#002855" }}>Age</FormLabel>
            <Select fullWidth value={age} onChange={(e) => setAge(e.target.value)}>
              <MenuItem value="Baby">Baby</MenuItem>
              <MenuItem value="Young">Young</MenuItem>
              <MenuItem value="Adult">Adult</MenuItem>
              <MenuItem value="Senior">Senior</MenuItem>
            </Select>
          </Box>

          <Box>
            <FormLabel sx={{ fontWeight: "bold", color: "#002855" }}>Gender</FormLabel>
            <Select fullWidth value={gender} onChange={(e) => setGender(e.target.value)}>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
          </Box>

          <Box>
            <FormLabel sx={{ fontWeight: "bold", color: "#002855" }}>Breed</FormLabel>
            <Input fullWidth value={breed} onChange={(e) => setBreed(e.target.value)} />
          </Box>

          <Box>
            <FormLabel sx={{ fontWeight: "bold", color: "#002855" }}>Adoption Status</FormLabel>
            <Select fullWidth value={adoptionStatus} onChange={(e) => setAdoptionStatus(e.target.value)}>
              <MenuItem value="Available">Available</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Adopted">Adopted</MenuItem>
            </Select>
          </Box>

          <Box>
            <FormLabel sx={{ fontWeight: "bold", color: "#002855" }}>Pet Photo</FormLabel>
            <Input fullWidth type="file" onChange={handleFileChange} />
          </Box>

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ mt: 2, textTransform: "none", borderRadius: "4px" }}
          >
            {isEdit ? "Update Pet" : "Add Pet"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PetForm;