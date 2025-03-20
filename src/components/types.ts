export interface UserDetails {
    user_id?: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    message: string;
    pet_id?: string;
    submission_date?: string;
    status?: 'NEW' | 'IN_PROGRESS' | 'RESOLVED'; // Added status field
}

export interface Pet {
    id: number;
    name: string;
    petType: string;
    price: number;
    breed: string;
    birthYear: string;
    gender: string;
    imageUrl: string | null;
    purchased: boolean;
}

export interface PetFormData {
    id?: number;
    name: string;
    petType: string;
    price: string;
    breed: string;
    birthYear: string;
    gender: string;
    image?: File | null;
    imageUrl?: string | null;
    purchased?: boolean;
}

export interface CartItem {
    id: number;
    pet: Pet;
    quantity: number;
    subtotal: number;
}

export interface ApiResponse<T> {
    data: T;
    message?: string;
    status: string;
}

export interface CartTotalResponse {
    total: number;
    message?: string;
}

export interface CheckoutResponse {
    message: string;
    total: number;
    orderId?: number;
}

// Contact form specific interface
export interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    address: string;
    message: string;
    petId?: number; // Added petId field
    status?: 'NEW' | 'IN_PROGRESS' | 'RESOLVED'; // Added status field
}

// User inquiry interface for consistent typing
export interface UserInquiry {
    id?: number;
    userName: string;
    userEmail: string;
    userPhone: string;
    address: string;
    userMessage: string;
    petId?: number;
    status: 'NEW' | 'IN_PROGRESS' | 'RESOLVED'; // Status is required
    inquiryDate?: string;
    pet?: {
        id?: number;
        name?: string;
        category?: string;
        breed?: string;
        price?: number | string;
        birthYear?: string;
        gender?: string;
        imageUrl?: string;
    };
}
