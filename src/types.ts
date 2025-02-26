// types.ts
export interface User {
    id: number;
    name: string;
    type: string;
    age: string; // Age is a string
    gender: string;
    breed: string;
    location: string;
    photo?: string | File | null; // Allow string, File, or null
  }