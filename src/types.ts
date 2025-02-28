// types.ts
export interface Pet {
  id: number;
  name: string;
  type: string;
  age: string;
  gender: string;
  breed: string;
  location: string;
  adoptionStatus: string; // New field
  adoptionFee?: number; // Optional field
  photo?: string | File | null;
}