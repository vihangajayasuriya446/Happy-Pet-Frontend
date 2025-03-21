import axios from 'axios';
import { INQUIRY_API_URL } from '../constants';

// Define AxiosError interface without any
interface AxiosError<T = unknown> {
    isAxiosError: boolean;
    config: Record<string, unknown>;
    code?: string;
    request?: unknown;
    response?: {
        data: T;
        status: number;
        headers: Record<string, unknown>;
        config: Record<string, unknown>;
    };
    message?: string;
}

// Updated UserInquiry interface to match the UserDetailsForm component
export interface UserInquiry {
    id?: number;
    userName: string;
    userEmail: string;
    userPhone: string;
    address: string;
    userMessage: string;
    petId?: number;
    petName?: string;
    petType?: string;
    petBreed?: string;
    inquiryDate?: string;
    status?: 'NEW' | 'IN_PROGRESS' | 'RESOLVED';
}

// Add this interface for general contact inquiries
export interface ContactInquiry {
    id?: number;
    name: string;
    email: string;
    phoneNumber: string;
    address?: string;
    message: string;
    petId?: number;
    petType?: string;
    status?: 'NEW' | 'IN_PROGRESS' | 'RESOLVED';
    createdAt?: string;
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
    price?: number;
    age?: string;
    imageUrl?: string;
    inquiryDate: string;
    message: string;
    description?: string;
    status?: string;
}

// Interface for user with inquiries in dashboard data
export interface UserWithInquiriesDTO {
    userId: number;
    name: string;
    email: string;
    contactNo: string;
    address: string;
    message?: string;
    registrationDate: string;
    status: string;
    interestedPets: PetInquiryDTO[];
}

// Interface for the backend API request format
interface BackendInquiryRequest {
    id?: number;
    userName: string;
    userEmail: string;
    userPhone: string;
    address: string;
    userMessage: string;
    petId?: number;
    petName?: string;
    petType?: string;
    petBreed?: string;
    status?: string;
    inquiryDate?: string;
}

// Interface for general contact request format
interface BackendContactRequest {
    name: string;
    email: string;
    phoneNumber: string;
    address?: string;
    message: string;
    petId?: number;
    petType?: string;
    status?: string;
}

// Updated to match your backend controller path exactly
const API_BASE_URL = INQUIRY_API_URL;

// Helper function to derive pet type from breed
function derivePetTypeFromBreed(breed: string): string {
    if (!breed) return 'PET';

    const breedLower = breed.toLowerCase();

    // Check for common dog breeds/terms
    if (breedLower.includes('dog') ||
        breedLower.includes('puppy') ||
        breedLower.includes('retriever') ||
        breedLower.includes('shepherd') ||
        breedLower.includes('terrier') ||
        breedLower.includes('bulldog') ||
        breedLower.includes('poodle') ||
        breedLower.includes('labrador')) {
        return 'DOG';
    }

    // Check for common cat breeds/terms
    if (breedLower.includes('cat') ||
        breedLower.includes('kitten') ||
        breedLower.includes('persian') ||
        breedLower.includes('siamese') ||
        breedLower.includes('bengal') ||
        breedLower.includes('ragdoll') ||
        breedLower.includes('maine coon')) {
        return 'CAT';
    }


    // Default to the first word of the breed as a fallback
    const firstWord = breed.split(' ')[0];
    return firstWord || 'PET';
}

// Type guard to check if an error is an AxiosError
function isAxiosError(error: unknown): error is AxiosError {
    return error !== null &&
        typeof error === 'object' &&
        'isAxiosError' in error &&
        (error as {isAxiosError?: boolean}).isAxiosError === true;
}

