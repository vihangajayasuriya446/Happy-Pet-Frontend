import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1/pets';

export interface Pet {
    id?: string;
    name: string;
    petType: string;
    price: string;
    breed: string;
    birthYear: string;
    imageUrl?: string;
    purchased?: boolean;
}

export const petService = {
    getAllPets: async (): Promise<Pet[]> => {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    },

    getPetById: async (id: string): Promise<Pet> => {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data;
    },

    addPet: async (petData: FormData): Promise<Pet> => {
        const response = await axios.post(API_BASE_URL, petData);
        return response.data;
    },

    updatePet: async (id: string, petData: FormData): Promise<Pet> => {
        const response = await axios.put(`${API_BASE_URL}/${id}`, petData);
        return response.data;
    },

    deletePet: async (id: string): Promise<void> => {
        await axios.delete(`${API_BASE_URL}/${id}`);
    },

    buyPet: async (id: string): Promise<Pet> => {
        const response = await axios.post(`${API_BASE_URL}/${id}/buy`);
        return response.data;
    }
};
