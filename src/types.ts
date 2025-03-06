export interface Pet {
  pet_id: number;              // Maps to pet_id in backend
  pet_name: string;            // Maps to pet_name in backend
  pet_species: string;            // Maps to pet_species in backend
  pet_age: string;             // Maps to pet_age in backend (needs conversion)
  pet_gender: string;          // Maps to pet_gender in backend
  pet_breed: string;           // Maps to pet_breed in backend
  pet_adoptionStatus: string;  // Maps to status in backend
  pet_photo: File | string | null;  // For file uploads
  pet_description?: string;    // Maps to pet_description in backend
  image_url?: string;      // Image URL from backend
  created_at?: string;     // Creation timestamp
}

// Enum mappings to match backend
export enum PetGender {
  Male = "Male",
  Female = "Female"
}

export enum PetStatus {
  Available = "Available",
  Pending = "Pending",
  Adopted = "Adopted"
}

// Age mapping helpers
export const ageStringToNumber = (ageString: string): number => {
  switch (ageString) {
    case "Baby": return 0;
    case "Young": return 1;
    case "Adult": return 5;
    case "Senior": return 10;
    default: return parseInt(ageString) || 0;
  }
};

export const ageNumberToString = (ageNumber: number): string => {
  if (ageNumber < 1) return "Baby";
  if (ageNumber < 5) return "Young";
  if (ageNumber < 10) return "Adult";
  return "Senior";
};