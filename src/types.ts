export interface Pet {
  pet_id: number;
  pet_name: string;
  pet_species: string;
  pet_age: string;
  pet_gender: string;
  pet_breed: string;
  pet_adoptionStatus: string;
  pet_photo: File | string | null;
  pet_description?: string;
  image_url?: string;  //This is what we want to load
  created_at?: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Available' | 'Adopted';
}

export enum PetGender {
  Male = "Male",
  Female = "Female"
}

export enum PetStatus {
  Available = "Available",
  Pending = "Pending",
  Adopted = "Adopted"
}

// For backwards compatibility
export interface UserDetails {
  user_id: number;
  user_name: string;
  email: string;
  phone?: string;
  address?: string;
  role: string;
  active: boolean;
  registered_date: string;
}

//types.ts
export interface Adoption {
  adoption_id: number;
  pet_id: number;
  user_id: number;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Available' | 'Adopted';
  applied_at: string;
  user_name: string;
  email: string;
  address: string;
  phone: string;
  pet_name: string;
}

// For backwards compatibility
export interface UserAdoption {
  adoption_id: number;
  pet_id: number;
  adoption_date: string;
  status: string;
  pet_name?: string;
}
