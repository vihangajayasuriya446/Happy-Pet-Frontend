import React, { useEffect, useState } from "react";
import {
  Button,
  FormLabel,
  Box,
  Input,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { User } from "./types"; // Import the shared User type

interface UserFormProps {
  addUser: (user: User) => void;
  updateUser: (user: User) => void;
  submitted: boolean;
  data?: User; // Optional data for editing
  isEdit: boolean;
  resetForm: () => void;
  users: User[]; // Add users as a prop
}

const UserForm: React.FC<UserFormProps> = ({
  addUser,
  updateUser,
  submitted,
  data,
  isEdit,
  resetForm,
  users, // Add users as a prop
}) => {
  const [id, setId] = useState<number>(1); // Initialize ID to 1
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [breed, setBreed] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [photo, setPhoto] = useState<string | File | null>(null);

  // Breed options for each pet type
  const dogBreeds = [
    "Labrador Retriever",
    "German Shepherd",
    "Golden Retriever",
    "Bulldog",
    "Beagle",
    "Poodle",
    "Boxer",
    "Rottweiler",
    "Dachshund",
    "Shih Tzu",
    "Chihuahua",
    "Siberian Husky",
    "Cocker Spaniel",
    "Pug",
    "Doberman Pinscher",
  ];

  const catBreeds = [
    "Persian",
    "Maine Coon",
    "Siamese",
    "Bengal",
    "Ragdoll",
    "Sphynx",
    "Abyssinian",
    "British Shorthair",
    "Scottish Fold",
    "Siberian",
    "Russian Blue",
    "Burmese",
    "Birman",
    "Devon Rex",
    "Oriental Shorthair",
  ];

  const birdBreeds = [
    "Budgerigar",
    "Cockatiel",
    "African Grey Parrot",
    "Macaw",
    "Lovebird",
    "Canary",
    "Finch",
    "Conure",
    "Amazon Parrot",
    "Eclectus Parrot",
    "Parakeet",
    "Quaker Parrot",
    "Pionus Parrot",
    "Kea",
    "Cockatoo",
  ];

  const [availableBreeds, setAvailableBreeds] = useState<string[]>([]);

  // Reset form when `submitted` or `isEdit` changes
  useEffect(() => {
    if (submitted || !isEdit) {
      setId(1); // Reset ID to 1
      setName("");
      setType("");
      setAge("");
      setGender("");
      setBreed("");
      setLocation("");
      setPhoto(null);
      resetForm();
    }
  }, [submitted, isEdit, resetForm]);

  // Populate form when editing
  useEffect(() => {
    if (isEdit && data) {
      setId(data.id);
      setName(data.name);
      setType(data.type);
      setAge(data.age);
      setGender(data.gender);
      setBreed(data.breed);
      setLocation(data.location);
      setPhoto(data.photo || null);
      updateBreedOptions(data.type); // Set breed options based on the type when editing
    }
  }, [data, isEdit]);

  // Update breed options based on the selected pet type
  const updateBreedOptions = (type: string) => {
    switch (type) {
      case "Dog":
        setAvailableBreeds(dogBreeds);
        break;
      case "Cat":
        setAvailableBreeds(catBreeds);
        break;
      case "Bird":
        setAvailableBreeds(birdBreeds);
        break;
      default:
        setAvailableBreeds([]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
    }
  };

  const handleSubmit = () => {
    // Check if all fields are filled
    if (
      !id ||
      !name ||
      !type ||
      !age ||
      !gender ||
      !breed ||
      !location ||
      !photo
    ) {
      alert("Please fill all fields before submitting.");
      return;
    }

    // Check if the ID already exists in the users array
    const isIdExists = users.some((user: User) => user.id === id);

    if (isIdExists && !isEdit) {
      // Show an alert if the ID already exists and it's not an edit operation
      alert("User with this ID already exists. Please use a different ID.");
      return; // Stop further execution
    }

    const userData: User = {
      id,
      name,
      type,
      age,
      gender,
      breed,
      location,
      photo,
    };

    if (isEdit) {
      updateUser(userData);
    } else {
      addUser(userData);
    }
  };

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isNaN(Number(value)) && Number(value) >= 1) {
      setId(parseInt(value, 10));
    } else if (value === "") {
      setId(1); // Reset ID to 1 if the field is empty
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5", // Light gray background
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow
        border: "1px solid #e0e0e0", // Light border
        maxWidth: "600px",
        margin: "auto",
      }}
    >
      <Box sx={{ marginBottom: "20px" }}>
        <Typography
          component="h1"
          sx={{
            color: "#002855",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          Yay! We Love to Hear About You Adding Pets to Our Platform!
        </Typography>
        <Typography variant="body1" sx={{ color: "rgba(0, 0, 0, 0.6)" }}>
          We’re excited to help you find a loving home for your pet. Please
          provide the details of your pet so we can showcase them to potential
          adopters looking for specific breeds. Let’s get started!
        </Typography>
      </Box>

      {/* ID Field */}
      <Box
        sx={{
          display: "block",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <Typography
          component={FormLabel}
          htmlFor="id"
          sx={{
            color: "#000000",
            marginRight: "20px",
            fontSize: "16px",
            width: "100px",
            display: "block",
          }}
        >
          ID
        </Typography>
        <Input
          type="number"
          id="id"
          name="id"
          sx={{
            width: "100%",
            "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
              WebkitAppearance: "none",
              margin: 0,
            },
            "&[type=number]": {
              MozAppearance: "textfield",
            },
          }}
          value={id}
          onChange={handleIdChange}
          disabled={isEdit} // Disable the ID field in edit mode
        />
      </Box>

      {/* Name Field */}
      <Box
        sx={{
          display: "block",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <Typography
          component={FormLabel}
          htmlFor="name"
          sx={{
            color: "#000000",
            marginRight: "20px",
            fontSize: "16px",
            width: "100px",
            display: "block",
          }}
        >
          Pet Name
        </Typography>
        <Input
          type="text"
          id="name"
          name="name"
          sx={{ width: "100%" }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Box>

      {/* Type Field */}
      <Box
        sx={{
          display: "block",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <Typography
          component={FormLabel}
          htmlFor="type"
          sx={{
            color: "#000000",
            marginRight: "20px",
            fontSize: "16px",
            width: "100px",
            display: "block",
          }}
        >
          Pet Type
        </Typography>
        <Select
          id="type"
          name="type"
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            updateBreedOptions(e.target.value); // Update breed options based on type
          }}
          sx={{ width: "100%" }}
        >
          <MenuItem value="Dog">Dog</MenuItem>
          <MenuItem value="Cat">Cat</MenuItem>
          <MenuItem value="Bird">Bird</MenuItem>
        </Select>
      </Box>

      {/* Age Field */}
      <Box
        sx={{
          display: "block",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <Typography
          component={FormLabel}
          htmlFor="age"
          sx={{
            color: "#000000",
            marginRight: "20px",
            fontSize: "16px",
            width: "100px",
            display: "block",
          }}
        >
          Age
        </Typography>
        <Select
          id="age"
          name="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          sx={{ width: "100%" }}
        >
          <MenuItem value="Baby">Baby</MenuItem>
          <MenuItem value="Young">Young</MenuItem>
          <MenuItem value="Adult">Adult</MenuItem>
          <MenuItem value="Senior">Senior</MenuItem>
        </Select>
      </Box>

      {/* Gender Field */}
      <Box
        sx={{
          display: "block",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <Typography
          component={FormLabel}
          htmlFor="gender"
          sx={{
            color: "#000000",
            marginRight: "20px",
            fontSize: "16px",
            width: "100px",
            display: "block",
          }}
        >
          Gender
        </Typography>
        <Select
          id="gender"
          name="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          sx={{ width: "100%" }}
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
        </Select>
      </Box>

      {/* Breed Field */}
      <Box
        sx={{
          display: "block",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <Typography
          component={FormLabel}
          htmlFor="breed"
          sx={{
            color: "#000000",
            marginRight: "20px",
            fontSize: "16px",
            width: "100px",
            display: "block",
          }}
        >
          Breed
        </Typography>
        <Select
          id="breed"
          name="breed"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          sx={{ width: "100%" }}
        >
          {availableBreeds.map((breedOption, index) => (
            <MenuItem key={index} value={breedOption}>
              {breedOption}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* Location Field */}
      <Box
        sx={{
          display: "block",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <Typography
          component={FormLabel}
          htmlFor="location"
          sx={{
            color: "#000000",
            marginRight: "20px",
            fontSize: "16px",
            width: "100px",
            display: "block",
          }}
        >
          Location
        </Typography>
        <Select
          id="location"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          sx={{ width: "100%" }}
        >
          <MenuItem value="Ampara">Ampara</MenuItem>
          <MenuItem value="Anuradhapura">Anuradhapura</MenuItem>
          <MenuItem value="Badulla">Badulla</MenuItem>
          <MenuItem value="Batticaloa">Batticaloa</MenuItem>
          <MenuItem value="Colombo">Colombo</MenuItem>
          <MenuItem value="Galle">Galle</MenuItem>
          <MenuItem value="Gampaha">Gampaha</MenuItem>
          <MenuItem value="Hambantota">Hambantota</MenuItem>
          <MenuItem value="Jaffna">Jaffna</MenuItem>
          <MenuItem value="Kalutara">Kalutara</MenuItem>
          <MenuItem value="Kandy">Kandy</MenuItem>
          <MenuItem value="Kegalle">Kegalle</MenuItem>
          <MenuItem value="Kilinochchi">Kilinochchi</MenuItem>
          <MenuItem value="Kurunegala">Kurunegala</MenuItem>
          <MenuItem value="Mannar">Mannar</MenuItem>
          <MenuItem value="Matale">Matale</MenuItem>
          <MenuItem value="Matara">Matara</MenuItem>
          <MenuItem value="Monaragala">Monaragala</MenuItem>
          <MenuItem value="Mullaitivu">Mullaitivu</MenuItem>
          <MenuItem value="Nuwara Eliya">Nuwara Eliya</MenuItem>
          <MenuItem value="Polonnaruwa">Polonnaruwa</MenuItem>
          <MenuItem value="Puttalam">Puttalam</MenuItem>
          <MenuItem value="Ratnapura">Ratnapura</MenuItem>
          <MenuItem value="Trincomalee">Trincomalee</MenuItem>
          <MenuItem value="Vavuniya">Vavuniya</MenuItem>
        </Select>
      </Box>

      {/* Photo Field */}
      <Box
        sx={{
          display: "block",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <Typography
          component={FormLabel}
          htmlFor="photo"
          sx={{
            color: "#000000",
            marginRight: "20px",
            fontSize: "16px",
            width: "100px",
            display: "block",
          }}
        >
          Pet Photo
        </Typography>
        <input
          type="file"
          id="photo"
          name="photo"
          accept="image/*"
          onChange={handleFileChange}
          style={{ width: "100%" }}
        />
        {photo && (
          <Box sx={{ marginTop: "10px" }}>
            <Typography variant="body2">
              Selected: {photo instanceof File ? photo.name : "Existing Photo"}
            </Typography>
            <img
              src={
                photo instanceof File
                  ? URL.createObjectURL(photo) // For new files
                  : `data:image/jpeg;base64,${photo}` // For existing Base64 strings
              }
              alt="Pet Preview"
              style={{
                width: "150px",
                height: "150px",
                marginTop: "10px",
                borderRadius: "8px",
              }}
            />
          </Box>
        )}
      </Box>

      {/* Submit Button */}
      <Button
        sx={{
          display: "inline-block",
          backgroundColor: "#4caf50", // Green button
          color: "white",
          padding: "10px 20px",
          fontSize: "16px",
          fontWeight: "bold",
          marginTop: "15px",
          width: "100%",
          borderRadius: "5px",
          "&:hover": {
            backgroundColor: "#45a049",
          },
        }}
        onClick={handleSubmit}
      >
        {isEdit ? "Update Pet" : "Add Pet"}
      </Button>
    </Box>
  );
};

export default UserForm;