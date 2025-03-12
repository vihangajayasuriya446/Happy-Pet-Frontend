// src/services/InquiryService.ts
import axios from 'axios';

// Updated UserInquiry interface to match the backend model
export interface UserInquiry {
    id?: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    message: string;
    petId?: number;
    pet?: PetDTO;
    submissionDate?: string;
    status?: 'NEW' | 'IN_PROGRESS' | 'RESOLVED';
}

// Interface for pet data
export interface PetDTO {
    id: number;
    name: string;
    petType: string;
    breed: string;
    price: number;
    birthYear: string;
    gender: string;
    imageUrl: string;
    purchased: boolean;
}

// Interface for pet inquiry in dashboard data
export interface PetInquiryDTO {
    petId: number;
    name: string;
    category: string;
    breed: string;
    price: number;
    age: string;
    imageUrl: string;
    inquiryDate: string;
    message: string;
    description: string;
}

// Interface for user with inquiries in dashboard data
export interface UserWithInquiriesDTO {
    userId: number;
    name: string;
    email: string;
    contactNo: string;
    address: string;
    message: string;
    registrationDate: string;
    status: string;
    interestedPets: PetInquiryDTO[];
}

const API_BASE_URL = 'http://localhost:8080/api/v1';

export class InquiryService {
    // Get all inquiries
    static async getAllInquiries(): Promise<UserInquiry[]> {
        try {
            const response = await axios.get<UserInquiry[]>(`${API_BASE_URL}/inquiries`);
            return response.data;
        } catch (error) {
            console.error('Error fetching inquiries:', error);
            throw error;
        }
    }

    // Get dashboard data for admin (users with their inquiries)
    static async getDashboardData(): Promise<UserWithInquiriesDTO[]> {
        try {
            const response = await axios.get<UserWithInquiriesDTO[]>(`${API_BASE_URL}/inquiries/admin/dashboard`);
            return response.data;
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw error;
        }
    }

    // Get inquiry by ID
    static async getInquiryById(id: number): Promise<UserInquiry> {
        try {
            const response = await axios.get<UserInquiry>(`${API_BASE_URL}/inquiries/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching inquiry ${id}:`, error);
            throw error;
        }
    }

    // Create new inquiry
    static async createInquiry(inquiry: Omit<UserInquiry, 'id'>): Promise<UserInquiry> {
        try {
            console.log('Sending inquiry data:', inquiry); // Log the data being sent
            const response = await axios.post<UserInquiry>(`${API_BASE_URL}/inquiries`, inquiry);
            console.log('Server response:', response.data); // Log the server response
            return response.data;
        } catch (error) {
            console.error('Error creating inquiry:', error);
            throw error;
        }
    }

    // Update existing inquiry
    static async updateInquiry(inquiry: UserInquiry): Promise<UserInquiry> {
        try {
            if (!inquiry.id) {
                throw new Error('Inquiry ID is required for updates');
            }
            const response = await axios.put<UserInquiry>(`${API_BASE_URL}/inquiries/${inquiry.id}`, inquiry);
            return response.data;
        } catch (error) {
            console.error(`Error updating inquiry ${inquiry.id}:`, error);
            throw error;
        }
    }

    // Delete inquiry
    static async deleteInquiry(id: number): Promise<void> {
        try {
            await axios.delete(`${API_BASE_URL}/inquiries/${id}`);
        } catch (error) {
            console.error(`Error deleting inquiry ${id}:`, error);
            throw error;
        }
    }

    // Update inquiry status
    static async updateInquiryStatus(id: number, status: 'NEW' | 'IN_PROGRESS' | 'RESOLVED'): Promise<UserInquiry> {
        try {
            const response = await axios.patch<UserInquiry>(
                `${API_BASE_URL}/inquiries/${id}/status`,
                { status }
            );
            return response.data;
        } catch (error) {
            console.error(`Error updating inquiry status for ${id}:`, error);
            throw error;
        }
    }

    // Get inquiries by email
    static async getInquiriesByEmail(email: string): Promise<UserInquiry[]> {
        try {
            const response = await axios.get<UserInquiry[]>(`${API_BASE_URL}/inquiries/email/${email}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching inquiries for email ${email}:`, error);
            throw error;
        }
    }

    // Get inquiries by pet ID
    static async getInquiriesByPetId(petId: number): Promise<UserInquiry[]> {
        try {
            const response = await axios.get<UserInquiry[]>(`${API_BASE_URL}/inquiries/pet/${petId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching inquiries for pet ID ${petId}:`, error);
            throw error;
        }
    }

    // Get the most recently created inquiry (for debugging)
    static async getLastCreatedInquiry(): Promise<UserInquiry> {
        try {
            const response = await axios.get<UserInquiry>(`${API_BASE_URL}/inquiries/debug/last`);
            return response.data;
        } catch (error) {
            console.error('Error fetching last created inquiry:', error);
            throw error;
        }
    }
}
