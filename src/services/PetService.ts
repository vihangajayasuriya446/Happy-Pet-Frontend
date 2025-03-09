import axios from 'axios';
import { PETS_API_URL } from '../constants';

// Interface matching your backend Pet model
export interface Pet {
    id?: string | number;
    name: string;
    petType: string;
    price: string;
    breed: string;
    birthYear: string;
    gender: string;
    imageUrl?: string | null;
    purchased?: boolean;
}

// Define a raw pet type for backend responses
export interface RawPetResponse {
    id: number;
    name: string;
    petType: string;
    price: number;
    breed: string;
    birthYear: string;
    gender: string;
    imageUrl: string | null;
    purchased: boolean;
}

// Helper function to normalize pet data from backend
const normalizePet = (pet: RawPetResponse): Pet => {
    return {
        id: pet.id?.toString(),
        name: pet.name || '',
        petType: pet.petType || '',
        price: pet.price?.toString() || '0',
        breed: pet.breed || '',
        birthYear: pet.birthYear || '',
        gender: pet.gender || '',
        imageUrl: pet.imageUrl || null,
        purchased: Boolean(pet.purchased)
    };
};

// Helper function to normalize array of pets
const normalizePets = (pets: RawPetResponse[]): Pet[] => {
    return pets.map(pet => normalizePet(pet));
};

export const petService = {
    getAllPets: async (): Promise<Pet[]> => {
        const response = await axios.get<RawPetResponse[]>(PETS_API_URL);
        return normalizePets(response.data);
    },

    getPetById: async (id: string | number): Promise<Pet> => {
        const response = await axios.get<RawPetResponse>(`${PETS_API_URL}/${id}`);
        return normalizePet(response.data);
    },

    addPet: async (petData: FormData): Promise<Pet> => {
        const response = await axios.post<RawPetResponse>(PETS_API_URL, petData);
        return normalizePet(response.data);
    },

    updatePet: async (id: string | number, petData: FormData): Promise<Pet> => {
        const response = await axios.put<RawPetResponse>(`${PETS_API_URL}/${id}`, petData);
        return normalizePet(response.data);
    },

    deletePet: async (id: string | number): Promise<void> => {
        await axios.delete(`${PETS_API_URL}/${id}`);
    },

    buyPet: async (id: string | number): Promise<Pet> => {
        const response = await axios.post<RawPetResponse>(`${PETS_API_URL}/${id}/buy`);
        return normalizePet(response.data);
    },

    // Helper function to convert Pet to FormData for API calls
    createPetFormData: (petData: Pet): FormData => {
        const formData = new FormData();

        if (petData.id) formData.append('id', petData.id.toString());
        formData.append('name', petData.name);
        formData.append('petType', petData.petType);
        formData.append('price', petData.price);
        formData.append('breed', petData.breed);
        formData.append('birthYear', petData.birthYear);
        formData.append('gender', petData.gender || '');
        if (petData.purchased !== undefined) formData.append('purchased', petData.purchased.toString());
        if (petData.imageUrl) formData.append('imageUrl', petData.imageUrl);

        return formData;
    },

    // Helper to handle file uploads
    addImageToPetForm: (formData: FormData, imageFile: File | null): FormData => {
        if (imageFile) {
            formData.append('image', imageFile);
        }
        return formData;
    },

    // Helper to get the full image URL
    getImageUrl: (imageUrl: string | null): string => {
        if (!imageUrl) return '/default-pet-image.jpg';
        if (imageUrl.startsWith('http') || imageUrl.startsWith('/')) return imageUrl;
        return `${PETS_API_URL}/images/${imageUrl}`;
    }
};
