import axios from 'axios';

export interface UserDetails {
    user_id: number;
    name: string;
    email: string;
    role: string;
    active: boolean;
    registered_date: string;
    password?: string;
    phone?: string;
    address?: string;
}


interface UserDTO {
    id: number;
    name: string;
}


const API_BASE_URL = 'http://localhost:8080/api/v1';

export class UserService {
    // Get all users
    static async getAllUsers(): Promise<UserDetails[]> {
        try {
            const response = await axios.get<UserDTO[]>(`${API_BASE_URL}/getusers`);
            // Map backend DTOs to frontend model
            return response.data.map(dto => this.mapToUserDetails(dto));
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }

    // Create new user
    static async createUser(user: Omit<UserDetails, 'user_id'>): Promise<UserDetails> {
        try {
            // Map from your frontend model to backend model
            const userDTO: UserDTO = {
                id: 0, // Backend will assign the actual ID
                name: user.name
            };

            const response = await axios.post<UserDTO>(`${API_BASE_URL}/adduser`, userDTO);
            return this.mapToUserDetails(response.data);
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    // Update existing user
    static async updateUser(user: UserDetails): Promise<UserDetails> {
        try {
            // Map from your frontend model to backend model
            const userDTO: UserDTO = {
                id: user.user_id,
                name: user.name
            };

            const response = await axios.put<UserDTO>(`${API_BASE_URL}/updateuser`, userDTO);
            return this.mapToUserDetails(response.data);
        } catch (error) {
            console.error(`Error updating user ${user.user_id}:`, error);
            throw error;
        }
    }

    // Delete user
    static async deleteUser(id: number): Promise<void> {
        try {
            await axios.delete(`${API_BASE_URL}/deleteuser/${id}`);
        } catch (error) {
            console.error(`Error deleting user ${id}:`, error);
            throw error;
        }
    }

    // Helper method to map backend DTO to frontend model
    private static mapToUserDetails(userDTO: UserDTO): UserDetails {
        return {
            user_id: userDTO.id,
            name: userDTO.name,
            email: '',
            role: 'USER',
            active: true,
            registered_date: new Date().toISOString().split('T')[0]
        };
    }
}