export class InquiryService {
    // Get all inquiries
    static async getAllInquiries(): Promise<UserInquiry[]> {
        try {
            const response = await axios.get<UserInquiry[]>(`${API_BASE_URL}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching inquiries:', error);
            throw error;
        }
    }

    // Get dashboard data for admin (users with their inquiries)
    static async getDashboardData(queryParams?: string): Promise<UserWithInquiriesDTO[]> {
        try {
            console.log('Calling dashboard API endpoint...');
            let url = `${API_BASE_URL}/admin/dashboard`;

            // Add query parameters if provided
            if (queryParams) {
                url += queryParams;
            } else {
                // Add cache-busting parameter by default to prevent stale data
                url += `?t=${new Date().getTime()}`;
            }

            console.log('API URL:', url);

            const response = await axios.get<UserWithInquiriesDTO[]>(url);
            console.log('Dashboard API response status:', response.status);
            console.log('Dashboard API response headers:', response.headers);
            console.log('Dashboard API response data type:', typeof response.data);

            if (Array.isArray(response.data)) {
                console.log('Response is an array with length:', response.data.length);
                if (response.data.length > 0) {
                    console.log('First item sample:', JSON.stringify(response.data[0]).substring(0, 200) + '...');
                }
            } else {
                console.error('Response is not an array:', response.data);
            }

            if (!response.data) {
                console.error('Empty response data received');
                return [];
            }

            return response.data;
        } catch (error) {
            console.error('Error fetching dashboard data:', error);

            // More detailed error logging
            if (isAxiosError(error)) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.error('Response data:', error.response.data);
                    console.error('Response status:', error.response.status);
                    console.error('Response headers:', error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.error('No response received:', error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.error('Error message:', error.message);
                }
                console.error('Error config:', error.config);
            }

            throw error;
        }
    }

    // Get inquiry by ID
    static async getInquiryById(id: number): Promise<UserInquiry> {
        try {
            const response = await axios.get<UserInquiry>(`${API_BASE_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching inquiry ${id}:`, error);
            throw error;
        }
    }

    // Create new inquiry with improved error handling and logging
    static async createInquiry(inquiry: Omit<UserInquiry, 'id'>): Promise<UserInquiry> {
        try {
            // Ensure the status is properly set for new inquiries
            const status = inquiry.status || 'NEW';

            // Create a request object with the same structure as expected by the backend
            const backendInquiry: BackendInquiryRequest = {
                userName: inquiry.userName,
                userEmail: inquiry.userEmail,
                userPhone: inquiry.userPhone,
                address: inquiry.address,
                userMessage: inquiry.userMessage,
                petId: inquiry.petId,
                petName: inquiry.petName,
                petType: inquiry.petType,
                petBreed: inquiry.petBreed,
                status: status,  // Explicitly set status
                inquiryDate: new Date().toISOString() // Set current date for new inquiries
            };

            console.log('Sending inquiry data to backend:', JSON.stringify(backendInquiry)); // Log the data being sent

            // Check if we have all required pet information
            if (backendInquiry.petId && (!backendInquiry.petName || !backendInquiry.petType || !backendInquiry.petBreed)) {
                console.warn('Missing pet details. Attempting to retrieve from localStorage...');

                // Try to get pet details from localStorage
                const petDataString = localStorage.getItem('selectedPet');
                if (petDataString) {
                    try {
                        const petDetails = JSON.parse(petDataString);
                        backendInquiry.petName = backendInquiry.petName || petDetails.name;

                        // Use the breed to derive a pet type if not already set
                        if (!backendInquiry.petType) {
                            // Try to extract a type from the breed or use the petType from localStorage
                            backendInquiry.petType = petDetails.petType || derivePetTypeFromBreed(petDetails.breed);
                        }

                        backendInquiry.petBreed = backendInquiry.petBreed || petDetails.breed;
                        console.log('Updated with pet details from localStorage:', JSON.stringify(backendInquiry));
                    } catch (error) {
                        console.error('Error parsing pet data from localStorage:', error);
                    }
                }
            }

            // Final check to ensure petType is set
            if (backendInquiry.petId && !backendInquiry.petType && backendInquiry.petBreed) {
                // If we still don't have a pet type but we have a breed, derive it from the breed
                backendInquiry.petType = derivePetTypeFromBreed(backendInquiry.petBreed);
                console.log('Derived pet type from breed:', backendInquiry.petType);
            }

            // If we still don't have a pet type, set a default
            if (backendInquiry.petId && !backendInquiry.petType) {
                backendInquiry.petType = 'Pet';
                console.log('Using default pet type:', backendInquiry.petType);
            }

            console.log('Final inquiry data being sent to backend:', JSON.stringify(backendInquiry));

            const response = await axios.post<UserInquiry>(`${API_BASE_URL}/create`, backendInquiry);
            console.log('Server response:', response.data); // Log the server response

            // After successful creation, refresh the dashboard data cache
            setTimeout(() => this.refreshDashboardData().catch(e => console.warn('Background refresh failed:', e)), 1000);

            return response.data;
        } catch (error) {
            console.error('Error creating inquiry:', error);
            if (isAxiosError(error) && error.response) {
                console.error('Server response:', error.response.data);
                throw new Error(`Server error: ${JSON.stringify(error.response.data)}`);
            }
            throw error;
        }
    }

    // Create general contact inquiry
    static async createContactInquiry(contactData: Omit<ContactInquiry, 'id' | 'status' | 'createdAt'>): Promise<ContactInquiry> {
        try {
            console.log('Sending contact inquiry data to backend:', JSON.stringify(contactData));

            // Create a request object with the same structure as expected by the backend
            const backendContactInquiry: BackendContactRequest = {
                name: contactData.name,
                email: contactData.email,
                phoneNumber: contactData.phoneNumber,
                address: contactData.address || '',
                message: contactData.message,
                petId: contactData.petId, // Include petId if available
                petType: contactData.petType, // Include petType if available
                status: 'NEW', // Default status for new contact inquiries
            };

            const response = await axios.post<ContactInquiry>(`${API_BASE_URL}/contact`, backendContactInquiry);
            console.log('Server response for contact inquiry:', response.data);

            // After successful creation, refresh the dashboard data cache
            setTimeout(() => this.refreshDashboardData().catch(e => console.warn('Background refresh failed:', e)), 1000);

            return response.data;
        } catch (error) {
            console.error('Error creating contact inquiry:', error);
            if (isAxiosError(error) && error.response) {
                console.error('Server response:', error.response.data);
                throw new Error(`Server error: ${JSON.stringify(error.response.data)}`);
            }
            throw error;
        }
    }

    // Get all general contact inquiries
    static async getAllContactInquiries(): Promise<ContactInquiry[]> {
        try {
            const response = await axios.get<ContactInquiry[]>(`${API_BASE_URL}/contact`);
            return response.data;
        } catch (error) {
            console.error('Error fetching contact inquiries:', error);
            throw error;
        }
    }

    // Update contact inquiry status
    static async updateContactInquiryStatus(id: number, status: 'NEW' | 'IN_PROGRESS' | 'RESOLVED'): Promise<ContactInquiry> {
        try {
            const response = await axios.patch<ContactInquiry>(
                `${API_BASE_URL}/contact/${id}/status`,
                { status }
            );
            return response.data;
        } catch (error) {
            console.error(`Error updating contact inquiry status for ${id}:`, error);
            throw error;
        }
    }

    // Update existing inquiry with improved error handling
    static async updateInquiry(inquiry: UserInquiry): Promise<UserInquiry> {
        try {
            if (!inquiry.id) {
                throw new Error('Inquiry ID is required for updates');
            }

            // Create a request object with the same structure as expected by the backend
            const backendInquiry: BackendInquiryRequest = {
                id: inquiry.id,
                userName: inquiry.userName,
                userEmail: inquiry.userEmail,
                userPhone: inquiry.userPhone,
                address: inquiry.address,
                userMessage: inquiry.userMessage,
                petId: inquiry.petId,
                petName: inquiry.petName,
                petType: inquiry.petType,
                petBreed: inquiry.petBreed,
                status: inquiry.status // Include status in updates
            };

            // If petType is missing but we have petBreed, derive it
            if (backendInquiry.petId && !backendInquiry.petType && backendInquiry.petBreed) {
                backendInquiry.petType = derivePetTypeFromBreed(backendInquiry.petBreed);
                console.log('Derived pet type from breed for update:', backendInquiry.petType);
            }

            console.log('Updating inquiry data:', JSON.stringify(backendInquiry)); // Log the data being sent
            const response = await axios.put<UserInquiry>(`${API_BASE_URL}/${inquiry.id}`, backendInquiry);
            console.log('Update response:', response.data); // Log the server response

            // After successful update, refresh the dashboard data cache
            setTimeout(() => this.refreshDashboardData().catch(e => console.warn('Background refresh failed:', e)), 1000);

            return response.data;
        } catch (error) {
            console.error(`Error updating inquiry ${inquiry.id}:`, error);
            if (isAxiosError(error) && error.response) {
                console.error('Server response:', error.response.data);
                throw new Error(`Server error: ${JSON.stringify(error.response.data)}`);
            }
            throw error;
        }
    }

    // Delete inquiry
    static async deleteInquiry(id: number): Promise<void> {
        try {
            await axios.delete(`${API_BASE_URL}/${id}`);

            // After successful deletion, refresh the dashboard data cache
            setTimeout(() => this.refreshDashboardData().catch(e => console.warn('Background refresh failed:', e)), 1000);
        } catch (error) {
            console.error(`Error deleting inquiry ${id}:`, error);
            throw error;
        }
    }

    // Update inquiry status - UPDATED VERSION
    static async updateInquiryStatus(id: number, status: 'NEW' | 'IN_PROGRESS' | 'RESOLVED'): Promise<UserInquiry> {
        try {
            console.log(`Sending PATCH request to update inquiry ${id} status to ${status}`);

            // IMPORTANT: The backend expects exact enum values that match PetInquiry.InquiryStatus
            // Make sure we're sending the status in the exact format expected by the backend
            const requestBody = { status: status };
            console.log('Request body:', requestBody);

            const response = await axios.patch<UserInquiry>(
                `${API_BASE_URL}/${id}/status`,
                requestBody
            );

            console.log(`Status update successful. Response status: ${response.status}`);
            console.log('Response data:', response.data);

            // After successful status update, refresh the dashboard data cache
            setTimeout(() => this.refreshDashboardData().catch(e => console.warn('Background refresh failed:', e)), 1000);

            return response.data;
        } catch (error) {
            console.error(`Error updating inquiry status for ${id}:`, error);

            if (isAxiosError(error)) {
                if (error.response) {
                    console.error(`Server response: ${error.response.status}`);
                    console.error('Response data:', error.response.data);

                    // Check if the error is related to invalid enum value
                    const errorData = error.response.data;
                    if (typeof errorData === 'string' && errorData.includes('IllegalArgumentException')) {
                        console.error('Invalid status value. The backend expects NEW, IN_PROGRESS, or RESOLVED exactly.');

                        // Try with a different case format as a fallback
                        try {
                            console.warn(`Attempting with alternative status format...`);
                            // Try with the exact enum format from the backend
                            const response = await axios.patch<UserInquiry>(
                                `${API_BASE_URL}/${id}/status`,
                                { status: status.toUpperCase() }
                            );
                            console.log(`Alternative format successful:`, response.data);

                            // After successful status update with alternative format, refresh the dashboard data cache
                            setTimeout(() => this.refreshDashboardData().catch(e => console.warn('Background refresh failed:', e)), 1000);

                            return response.data;
                        } catch (altError) {
                            console.error(`Alternative format also failed:`, altError);
                        }
                    }
                } else if (error.request) {
                    console.error('No response received:', error.request);
                } else {
                    console.error('Error message:', error.message);
                }
            }

            throw error;
        }
    }

    // Get inquiries by email
    static async getInquiriesByEmail(email: string): Promise<UserInquiry[]> {
        try {
            const response = await axios.get<UserInquiry[]>(`${API_BASE_URL}/email/${email}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching inquiries for email ${email}:`, error);
            throw error;
        }
    }

    // Get inquiries by pet ID
    static async getInquiriesByPetId(petId: number): Promise<UserInquiry[]> {
        try {
            const response = await axios.get<UserInquiry[]>(`${API_BASE_URL}/pet/${petId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching inquiries for pet ID ${petId}:`, error);
            throw error;
        }
    }

    // Find inquiry ID by user ID and pet ID - UPDATED VERSION
    static async findInquiryId(userId: number, petId: number): Promise<number | null> {
        try {
            console.log(`Finding inquiry ID for userId=${userId}, petId=${petId}`);

            // First try: Get inquiries by pet ID to find the actual inquiry ID
            try {
                const inquiriesByPet = await this.getInquiriesByPetId(petId);
                console.log(`Retrieved ${inquiriesByPet.length} inquiries for pet ID ${petId}`);

                if (inquiriesByPet.length > 0) {
                    // If we have just one inquiry for this pet, use it
                    if (inquiriesByPet.length === 1 && inquiriesByPet[0].id) {
                        console.log(`Found single inquiry ID: ${inquiriesByPet[0].id}`);
                        return inquiriesByPet[0].id;
                    }

                    // Get dashboard data to find the user's email
                    const userInquiries = await this.getDashboardData();
                    const user = userInquiries.find(u => u.userId === userId);

                    if (user) {
                        // Find the inquiry that matches this user's email
                        const matchingInquiry = inquiriesByPet.find(i => i.userEmail === user.email);

                        if (matchingInquiry && matchingInquiry.id) {
                            console.log(`Found exact inquiry ID: ${matchingInquiry.id}`);
                            return matchingInquiry.id;
                        }
                    }
                }
            } catch (error) {
                console.warn(`Error getting inquiries by pet ID: ${error}`);
                // Continue to fallback method
            }

            // Second try: Use dashboard data
            const userInquiries = await this.getDashboardData();
            console.log(`Retrieved ${userInquiries.length} users from dashboard data`);

            // Find the user by userId
            const user = userInquiries.find(u => u.userId === userId);

            if (user) {
                console.log(`Found user ${user.name} (ID: ${user.userId}) with ${user.interestedPets.length} inquiries`);

                // Find the specific pet inquiry for this user
                const petInquiry = user.interestedPets.find(p => p.petId === petId);

                if (petInquiry) {
                    console.log(`Found matching pet inquiry for pet ID ${petId}`);

                    // Try to get all inquiries to find the ID
                    try {
                        const allInquiries = await this.getAllInquiries();
                        // Find inquiry that matches both pet ID and user email
                        const matchingInquiry = allInquiries.find(
                            i => i.petId === petId && i.userEmail === user.email
                        );

                        if (matchingInquiry && matchingInquiry.id) {
                            console.log(`Found inquiry ID from all inquiries: ${matchingInquiry.id}`);
                            return matchingInquiry.id;
                        }
                    } catch (error) {
                        console.warn(`Error getting all inquiries: ${error}`);
                    }

                    // Last resort: use petId as a fallback
                    console.warn(`Using petId (${petId}) as fallback for inquiry ID`);
                    return petId;
                } else {
                    console.error(`No pet inquiry found for pet ID ${petId} for this user`);
                }
            } else {
                console.error(`User with ID ${userId} not found in dashboard data`);
            }

            return null;
        } catch (error) {
            console.error(`Error finding inquiry ID:`, error);
            return null;
        }
    }

    // Update pet inquiry status in the dashboard data - UPDATED VERSION
    static async updatePetInquiryStatus(
        userId: number,
        petId: number,
        newStatus: 'NEW' | 'IN_PROGRESS' | 'RESOLVED'
    ): Promise<boolean> {
        try {
            console.log(`Attempting to update status for user=${userId}, pet=${petId} to ${newStatus}`);

            // Find the actual inquiry ID
            const inquiryId = await this.findInquiryId(userId, petId);

            if (!inquiryId) {
                console.error(`Could not find inquiry ID for user ${userId} and pet ${petId}`);

                // Fallback: Try using petId directly as the inquiry ID
                try {
                    console.warn(`Attempting fallback: Using petId (${petId}) directly as inquiry ID`);
                    await this.updateInquiryStatus(petId, newStatus);
                    console.log(`Fallback successful: Updated status using petId as inquiry ID`);
                    return true;
                } catch (fallbackError) {
                    console.error(`Fallback failed:`, fallbackError);
                    return false;
                }
            }

            // Update the status using the found inquiry ID
            console.log(`Updating status for inquiry ID ${inquiryId} to ${newStatus}`);
            await this.updateInquiryStatus(inquiryId, newStatus);
            console.log(`Status successfully updated for inquiry ID ${inquiryId}`);
            return true;
        } catch (error) {
            console.error(`Error updating pet inquiry status:`, error);

            // Additional error details for debugging
            if (isAxiosError(error) && error.response) {
                console.error(`Server response: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
            }

            return false;
        }
    }

    // Force refresh of dashboard data
    static async refreshDashboardData(): Promise<UserWithInquiriesDTO[]> {
        console.log('Forcing refresh of dashboard data...');
        try {
            const url = `${API_BASE_URL}/admin/dashboard`;
            // Add cache-busting query parameter
            const cacheBuster = `?t=${new Date().getTime()}`;
            console.log(`Calling dashboard API with cache buster: ${url}${cacheBuster}`);

            const response = await axios.get<UserWithInquiriesDTO[]>(`${url}${cacheBuster}`);
            console.log(`Dashboard refresh successful. Got ${response.data.length} users.`);
            return response.data;
        } catch (error) {
            console.error('Error refreshing dashboard data:', error);
            throw error;
        }
    }

    // Submit a pet inquiry form - specifically for the contact-form endpoint
    static async submitPetInquiryForm(formData: {
        name: string;
        email: string;
        contactNo: string;
        address: string;
        message: string;
        petId: number | string;
    }): Promise<unknown> {
        try {
            console.log('Submitting pet inquiry form to contact-form endpoint:', formData);

            // Make sure petId is correctly formatted as a number
            const petId = typeof formData.petId === 'string'
                ? parseInt(formData.petId, 10)
                : formData.petId;

            // Format data for the contact-form endpoint
            const requestData = {
                name: formData.name,
                email: formData.email,
                contactNo: formData.contactNo,
                address: formData.address || '',
                message: formData.message,
                petId: petId
            };

            // Call the specific contact-form endpoint
            const response = await axios.post(`${API_BASE_URL}/contact-form`, requestData);
            console.log('Pet inquiry form submission response:', response.data);

            // After successful submission, refresh the dashboard data cache
            setTimeout(() => this.refreshDashboardData().catch(e => console.warn('Background refresh failed:', e)), 1000);

            return response.data;
        } catch (error) {
            console.error('Error submitting pet inquiry form:', error);
            if (isAxiosError(error) && error.response) {
                console.error('Server response:', error.response.data);
                throw new Error(`Server error: ${JSON.stringify(error.response.data)}`);
            }
            throw error;
        }
    }
}
