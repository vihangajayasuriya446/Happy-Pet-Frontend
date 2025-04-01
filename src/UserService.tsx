import axios from 'axios';
import { Adoption } from './types';

const API_URL = '';

// Fetch all adoption applications
export const fetchAllAdoptions = async (): Promise<Adoption[]> => {
  try {
    const response = await axios.get<any[]>(`${API_URL}/api/v1/adoptions`);
    
    // Map backend response to frontend Adoption interface
    return response.data.map(item => ({
      adoption_id: item.adoptionId || item.adoption_id,
      pet_id: item.petId || item.pet_id,
      user_id: item.userId || item.user_id,
      status: item.status,
      applied_at: item.applicationDate || item.application_date || new Date().toISOString(),
      user_name: item.userName || item.user_name,
      email: item.email,
      address: item.address,
      pet_name: item.pet_name,
      phone: item.phone
    }));
  } catch (error) {
    console.error('Error fetching adoption applications:', error);
    throw error;
  }
};

// Fetch a specific adoption application by ID
export const fetchAdoptionById = async (id: number): Promise<Adoption> => {
  try {
    const response = await axios.get<any>(`${API_URL}/api/v1/adoptions/${id}`);
    
    // Map backend response to frontend Adoption interface
    return {
      adoption_id: response.data.adoptionId || response.data.adoption_id,
      pet_id: response.data.petId || response.data.pet_id,
      user_id: response.data.userId || response.data.user_id,
      status: response.data.status,
      applied_at: response.data.applicationDate || response.data.application_date || new Date().toISOString(),
      user_name: response.data.userName || response.data.user_name,
      email: response.data.email,
      address: response.data.address,
      pet_name: response.data.pet_name,
      phone: response.data.phone
    };
  } catch (error) {
    console.error(`Error fetching adoption with id ${id}:`, error);
    throw error;
  }
};

// Update adoption status
export const updateAdoptionStatus = async (adoption: Adoption): Promise<Adoption> => {
  try {
    // Ensure adoption_id is a number
    const adoptionId = typeof adoption.adoption_id === 'string' ? parseInt(adoption.adoption_id as string) : adoption.adoption_id;
    
    // Create a payload with the necessary information for updating
    const updateData = {
      adoptionId: adoptionId,
      petId: adoption.pet_id,
      userId: adoption.user_id,
      status: adoption.status,
      userName: adoption.user_name,
      email: adoption.email,
      phone: adoption.phone,
      address: adoption.address,
      pet_name: adoption.pet_name
    };
    
    console.log('Sending adoption status update to server:', JSON.stringify(updateData));
    
    const response = await axios.put<any>(
      `${API_URL}/api/v1/adoptions/update/${adoptionId}`, 
      updateData,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    // Map backend response to frontend Adoption interface
    return {
      adoption_id: response.data.adoptionId || response.data.adoption_id,
      pet_id: response.data.petId || response.data.pet_id,
      user_id: response.data.userId || response.data.user_id,
      status: response.data.status,
      applied_at: response.data.applicationDate || response.data.application_date || adoption.applied_at,
      user_name: response.data.userName || response.data.user_name,
      email: response.data.email,
      address: response.data.address,
      pet_name: response.data.pet_name,
      phone: response.data.phone
    };
  } catch (error) {
    console.error(`Error updating adoption with id ${adoption.adoption_id}:`, error);
    throw error;
  }
};

// Delete an adoption application
export const deleteAdoption = async (id: number): Promise<boolean> => {
  try {
    // Ensure ID is a number
    const adoptionId = typeof id === 'string' ? parseInt(id as string) : id;
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
    const response = await axios.get<any[]>(`${API_URL}/api/v1/adoptions/pet/${petId}`);
    
    // Map backend response to frontend Adoption interface
    return response.data.map(item => ({
      adoption_id: item.adoptionId || item.adoption_id,
      pet_id: item.petId || item.pet_id,
      user_id: item.userId || item.user_id,
      status: item.status,
      applied_at: item.applicationDate || item.application_date || new Date().toISOString(),
      user_name: item.userName || item.user_name,
      email: item.email,
      address: item.address,
      pet_name: item.pet_name,
      phone: item.phone
    }));
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
    const response = await axios.post<any>(
      `${API_URL}/api/v1/adoptions/submit`, 
      adoptionData,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    // Map backend response to frontend Adoption interface
    return {
      adoption_id: response.data.adoptionId || response.data.adoption_id,
      pet_id: response.data.petId || response.data.pet_id,
      user_id: response.data.userId || response.data.user_id,
      status: response.data.status,
      applied_at: response.data.applicationDate || response.data.application_date || new Date().toISOString(),
      user_name: response.data.userName || response.data.user_name,
      email: response.data.email,
      address: response.data.address,
      pet_name: response.data.pet_name,
      phone: response.data.phone
    };
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