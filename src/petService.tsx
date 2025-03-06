// src/services/petService.ts
import axios from 'axios';
import { Pet } from './types';

const API_URL = 'http://localhost:8080';

export const fetchAvailablePets = async (): Promise<Pet[]> => {
  try {
    const response = await axios.get<Pet[]>(`${API_URL}/api/pets/available`);
    return response.data;
  } catch (error) {
    console.error('Error fetching pets:', error);
    return [];
  }
};

export const fetchPetById = async (id: number): Promise<Pet | null> => {
  try {
    const response = await axios.get<Pet>(`${API_URL}/api/pets/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching pet with id ${id}:`, error);
    return null;
  }
};