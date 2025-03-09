import axios from 'axios';
import { UserDetails, UserAdoption } from './types';

const API_URL = 'http://localhost:8080';

export const fetchAllUsers = async (): Promise<UserDetails[]> => {
  try {
    const response = await axios.get<UserDetails[]>(`${API_URL}/api/v1/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const fetchUserById = async (id: number): Promise<UserDetails> => {
  try {
    const response = await axios.get<UserDetails>(`${API_URL}/api/v1/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with id ${id}:`, error);
    throw error;
  }
};

export const createUser = async (user: UserDetails): Promise<UserDetails> => {
  try {
    // Remove user_id when creating a new user (let the backend assign it)
    const { ...userData } = user;
    const response = await axios.post<UserDetails>(`${API_URL}/api/v1/users/add`, userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const updateUser = async (user: UserDetails): Promise<UserDetails> => {
  try {
    // Ensure user_id is a number
    const userId = typeof user.user_id === 'string' ? parseInt(user.user_id) : user.user_id;
    
    // Create a clean copy of the user object to send to the server
    const userData: {
      user_id: number;
      name: string;
      email: string;
      phone: string;
      address: string;
      role: string;
      active: boolean;
      registered_date: string;
      password?: string;
    } = {
      user_id: userId,
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      address: user.address || '',
      role: user.role,
      active: user.active,
      registered_date: user.registered_date
    };
    
    // Only include password if it's provided
    if (user.password && user.password.trim() !== '') {
      userData['password'] = user.password;
    }
    
    console.log('Sending update to server:', JSON.stringify(userData));
    
    const response = await axios.put<UserDetails>(
      `${API_URL}/api/v1/users/update/${userId}`, 
      userData,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error(`Error updating user with id ${user.user_id}:`, error);
    throw error;
  }
};

export const deleteUser = async (id: number): Promise<boolean> => {
  try {
    // Ensure ID is a number
    const userId = typeof id === 'string' ? parseInt(id) : id;
    console.log(`Attempting to delete user with ID: ${userId}`);
    
    await axios.delete(`${API_URL}/api/v1/users/delete/${userId}`);
    return true;
  } catch (error) {
    console.error(`Error deleting user with id ${id}:`, error);
    throw error;
  }
};

// For user adoption history
export const fetchUserAdoptions = async (userId: number): Promise<UserAdoption[]> => {
  try {
    const response = await axios.get<UserAdoption[]>(`${API_URL}/api/v1/users/${userId}/adoptions`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching adoptions for user ${userId}:`, error);
    throw error;
  }
};