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