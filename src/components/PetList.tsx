import React, { useState, useEffect } from "react";
import { Grid, CircularProgress, Box, Typography } from "@mui/material";
import DefaultPetCard from "./PetCard";
import axios from "axios";
import { Pet } from "./types";


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
    description?: string;
}

interface PetListProps {
    searchQuery?: string;
    petType?: string;
    birthYear?: string;
    PetCardComponent?: React.FC<{ pet: Pet; onAdopt?: () => void }>;
    isAdminView?: boolean;
    enableContactOwner?: boolean;
}

const API_BASE_URL = 'http://13.60.206.42:8080';
const PETS_API_URL = `${API_BASE_URL}/api/v1/pets`;

// Helper function to determine pet type with equal consideration for dog, cat, and bird
const determinePetType = (pet: PetDTO): string => {
    // First check if petType is already set
    if (pet.petType) {
        const petTypeLower = pet.petType.toLowerCase();

        // Handle the three main pet types
        if (petTypeLower === 'dog' || petTypeLower === 'dogs') return 'dog';
        if (petTypeLower === 'cat' || petTypeLower === 'cats') return 'cat';
        if (petTypeLower === 'bird' || petTypeLower === 'birds') return 'bird';

        // If it's not one of the main types but has a value, return it as is
        return petTypeLower;
    }

    // Check breed for indicators of each pet type
    if (pet.breed) {
        const breedLower = pet.breed.toLowerCase();

        // Dog breed indicators
        if (
            breedLower.includes('terrier') ||
            breedLower.includes('shepherd') ||
            breedLower.includes('retriever') ||
            breedLower.includes('bulldog') ||
            breedLower.includes('poodle') ||
            breedLower.includes('hound') ||
            breedLower.includes('spaniel') ||
            breedLower.includes('husky') ||
            breedLower.includes('collie') ||
            breedLower.includes('mastiff')
        ) {
            return 'dog';
        }

        // Cat breed indicators
        if (
            breedLower.includes('siamese') ||
            breedLower.includes('persian') ||
            breedLower.includes('bengal') ||
            breedLower.includes('maine coon') ||
            breedLower.includes('ragdoll') ||
            breedLower.includes('sphynx') ||
            breedLower.includes('british shorthair') ||
            breedLower.includes('abyssinian') ||
            breedLower.includes('burmese') ||
            breedLower.includes('tabby')
        ) {
            return 'cat';
        }

        // Bird breed/species indicators
        if (
            breedLower.includes('parrot') ||
            breedLower.includes('amazon') ||
            breedLower.includes('canary') ||
            breedLower.includes('finch') ||
            breedLower.includes('cockatiel') ||
            breedLower.includes('cockatoo') ||
            breedLower.includes('macaw') ||
            breedLower.includes('budgie') ||
            breedLower.includes('parakeet') ||
            breedLower.includes('lovebird')
        ) {
            return 'bird';
        }
    }

    // Check name for pet type indicators
    if (pet.name) {
        const nameLower = pet.name.toLowerCase();

        // Check for dog indicators in name
        if (
            nameLower.includes('dog') ||
            nameLower.includes('puppy') ||
            nameLower.includes('pup') ||
            nameLower.includes('fido') ||
            nameLower.includes('rover')
        ) {
            return 'dog';
        }

        // Check for cat indicators in name
        if (
            nameLower.includes('cat') ||
            nameLower.includes('kitty') ||
            nameLower.includes('kitten') ||
            nameLower.includes('meow') ||
            nameLower.includes('whiskers')
        ) {
            return 'cat';
        }

        // Check for bird indicators in name
        if (
            nameLower.includes('bird') ||
            nameLower.includes('parrot') ||
            nameLower.includes('tweet') ||
            nameLower.includes('wing') ||
            nameLower.includes('polly')
        ) {
            return 'bird';
        }
    }

    // If we have a description field, check that too
    if (pet.description) {
        const descLower = pet.description.toLowerCase();

        // Check for dog indicators in description
        if (
            descLower.includes('dog') ||
            descLower.includes('puppy') ||
            descLower.includes('bark') ||
            descLower.includes('fetch') ||
            descLower.includes('leash') ||
            descLower.includes('walk')
        ) {
            return 'dog';
        }

        // Check for cat indicators in description
        if (
            descLower.includes('cat') ||
            descLower.includes('kitten') ||
            descLower.includes('meow') ||
            descLower.includes('purr') ||
            descLower.includes('litter box') ||
            descLower.includes('scratch')
        ) {
            return 'cat';
        }

        // Check for bird indicators in description
        if (
            descLower.includes('bird') ||
            descLower.includes('parrot') ||
            descLower.includes('feather') ||
            descLower.includes('fly') ||
            descLower.includes('beak') ||
            descLower.includes('wings')
        ) {
            return 'bird';
        }
    }

    // If we still can't determine, default to the original petType or 'unknown'
    return pet.petType ? pet.petType.toLowerCase() : 'unknown';
};

