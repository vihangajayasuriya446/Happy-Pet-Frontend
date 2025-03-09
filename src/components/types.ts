export interface UserDetails {
    user_id: number;
    name: string;
    email: string;
    password?: string;
    phone?: string;
    address?: string;
    role: string;
    active: boolean;
    registered_date: string;
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
