import React, { useState, useEffect } from "react";
import { Grid, CircularProgress, Box, Typography } from "@mui/material";
import PetCard, { Pet } from "./PetCard";
import axios from "axios";

//Interface for the API data only
interface PetDTO {
    id: string;
    name: string;
    petType: string;
    price: string;
    breed: string;
    birthYear: string;
    imageUrl?: string;
    purchased?: boolean;
}


interface PetListProps {
    searchQuery?: string;
    petType?: string;
    birthYear?: string;
}

const API_BASE_URL = 'http://localhost:8080';
const PETS_API_URL = `${API_BASE_URL}/api/v1/pets`;

// Custom PetCard wrapper with image hover effect
const PetCardWithHoverImage: React.FC<{
    pet: Pet;
    onAdopt: () => void;
}> = ({ pet, onAdopt }) => {
    return (
        <Box
            sx={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '8px',
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
            <PetCard
                name={pet.name}
                breed={pet.breed}
                price={pet.price}
                birthYear={pet.birthYear}
                image={pet.image}
                petType={pet.petType}
                onAdopt={onAdopt}
            />
        </Box>
    );
};

const PetList: React.FC<PetListProps> = ({
                                             searchQuery = '',
                                             petType = 'all',
                                             birthYear = 'all'
                                         }) => {
    // Store the full API data including IDs
    const [petsData, setPetsData] = useState<PetDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Helper function to get full image URL
    const getFullImageUrl = (imageUrl?: string) => {
        if (!imageUrl) return '';
        if (imageUrl.startsWith('http')) return imageUrl;
        return `${API_BASE_URL}${imageUrl}`;
    };

    useEffect(() => {
        setLoading(true);

        // First fetch all pets or filtered pets
        fetchPetsWithFilters()
            .then(pets => {
                if (searchQuery && searchQuery.trim() !== '') {
                    // If there's a search query, filter the results further
                    return filterBySearchQuery(pets, searchQuery);
                }
                return pets;
            })
            .then(filteredPets => {
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

    // Fetch pets with type and year filters applied
    const fetchPetsWithFilters = async (): Promise<PetDTO[]> => {
        try {
            // Start with base URL
            let url = PETS_API_URL;

            // If pet type is specified, use the type endpoint
            if (petType !== 'all') {
                url = `${PETS_API_URL}/type/${petType}`;
            }

            // Fetch pets
            const response = await axios.get<PetDTO[]>(url);
            let pets = response.data;

            // Filter by birth year if specified
            if (birthYear !== 'all') {
                pets = pets.filter(pet => pet.birthYear === birthYear);
            }

            return pets;
        } catch (err) {
            console.error("Error fetching filtered pets:", err);
            throw err;
        }
    };

    // Filter pets by search query - specifically for pet types (dog/cat)
    const filterBySearchQuery = (pets: PetDTO[], query: string): PetDTO[] => {
        const normalizedQuery = query.toLowerCase().trim();

        // If query is empty, return all pets
        if (!normalizedQuery) return pets;

        // Check if query is related to dogs
        const isDogQuery = normalizedQuery === 'dog' ||
            normalizedQuery === 'dogs' ||
            normalizedQuery.includes('dog');

        // Check if query is related to cats
        const isCatQuery = normalizedQuery === 'cat' ||
            normalizedQuery === 'cats' ||
            normalizedQuery.includes('cat');

        // If query doesn't match dog or cat, return no results
        if (!isDogQuery && !isCatQuery) return [];

        return pets.filter(pet => {
            const petTypeNormalized = pet.petType.toLowerCase();

            if (isDogQuery && petTypeNormalized === 'dog') {
                return true;
            }

            if (isCatQuery && petTypeNormalized === 'cat') {
                return true;
            }

            return false;
        });
    };

    const handleAdopt = async (petDTO: PetDTO) => {
        try {
            await axios.post(`${PETS_API_URL}/${petDTO.id}/buy`);
            console.log(`Purchased pet with ID: ${petDTO.id}`);

            // Refresh the pet list after purchase
            fetchPetsWithFilters()
                .then(pets => {
                    if (searchQuery) {
                        return filterBySearchQuery(pets, searchQuery);
                    }
                    return pets;
                })
                .then(filteredPets => {
                    setPetsData(filteredPets);
                });
        } catch (error) {
            console.error('Error during purchase:', error);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress size={60} sx={{ color: 'white' }} />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ py: 8, textAlign: 'center' }}>
                <Typography variant="h6" color="error" gutterBottom>
                    {error}
                </Typography>
                <Typography variant="body1" color="white">
                    Please check your connection and try again.
                </Typography>
            </Box>
        );
    }

    if (petsData.length === 0) {
        return (
            <Box sx={{ py: 8, textAlign: 'center' }}>
                <Typography variant="h6" color="white">
                    {searchQuery || petType !== 'all' || birthYear !== 'all'
                        ? "No pets match your search criteria."
                        : "No pets available at the moment."}
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

                console.log(`Pet ${petDTO.name} image URL: ${imageUrl}`);

                // Map the API data to what PetCard expects
                const petCardProps: Pet = {
                    name: petDTO.name,
                    breed: petDTO.breed,
                    price: parseFloat(petDTO.price),
                    birthYear: parseInt(petDTO.birthYear),
                    image: imageUrl,
                    petType: petDTO.petType,
                };

                return (
                    <Grid item xs={12} sm={6} md={3} key={petDTO.id}>
                        <PetCardWithHoverImage
                            pet={petCardProps}
                            onAdopt={() => handleAdopt(petDTO)}
                        />
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default PetList;
