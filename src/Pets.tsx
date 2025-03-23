import React, { useState } from "react";

// Function to convert age number to string
const ageNumberToString = (age: number): string => {
 return age.toString();
};
import PetForm from "./AdoptionUserForm";
import PetTable from "./AdoptionTable";
import { Box, Drawer,Tooltip,IconButton } from "@mui/material";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Pet, PetGender, PetStatus } from "./types";
import Sidebar from './Sidebar';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const Pets: React.FC = () => {
 const queryClient = useQueryClient();
 const [isEdit, setIsEdit] = useState<boolean>(false);
 const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
 const [submitted, setSubmitted] = useState<boolean>(false);
 const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
 const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

 // Fetch all pets
 const { data: pets = [] as Pet[] } = useQuery<Pet[], Error>({
 queryKey: ["pets"],
 queryFn: async () => {
 const response = await axios.get("http://localhost:8080/api/v1/gets");
 // Map backend model to frontend model
 return (response.data as { pet_id: number; pet_name: string; pet_species: string; pet_age: number; pet_gender: PetGender; pet_breed: string; status: PetStatus; pet_description: string; image_url: string; created_at: string }[]).map((pet) => ({
 pet_id: pet.pet_id,
 pet_name: pet.pet_name,
 pet_species: pet.pet_species,
 pet_age: ageNumberToString(pet.pet_age),
 pet_gender: pet.pet_gender,
 pet_breed: pet.pet_breed,
 status: pet.status,
 pet_description: pet.pet_description,
 image_url: pet.image_url,
 created_at: pet.created_at,
 pet_adoptionStatus: pet.status,
 pet_photo: null
 }));
 },
 });

 // Add a pet
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
 setIsDrawerOpen(false); // Close the drawer after adding a pet
 },
 });

 
 // Update a pet
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
 setIsEdit(false);
 setIsDrawerOpen(false); // Close the drawer after updating a pet
 },
 });

 // Delete a pet
 const deletePetMutation = useMutation({
 mutationFn: async (id: number) => {
 const response = await axios.delete(`http://localhost:8080/api/v1/deletepet/${id}`);
 return response.data;
 },
 onSuccess: () => {
 queryClient.invalidateQueries({ queryKey: ["pets"] });
 },
 });

 // Handle adding a pet
 const addPet = (data: Pet) => {
 const formData = new FormData();
 formData.append("name", data.pet_name);
 formData.append("type", data.pet_species);
 formData.append("age", ageStringToNumber(data.pet_age).toString()); // Convert age string to number
 formData.append("gender", data.pet_gender);
 formData.append("breed", data.pet_breed);
 formData.append("adoptionStatus", data.pet_adoptionStatus);
 formData.append("description", data.pet_description || "");
 if (data.pet_photo instanceof File) {
 formData.append("photo", data.pet_photo);
 }
 addPetMutation.mutate(formData);
 };

 // Handle updating a pet
 const updatePet = (data: Pet) => {
 const formData = new FormData();
 formData.append("id", data.pet_id.toString());
 formData.append("name", data.pet_name);
 formData.append("type", data.pet_species);
 formData.append("age", ageStringToNumber(data.pet_age).toString()); // Convert age string to number
 formData.append("gender", data.pet_gender);
 formData.append("breed", data.pet_breed);
 formData.append("adoptionStatus", data.pet_adoptionStatus);
 formData.append("description", data.pet_description || "");
 if (data.pet_photo instanceof File) {
 formData.append("photo", data.pet_photo);
 }
 updatePetMutation.mutate(formData);
 };

 // Handle deleting a pet
 const deletePet = (pet: Pet) => {
 deletePetMutation.mutate(pet.pet_id);
 };

 // Handle selecting a pet for editing
 const handleSelectPet = (pet: Pet) => {
 setSelectedPet(pet);
 setIsEdit(true);
 setIsDrawerOpen(true); // Open the drawer when editing a pet
 };

 // Reset the form
 const resetForm = () => {
 setSelectedPet(null);
 setIsEdit(false);
 setSubmitted(false);
 };

 // Function to handle opening the form
 const handleOpenForm = () => {
 setIsDrawerOpen(true);
 };

 return (
 <Box sx={{ width: "100%", margin: "auto", mt: 4, p: 2 }}>
    <Sidebar open={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
                <Tooltip title="Admin Dashboard">
                          <IconButton
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            sx={{
                              position: "fixed",
                              left: isSidebarOpen ? 240 : 16, // Adjust position based on sidebar state
                              top: 60, // Increased top value to move the icon further down
                              zIndex: 1300, // High zIndex to ensure it's above other content
                              '& svg': {
                                fontSize: '2rem',
                                color:"black"
                              },
                              backgroundColor: 'transparent',
                              '&:hover': {
                                backgroundColor: 'rgba(28, 34, 225, 0.61)',
                                backdropFilter: 'blur(10px)',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                              },
                            }}
                          >
                            <KeyboardArrowRightIcon />
                          </IconButton>
                        </Tooltip>
 <Drawer
 anchor="right"
 open={isDrawerOpen}
 onClose={() => setIsDrawerOpen(false)}
 >
 <Box sx={{ width: 600, p: 2 }}>
 <PetForm
 addPet={addPet}
 updatePet={updatePet}
 submitted={submitted}
 data={selectedPet || undefined}
 isEdit={isEdit}
 resetForm={resetForm}
 />
 </Box>
 </Drawer>
 <PetTable
 rows={pets}
 deletePet={deletePet}
 onOpenForm={handleOpenForm} // Pass the handleOpenForm function
 onEdit={handleSelectPet} // Pass the handleSelectPet function
 />
 </Box>
 );
};

export default Pets;

function ageStringToNumber(pet_age: string): number {
 return parseInt(pet_age, 10);
}
