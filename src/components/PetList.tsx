import React, { useState, useEffect } from "react";
import { Grid, CircularProgress, Box, Typography } from "@mui/material";
import DefaultPetCard from "./PetCard";
import axios from "axios";
import { Pet } from "../App";

//Interface for the API data only
interface PetDTO {
    id: string;
    name: string;
    petType: string;
    price: string;
    breed: string;
    birthYear: string;
    gender: string;
    imageUrl?: string;
    purchased?: boolean;
}

interface PetListProps {
    searchQuery?: string;
    petType?: string;
    birthYear?: string;

    PetCardComponent?: React.FC<{ pet: Pet; onAdopt?: () => void }>;
    isAdminView?: boolean;
}

const API_BASE_URL = 'http://localhost:8080';
const PETS_API_URL = `${API_BASE_URL}/api/v1/pets`;

// Custom PetCard wrapper with image hover effect
const PetCardWithHoverImage: React.FC<{
    pet: Pet;
    onAdopt?: () => void;
    CardComponent: React.FC<{ pet: Pet; onAdopt?: () => void }>;
}> = ({ pet, onAdopt, CardComponent }) => {
    return (
        <Box
            sx={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '8px',
                height: '100%',
                width: '100%',
                '& img': {
                    transition: 'transform 0.3s ease',
                },
                '&:hover img': {
                    transform: 'scale(1.1)',
                },
                '&:hover': {
                    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                }
            }}
        >
            <CardComponent pet={pet} onAdopt={onAdopt} />
        </Box>
    );
};