// Custom PetCard wrapper with image hover effect
const PetCardWithHoverImage: React.FC<{
    pet: Pet;
    onAdopt?: () => void;
    CardComponent: React.FC<{ pet: Pet; onAdopt?: () => void }>;
    enableContactOwner?: boolean;
}> = ({ pet, onAdopt, CardComponent, enableContactOwner }) => {
    // Create a new pet object with the enableContactOwner flag
    const petWithContactFlag = {
        ...pet,
        enableContactOwner: enableContactOwner
    };

    return (
        <Box
            sx={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '8px',
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
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
            <CardComponent pet={petWithContactFlag} onAdopt={onAdopt} />
        </Box>
    );
};

const PetList: React.FC<PetListProps> = ({
                                             searchQuery = '',
                                             petType = 'all',
                                             birthYear = 'all',
                                             PetCardComponent,
                                             isAdminView = false,
                                             enableContactOwner = true // Default to true for backward compatibility
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

    // Helper function to get appropriate placeholder image based on pet type
    const getPlaceholderImage = (petType: string): string => {
        const normalizedType = petType.toLowerCase();
        if (normalizedType === 'dog') return '/images/dog-placeholder.png';
        if (normalizedType === 'cat') return '/images/cat-placeholder.png';
        if (normalizedType === 'bird') return '/images/bird-placeholder.png';
        return '/images/pet-placeholder.png'; // Generic fallback
    };

    useEffect(() => {
        setLoading(true);
        console.log("Fetching pets with filters:", { petType, birthYear, searchQuery });

        // Fetch all pets first
        axios.get<PetDTO[]>(PETS_API_URL)
            .then(response => {
                let filteredPets = response.data.filter(pet => !pet.purchased);
                console.log(`Fetched ${filteredPets.length} total pets`);

                // Apply pet type filter if not 'all'
                if (petType !== 'all') {
                    filteredPets = filteredPets.filter(pet => {
                        // Use our determinePetType function to check if it's the right type
                        const detectedPetType = determinePetType(pet);
                        return detectedPetType === petType.toLowerCase();
                    });
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
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching pets:", err);
                setError("Failed to load pets. Please try again later.");
                setLoading(false);
            });
    }, [searchQuery, petType, birthYear]);

    // Enhanced search function that checks name, breed, pet type, and gender
    const filterBySearchQuery = (pets: PetDTO[], query: string): PetDTO[] => {
        const normalizedQuery = query.toLowerCase().trim();

        // If query is empty, return all pets
        if (!normalizedQuery) return pets;

        return pets.filter(pet => {
            // Determine the pet type for consistent searching
            const detectedPetType = determinePetType(pet);

            // Check if any of the pet's properties match the search query
            return (
                pet.name.toLowerCase().includes(normalizedQuery) ||
                pet.breed.toLowerCase().includes(normalizedQuery) ||
                pet.petType.toLowerCase().includes(normalizedQuery) ||
                (pet.gender && pet.gender.toLowerCase().includes(normalizedQuery)) ||
                (pet.description && pet.description.toLowerCase().includes(normalizedQuery)) ||

                // Check for dog-related terms
                (detectedPetType === 'dog' && (
                    normalizedQuery === 'dog' ||
                    normalizedQuery === 'dogs' ||
                    normalizedQuery.includes('dog') ||
                    normalizedQuery.includes('puppy') ||
                    normalizedQuery.includes('bark') ||
                    normalizedQuery.includes('fetch')
                )) ||

                // Check for cat-related terms
                (detectedPetType === 'cat' && (
                    normalizedQuery === 'cat' ||
                    normalizedQuery === 'cats' ||
                    normalizedQuery.includes('cat') ||
                    normalizedQuery.includes('kitten') ||
                    normalizedQuery.includes('meow') ||
                    normalizedQuery.includes('purr')
                )) ||

                // Check for bird-related terms
                (detectedPetType === 'bird' && (
                    normalizedQuery === 'bird' ||
                    normalizedQuery === 'birds' ||
                    normalizedQuery.includes('bird') ||
                    normalizedQuery.includes('parrot') ||
                    normalizedQuery.includes('feather') ||
                    normalizedQuery.includes('tweet') ||
                    normalizedQuery.includes('wing')
                )) ||

                // Keep gender-related terms in search
                (pet.gender && pet.gender.toLowerCase() === 'male' && (
                    normalizedQuery === 'male' ||
                    normalizedQuery === 'boy' ||
                    normalizedQuery.includes('male')
                )) ||
                (pet.gender && pet.gender.toLowerCase() === 'female' && (
                    normalizedQuery === 'female' ||
                    normalizedQuery === 'girl' ||
                    normalizedQuery.includes('female')
                ))
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
                        updatedPets = updatedPets.filter(pet => {
                            // Use our determinePetType function for filtering
                            const detectedPetType = determinePetType(pet);
                            return detectedPetType === petType.toLowerCase();
                        });
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
        <Grid container spacing={3} sx={{ p: 3 }}>
            {petsData.map((petDTO) => {
                // Determine the pet type using our helper function
                const detectedPetType = determinePetType(petDTO);

                // Get proper image URL or use placeholder based on detected type
                const imageUrl = petDTO.imageUrl
                    ? getFullImageUrl(petDTO.imageUrl)
                    : getPlaceholderImage(detectedPetType);

                // Calculate age and format it to display "years" instead of just "y"
                const currentYear = new Date().getFullYear();
                const birthYear = parseInt(petDTO.birthYear);
                const age = currentYear - birthYear;
                const ageDisplay = `${age} ${age === 1 ? 'year' : 'years'}`;

                // Map the API data to what PetCard expects
                const petCardProps: Pet = {
                    id: parseInt(petDTO.id),
                    name: petDTO.name,
                    breed: petDTO.breed,
                    price: parseFloat(petDTO.price),
                    birthYear: petDTO.birthYear, // Keep as string
                    gender: petDTO.gender,
                    image: imageUrl,
                    imageUrl: imageUrl,
                    petType: detectedPetType,
                    age: ageDisplay, // Add the formatted age string
                    purchased: petDTO.purchased || false, // Add the missing purchased property
                };

                return (
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        key={petDTO.id}
                        sx={{
                            display: 'flex',
                        }}
                    >
                        <PetCardWithHoverImage
                            pet={petCardProps}
                            // Only pass onAdopt if this is admin view
                            onAdopt={isAdminView ? () => handleAdopt(petDTO) : undefined}
                            CardComponent={CardComponent}
                            enableContactOwner={enableContactOwner}
                        />
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default PetList;
export type { PetListProps };
