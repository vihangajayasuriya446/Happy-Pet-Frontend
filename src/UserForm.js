import React, { useEffect, useState } from "react";
import { Button, FormLabel, Box, Input, Typography, Select, MenuItem } from "@mui/material";

const UserForm = ({ addUser, submitted, data, isEdit, updateUser }) => {
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [breed, setBreed] = useState('');
  const [location, setLocation] = useState('');
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    if (!submitted) {
      setId(0);
      setName('');
      setType('');
      setAge('');
      setGender('');
      setBreed('');
      setLocation('');
      setPhoto(null);
    }
  }, [submitted]);

  useEffect(() => {
    if (data?.id && data.id !== 0) {
      setId(data.id);
      setName(data.name);
      setType(data.type);
      setAge(data.age);
      setGender(data.gender);
      setBreed(data.breed);
      setLocation(data.location);
      setPhoto(data.photo || null);
    }
  }, [data]);

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
        backgroundColor: "#ffffff",
        marginBottom: "30px",
        display: "block",
        padding: "20px",
        borderRadius: "8px",
      }}
    >
      <Box sx={{ marginBottom: "20px" }}>
        <Typography component="h1" sx={{ color: "#000000" }}>
          User Form
        </Typography>
      </Box>

      <Box sx={{ display: "block", alignItems: "center", marginBottom: "15px" }}>
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
          sx={{ width: "400px" }}
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      </Box>

      <Box sx={{ display: "block", alignItems: "center", marginBottom: "15px" }}>
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
          sx={{ width: "400px" }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Box>

      <Box sx={{ display: "block", alignItems: "center", marginBottom: "15px" }}>
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
          sx={{ width: "400px" }}
        >
          <MenuItem value="Dog">Dog</MenuItem>
          <MenuItem value="Cat">Cat</MenuItem>
          <MenuItem value="Bird">Bird</MenuItem>
        </Select>
      </Box>

      <Box sx={{ display: "block", alignItems: "center", marginBottom: "15px" }}>
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
        <Input
          type="number"
          id="age"
          name="age"
          sx={{ width: "400px" }}
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </Box>

      <Box sx={{ display: "block", alignItems: "center", marginBottom: "15px" }}>
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
          sx={{ width: "400px" }}
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
        </Select>
      </Box>

      <Box sx={{ display: "block", alignItems: "center", marginBottom: "15px" }}>
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
          sx={{ width: "400px" }}
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
        />
      </Box>

      <Box sx={{ display: "block", alignItems: "center", marginBottom: "15px" }}>
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
        <Input
          type="text"
          id="location"
          name="location"
          sx={{ width: "400px" }}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </Box>

      <Box sx={{ display: "block", alignItems: "center", marginBottom: "15px" }}>
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
          sx={{ width: "400px" }}
          onChange={handleFileChange}
        />
        {photo && (
          <Box sx={{ marginTop: "10px" }}>
            <Typography variant="body2">Selected: {photo.name}</Typography>
            <img
              src={URL.createObjectURL(photo)}
              alt="Pet Preview"
              style={{ width: "150px", height: "150px", marginTop: "10px", borderRadius: "8px" }}
            />
          </Box>
        )}
      </Box>

      <Button
        sx={{
          margin: "auto",
          marginBottom: "20px",
          backgroundColor: "#00c6e6",
          marginLeft: "15px",
          marginTop: "20px",
          "&:hover": {
            opacity: "0.7",
            backgroundColor: "#00c6e6",
          },
        }}
        onClick={handleSubmit}
      >
        {isEdit ? 'Update' : 'Add'}
      </Button>
    </Box>
  );
};

export default UserForm;
