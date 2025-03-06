// src/services/adoptionService.ts
import axios from 'axios';

const API_URL = 'http://localhost:8080';

export interface AdoptionRequest {
  userId: number;
  petId: number;
  userName: string;
  email: string;
  phone: string;
  address: string;
}

export const submitAdoptionRequest = async (adoptionRequest: AdoptionRequest): Promise<boolean> => {
  try {
    await axios.post(`${API_URL}/adoptions`, adoptionRequest);
    return true;
  } catch (error) {
    console.error('Error submitting adoption request:', error);
    return false;
  }
};