const PetList: React.FC<PetListProps> = ({
                                             searchQuery = '',
                                             petType = 'all',
                                             birthYear = 'all',
                                             PetCardComponent,
                                             isAdminView = false
                                         }) => {
    const [petsData, setPetsData] = useState<PetDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Use the provided PetCardComponent or fall back to the default
    const CardComponent = PetCardComponent || DefaultPetCard;

    // Helper function to get full image URL
    const getFullImageUrl = (imageUrl?: string) => {
        if (!imageUrl) return '';
        if (imageUrl.startsWith('http')) return imageUrl;
        return `${API_BASE_URL}${imageUrl}`;
    };

    useEffect(() => {
        setLoading(true);
        console.log("Fetching pets with filters:", { petType, birthYear, searchQuery });

        // Fetch all pets first
        axios.get<PetDTO[]>(PETS_API_URL)
            .then(response => {
                let filteredPets = response.data;
                console.log(`Fetched ${filteredPets.length} total pets`);

                // Apply pet type filter if not 'all'
                if (petType !== 'all') {
                    filteredPets = filteredPets.filter(pet =>
                        pet.petType.toLowerCase() === petType.toLowerCase()
                    );
                    console.log(`Filtered to ${filteredPets.length} ${petType} pets`);
                }

                // Apply birth year filter if not 'all'
                if (birthYear !== 'all') {
                    filteredPets = filteredPets.filter(pet => pet.birthYear === birthYear);
                    console.log(`Filtered to ${filteredPets.length} pets with birth year ${birthYear}`);
                }


                // Apply search query if present
                if (searchQuery && searchQuery.trim() !== '') {
                    filteredPets = filterBySearchQuery(filteredPets, searchQuery);
                    console.log(`Filtered to ${filteredPets.length} pets matching search "${searchQuery}"`);
                }

                setPetsData(filteredPets);
                setError(null);
            })
            .catch(err => {
                console.error("Error fetching pets:", err);
                setError("Failed to load pets. Please try again later.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [searchQuery, petType, birthYear]);

    // Enhanced search function that checks name, breed, pet type, and gender
    const filterBySearchQuery = (pets: PetDTO[], query: string): PetDTO[] => {
        const normalizedQuery = query.toLowerCase().trim();

        // If query is empty, return all pets
        if (!normalizedQuery) return pets;

        return pets.filter(pet => {
            // Check if any of the pet's properties match the search query
            return (
                pet.name.toLowerCase().includes(normalizedQuery) ||
                pet.breed.toLowerCase().includes(normalizedQuery) ||
                pet.petType.toLowerCase().includes(normalizedQuery) ||
                (pet.gender && pet.gender.toLowerCase().includes(normalizedQuery)) || // Keep gender in search
                // Check for common terms
                (pet.petType.toLowerCase() === 'dog' &&
                    (normalizedQuery === 'dog' || normalizedQuery === 'dogs' || normalizedQuery.includes('dog'))) ||
                (pet.petType.toLowerCase() === 'cat' &&
                    (normalizedQuery === 'cat' || normalizedQuery === 'cats' || normalizedQuery.includes('cat'))) ||
                // Keep gender-related terms in search
                (pet.gender && pet.gender.toLowerCase() === 'male' &&
                    (normalizedQuery === 'male' || normalizedQuery === 'boy' || normalizedQuery.includes('male'))) ||
                (pet.gender && pet.gender.toLowerCase() === 'female' &&
                    (normalizedQuery === 'female' || normalizedQuery === 'girl' || normalizedQuery.includes('female')))
            );
        });
    };

    const handleAdopt = async (petDTO: PetDTO) => {
        try {
            await axios.post(`${PETS_API_URL}/${petDTO.id}/buy`);
            console.log(`Purchased pet with ID: ${petDTO.id}`);

            // Refresh the pet list after purchase
            axios.get<PetDTO[]>(PETS_API_URL)
                .then(response => {
                    let updatedPets = response.data;

                    // Re-apply filters
                    if (petType !== 'all') {
                        updatedPets = updatedPets.filter(pet =>
                            pet.petType.toLowerCase() === petType.toLowerCase()
                        );
                    }

                    if (birthYear !== 'all') {
                        updatedPets = updatedPets.filter(pet => pet.birthYear === birthYear);
                    }


                    if (searchQuery && searchQuery.trim() !== '') {
                        updatedPets = filterBySearchQuery(updatedPets, searchQuery);
                    }

                    setPetsData(updatedPets);
                })
                .catch(error => {
                    console.error("Error refreshing pets after purchase:", error);
                });
        } catch (error) {
            console.error('Error during purchase:', error);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress size={60} sx={{ color: '#003366' }} />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ py: 8, textAlign: 'center' }}>
                <Typography variant="h6" color="error" gutterBottom>
                    {error}
                </Typography>
                <Typography variant="body1">
                    Please check your connection and try again.
                </Typography>
            </Box>
        );
    }

    if (petsData.length === 0) {
        return (
            <Box sx={{ py: 8, textAlign: 'center' }}>
                <Typography variant="h6">
                    {petType !== 'all'
                        ? `No ${petType}s available${searchQuery ? ' matching your search' : ''}.`
                        : searchQuery
                            ? "No pets match your search criteria."
                            : "No pets available at the moment."}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {searchQuery || petType !== 'all' || birthYear !== 'all'
                        ? "Try adjusting your filters or search terms."
                        : "Please check back later for new arrivals."}
                </Typography>
            </Box>
        );
    }

    return (
        <Grid container spacing={3} sx={{ p: 4 }}>
            {petsData.map((petDTO) => {
                // Get proper image URL or use placeholder
                const imageUrl = petDTO.imageUrl
                    ? getFullImageUrl(petDTO.imageUrl)
                    : `/images/${petDTO.petType.toLowerCase()}-placeholder.png`;

                // Map the API data to what PetCard expects
                const petCardProps: Pet = {
                    id: parseInt(petDTO.id),
                    name: petDTO.name,
                    breed: petDTO.breed,
                    price: parseFloat(petDTO.price),
                    birthYear: parseInt(petDTO.birthYear),
                    gender: petDTO.gender,
                    image: imageUrl,
                    imageUrl: imageUrl,
                    petType: petDTO.petType.toLowerCase(),
                };

                return (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={petDTO.id} sx={{ display: 'flex' }}>
                        <PetCardWithHoverImage
                            pet={petCardProps}
                            // Only pass onAdopt if this is admin view
                            onAdopt={isAdminView ? () => handleAdopt(petDTO) : undefined}
                            CardComponent={CardComponent}
                        />
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default PetList;
export type { PetListProps };