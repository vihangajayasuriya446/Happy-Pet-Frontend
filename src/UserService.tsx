import axios from 'axios';
import { UserDetails, UserAdoption } from './types';

const API_URL = 'http://localhost:8080';

export const fetchAllUsers = async (): Promise<UserDetails[]> => {
  try {
    const response = await axios.get<UserDetails[]>(`${API_URL}/api/v1/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

export const fetchUserById = async (id: number): Promise<UserDetails | null> => {
  try {
    const response = await axios.get<UserDetails>(`${API_URL}/api/v1/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with id ${id}:`, error);
    return null;
  }
};

export const createUser = async (user: UserDetails): Promise<UserDetails | null> => {
  try {
    const response = await axios.post<UserDetails>(`${API_URL}/api/v1/users/add`, user);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
};

export const updateUser = async (user: UserDetails): Promise<UserDetails | null> => {
  try {
    const response = await axios.put<UserDetails>(`${API_URL}/api/v1/users/update/${user.user_id}`, user);
    return response.data;
  } catch (error) {
    console.error(`Error updating user with id ${user.user_id}:`, error);
    return null;
  }
};

export const deleteUser = async (id: number): Promise<boolean> => {
  try {
    await axios.delete(`${API_URL}/api/v1/users/delete/${id}`);
    return true;
  } catch (error) {
    console.error(`Error deleting user with id ${id}:`, error);
    return false;
  }
};

// For user adoption history
export const fetchUserAdoptions = async (userId: number): Promise<UserAdoption[]> => {
  try {
    const response = await axios.get<UserAdoption[]>(`${API_URL}/api/v1/users/${userId}/adoptions`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching adoptions for user ${userId}:`, error);
    return [];
  }
};