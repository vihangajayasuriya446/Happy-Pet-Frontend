import axios from 'axios';
import { Adoption } from './types';

const API_URL = 'http://localhost:8080';

// Fetch all adoption applications
export const fetchAllAdoptions = async (): Promise<Adoption[]> => {
  try {
    const response = await axios.get<Adoption[]>(`${API_URL}/api/v1/adoptions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching adoption applications:', error);
    throw error;
  }
};

// Fetch a specific adoption application by ID
export const fetchAdoptionById = async (id: number): Promise<Adoption> => {
  try {
    const response = await axios.get<Adoption>(`${API_URL}/api/v1/adoptions/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching adoption with id ${id}:`, error);
    throw error;
  }
};

// Update adoption status
export const updateAdoptionStatus = async (adoption: Adoption): Promise<Adoption> => {
  try {
    // Ensure adoption_id is a number
    const adoptionId = typeof adoption.adoption_id === 'string' ? parseInt(adoption.adoption_id) : adoption.adoption_id;
    
    // Create a payload with just the necessary information for updating status
    const updateData = {
      adoption_id: adoptionId,
      status: adoption.status
    };
    
    console.log('Sending adoption status update to server:', JSON.stringify(updateData));
    
    const response = await axios.put<Adoption>(
      `${API_URL}/api/v1/adoptions/update/${adoptionId}`, 
      updateData,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error(`Error updating adoption with id ${adoption.adoption_id}:`, error);
    throw error;
  }
};

// Delete an adoption application
export const deleteAdoption = async (id: number): Promise<boolean> => {
  try {
    // Ensure ID is a number
    const adoptionId = typeof id === 'string' ? parseInt(id) : id;
    console.log(`Attempting to delete adoption with ID: ${adoptionId}`);
    
    await axios.delete(`${API_URL}/api/v1/adoptions/delete/${adoptionId}`);
    return true;
  } catch (error) {
    console.error(`Error deleting adoption with id ${id}:`, error);
    throw error;
  }
};

// Fetch adoptions for a specific pet
export const fetchAdoptionsByPetId = async (petId: number): Promise<Adoption[]> => {
  try {
    const response = await axios.get<Adoption[]>(`${API_URL}/api/v1/adoptions/pet/${petId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching adoptions for pet ${petId}:`, error);
    throw error;
  }
};

// Submit a new adoption application (used by the adoption form)
export const submitAdoption = async (adoptionData: {
  petId: number;
  userId?: number;
  userName: string;
  email: string;
  phone: string;
  address: string;
}): Promise<Adoption> => {
  try {
    const response = await axios.post<Adoption>(
      `${API_URL}/api/v1/adoptions/submit`, 
      adoptionData,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error submitting adoption application:', error);
    throw error;
  }
};

export default {
  fetchAllAdoptions,
  fetchAdoptionById,
  updateAdoptionStatus,
  deleteAdoption,
  fetchAdoptionsByPetId,
  submitAdoption
};