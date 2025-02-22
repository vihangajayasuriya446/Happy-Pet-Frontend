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

const UserForm = ({ addUser, submitted, data, isEdit, updateUser }) => {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [breed, setBreed] = useState("");
  const [location, setLocation] = useState("");
  const [photo, setPhoto] = useState(null);

  // Reset form when `submitted` or `isEdit` changes
  useEffect(() => {
    if (submitted || !isEdit) {
      setId(0);
      setName("");
      setType("");
      setAge("");
      setGender("");
      setBreed("");
      setLocation("");
      setPhoto(null);
    }
  }, [submitted, isEdit]);

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
    }
  }, [data, isEdit]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
    }
  };

  const handleSubmit = () => {
    const userData = {
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
          sx={{ width: "100%" }}
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      </Box>

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
          onChange={(e) => setType(e.target.value)}
          sx={{ width: "100%" }}
        >
          <MenuItem value="Dog">Dog</MenuItem>
          <MenuItem value="Cat">Cat</MenuItem>
          <MenuItem value="Bird">Bird</MenuItem>
        </Select>
      </Box>

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
        <Input
          type="text"
          id="breed"
          name="breed"
          sx={{ width: "100%" }}
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
        />
      </Box>

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
        <Input
          type="file"
          id="photo"
          name="photo"
          accept="image/*"
          sx={{ width: "100%" }}
          onChange={handleFileChange}
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

      <Button
      sx={{
        display: 'block',
        margin: "20px auto",
        padding: "12px 24px",
        backgroundColor: "#1976d2",
        color: "white",
        borderRadius: "8px",
        border: "none",
        fontSize: "16px",
        fontWeight: "600",
        cursor: "pointer",
        transition: "opacity 0.3s ease",
        "&:hover": {
          opacity: "0.8",
          backgroundColor: "#1565c0",
        },
        "&:focus": {
          outline: "2px solid #0099b5",
          outlineOffset: "2px",
        },
        "&:active": {
          opacity: "0.9",
        },
      }}
      onClick={handleSubmit}
    >
      {isEdit ? "Update" : "Add"}
    </Button>
    </Box>
  );
};

export default UserForm;