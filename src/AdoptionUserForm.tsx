import React, { useEffect, useState } from "react";
import { Button, FormLabel, Box, Input, Typography, Select, MenuItem, Card, CardContent, TextField } from "@mui/material";
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
  const [pet_id, setPetId] = useState<number>(0);
  const [pet_name, setPetName] = useState<string>("");
  const [pet_species, setPetSpecies] = useState<string>("");
  const [pet_age, setPetAge] = useState<string>("");
  const [pet_gender, setPetGender] = useState<string>("");
  const [pet_breed, setPetBreed] = useState<string>("");
  const [pet_adoptionStatus, setPetAdoptionStatus] = useState<string>("Available");
  const [pet_description, setPetDescription] = useState<string>("");
  const [pet_photo, setPetPhoto] = useState<File | string | null>(null);
  const [image_url, setImageUrl] = useState<string | undefined>(undefined);

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
    setPetId(0);
    setPetName("");
    setPetSpecies("");
    setPetAge("");
    setPetGender("");
    setPetBreed("");
    setPetAdoptionStatus("Available");
    setPetDescription("");
    setPetPhoto(null);
    setImageUrl(undefined);
    resetForm();
  };

  const populateForm = (data: Pet) => {
    setPetId(data.pet_id);
    setPetName(data.pet_name);
    setPetSpecies(data.pet_species);
    setPetAge(data.pet_age);
    setPetGender(data.pet_gender);
    setPetBreed(data.pet_breed);
    setPetAdoptionStatus(data.pet_adoptionStatus);
    setPetDescription(data.pet_description || "");
    setImageUrl(data.image_url);
    setPetPhoto(data.pet_photo || null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPetPhoto(file);
    }
  };

  const handleSubmit = () => {
    const petData: Pet = {
      pet_id,
      pet_name,
      pet_species,
      pet_age,
      pet_gender,
      pet_breed,
      pet_adoptionStatus,
      pet_description,
      pet_photo,
      image_url
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
            <Input fullWidth value={pet_name} onChange={(e) => setPetName(e.target.value)} />
          </Box>

          <Box>
            <FormLabel sx={{ fontWeight: "bold", color: "#002855" }}>Pet Type</FormLabel>
            <Select fullWidth value={pet_species} onChange={(e) => setPetSpecies(e.target.value as string)}>
              <MenuItem value="Dog">Dog</MenuItem>
              <MenuItem value="Cat">Cat</MenuItem>
            </Select>
          </Box>

          <Box>
            <FormLabel sx={{ fontWeight: "bold", color: "#002855" }}>Age</FormLabel>
            <Select fullWidth value={pet_age} onChange={(e) => setPetAge(e.target.value as string)}>
              <MenuItem value="Baby">Baby</MenuItem>
              <MenuItem value="Young">Young</MenuItem>
              <MenuItem value="Adult">Adult</MenuItem>
              <MenuItem value="Senior">Senior</MenuItem>
            </Select>
          </Box>

          <Box>
            <FormLabel sx={{ fontWeight: "bold", color: "#002855" }}>Gender</FormLabel>
            <Select fullWidth value={pet_gender} onChange={(e) => setPetGender(e.target.value as string)}>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
          </Box>

          <Box>
            <FormLabel sx={{ fontWeight: "bold", color: "#002855" }}>Breed</FormLabel>
            <Input fullWidth value={pet_breed} onChange={(e) => setPetBreed(e.target.value)} />
          </Box>

          <Box>
            <FormLabel sx={{ fontWeight: "bold", color: "#002855" }}>Adoption Status</FormLabel>
            <Select fullWidth value={pet_adoptionStatus} onChange={(e) => setPetAdoptionStatus(e.target.value as string)}>
              <MenuItem value="Available">Available</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Adopted">Adopted</MenuItem>
            </Select>
          </Box>

          <Box>
            <FormLabel sx={{ fontWeight: "bold", color: "#002855" }}>Description</FormLabel>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={pet_description}
              onChange={(e) => setPetDescription(e.target.value)}
              placeholder="Enter pet description here..."
            />
          </Box>

          <Box>
            <FormLabel sx={{ fontWeight: "bold", color: "#002855" }}>Pet Photo</FormLabel>
            <Input fullWidth type="file" onChange={handleFileChange} />
            {isEdit && image_url && (
              <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
                Current photo: {image_url.split('/').pop()}
              </Typography>
            )}
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