import { useState, useEffect } from "react";
import axios from "axios";
import {
    TextField,
    Button,
    Typography,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
    Divider,
    IconButton,
    Drawer,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

// API endpoints
const API_BASE_URL = "/api/v1/pets";

interface PetData {
    id: string | number;
    name: string;
    petType: string;
    price: string | number;
    breed: string;
    birthYear: string;
    gender: string;
    image: File | null;
    imageUrl?: string;
}

interface AddPetFormProps {
    onSnackbarMessage?: (
        message: string,
        severity: "success" | "error" | "info" | "warning"
    ) => void;
    onPetAdded?: () => void;
    onPetUpdated?: () => void;
    editPet?: PetData | null;
    petToEdit?: PetData | null; // Added this line to support the prop name used in PetManagementDashboard
    isOpen: boolean;
    onClose: () => void;
}

const AddPetForm: React.FC<AddPetFormProps> = ({
                                                   onSnackbarMessage,
                                                   onPetAdded,
                                                   onPetUpdated,
                                                   editPet,
                                                   petToEdit,
                                                   isOpen,
                                                   onClose
                                               }) => {
    const [formData, setFormData] = useState<PetData>({
        id: "",
        name: "",
        petType: "",
        price: "",
        breed: "",
        birthYear: "",
        gender: "",
        image: null,
    });

    const [previewUrl, setPreviewUrl] = useState<string>("");
    const [editMode, setEditMode] = useState(false);

    // Use either editPet or petToEdit, whichever is provided
    const petData = editPet || petToEdit;

    // Set form data when petData changes
    useEffect(() => {
        if (petData) {
            setFormData({
                ...petData,
                image: null,
            });
            setPreviewUrl(petData.imageUrl || "");
            setEditMode(true);
        } else {
            resetForm();
        }
    }, [petData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSelectChange = (e: SelectChangeEvent) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFormData({
                ...formData,
                image: file,
            });
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const removeImage = () => {
        setFormData({
            ...formData,
            image: null,
        });
        setPreviewUrl("");
    };

    const showSnackbar = (
        message: string,
        severity: "success" | "error" | "info" | "warning"
    ) => {
        if (onSnackbarMessage) {
            onSnackbarMessage(message, severity);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const formDataToSend = new FormData();
            formDataToSend.append("name", formData.name);
            formDataToSend.append("petType", formData.petType);
            formDataToSend.append("price", formData.price.toString());
            formDataToSend.append("breed", formData.breed);
            formDataToSend.append("birthYear", formData.birthYear);
            formDataToSend.append("gender", formData.gender);
            if (formData.image) {
                formDataToSend.append("image", formData.image);
            }

            if (editMode) {
                // Update existing pet
                await axios.put(`${API_BASE_URL}/${formData.id}`, formDataToSend, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                showSnackbar("Pet updated successfully", "success");
                if (onPetUpdated) onPetUpdated();
            } else {
                // Add new pet
                await axios.post(API_BASE_URL, formDataToSend, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                showSnackbar("Pet added successfully", "success");
                if (onPetAdded) onPetAdded();
            }

            // Reset form and close drawer
            resetForm();
            onClose();
        } catch (err) {
            console.error("Error saving pet:", err);
            showSnackbar("Error saving pet", "error");
        }
    };

    const resetForm = () => {
        setFormData({
            id: "",
            name: "",
            petType: "",
            price: "",
            breed: "",
            birthYear: "",
            gender: "",
            image: null,
        });
        setPreviewUrl("");
        setEditMode(false);
    };

    const inputStyle = {
        "& .MuiOutlinedInput-root": {
            "&:hover fieldset": {
                borderColor: "#003366",
            },
            "&.Mui-focused fieldset": {
                borderColor: "#003366",
                borderWidth: "2px",
            },
        },
        "& .MuiInputLabel-root.Mui-focused": {
            color: "#003366",
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "#003366",
        },
        "& .MuiFilledInput-underline:after": {
            borderBottomColor: "#003366",
        },
    };

    return (
        <Drawer
            anchor="right"
            open={isOpen}
            onClose={onClose}
            sx={{
                '& .MuiDrawer-paper': {
                    width: { xs: '100%', sm: 450 },
                    boxSizing: 'border-box',
                    padding: 3,
                    boxShadow: '-4px 0 10px rgba(0,0,0,0.1)'
                },
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography
                    variant="h5"
                    component="h2"
                    sx={{
                        fontWeight: "bold",
                        color: "#003366",
                    }}
                >
                    {editMode ? "Update Pet" : "Add A New Pet"}
                </Typography>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                {/* Pet Name Field */}
                <TextField
                    fullWidth
                    margin="normal"
                    label="Pet Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    sx={inputStyle}
                />

                {/* Pet Type Select */}
                <FormControl fullWidth margin="normal" required sx={inputStyle}>
                    <InputLabel>Pet Type</InputLabel>
                    <Select
                        value={formData.petType}
                        label="Pet Type"
                        name="petType"
                        onChange={handleSelectChange}
                    >
                        <MenuItem value="Dog">Dog</MenuItem>
                        <MenuItem value="Cat">Cat</MenuItem>
                        <MenuItem value="Bird">Bird</MenuItem>
                    </Select>
                </FormControl>

                {/* Price Field*/}
                <TextField
                    fullWidth
                    margin="normal"
                    label="Price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    helperText="Will be displayed as LKR [amount]/="
                    sx={inputStyle}
                />

                {/* Breed Field */}
                <TextField
                    fullWidth
                    margin="normal"
                    label="Breed"
                    name="breed"
                    value={formData.breed}
                    onChange={handleChange}
                    required
                    sx={inputStyle}
                />

                {/* Birth Year Field */}
                <TextField
                    fullWidth
                    margin="normal"
                    label="Birth Year"
                    name="birthYear"
                    type="number"
                    value={formData.birthYear}
                    onChange={handleChange}
                    required
                    sx={inputStyle}
                />

                {/* Gender Select */}
                <FormControl fullWidth margin="normal" required sx={inputStyle}>
                    <InputLabel>Gender</InputLabel>
                    <Select
                        value={formData.gender}
                        label="Gender"
                        name="gender"
                        onChange={handleSelectChange}
                    >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                    </Select>
                </FormControl>

                {/* Image Upload with Preview */}
                <Box sx={{ mt: 3, mb: 2 }}>
                    <input
                        accept="image/*"
                        style={{ display: "none" }}
                        id="image-upload"
                        type="file"
                        onChange={handleImageChange}
                    />
                    <label htmlFor="image-upload">
                        <Button
                            variant="outlined"
                            component="span"
                            fullWidth
                            startIcon={<ImageIcon />}
                            sx={{
                                borderColor: "#003366",
                                color: "#003366",
                                padding: "10px 0",
                                "&:hover": {
                                    borderColor: "#002244",
                                    backgroundColor: "rgba(0, 51, 102, 0.04)",
                                },
                                "&:focus": {
                                    borderColor: "#003366",
                                    boxShadow: "0 0 0 3px rgba(0, 51, 102, 0.2)",
                                },
                            }}
                        >
                            {previewUrl ? "Change Pet Image" : "Upload Pet Image"}
                        </Button>
                    </label>
                    {previewUrl && (
                        <Box
                            sx={{
                                mt: 2,
                                textAlign: "center",
                                border: "1px solid #e0e0e0",
                                borderRadius: "8px",
                                padding: "10px",
                                backgroundColor: "#f9f9f9",
                                position: "relative",
                            }}
                        >
                            <img
                                src={previewUrl}
                                alt="Preview"
                                style={{
                                    maxWidth: "100%",
                                    maxHeight: "200px",
                                    objectFit: "contain",
                                    borderRadius: "4px",
                                }}
                            />
                            <IconButton
                                size="small"
                                sx={{
                                    position: "absolute",
                                    top: 8,
                                    right: 8,
                                    bgcolor: "rgba(255,255,255,0.8)",
                                    "&:hover": {
                                        bgcolor: "rgba(255,255,255,0.95)",
                                    },
                                }}
                                onClick={removeImage}
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    )}
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* Form Buttons */}
                <Box
                    sx={{
                        mt: 2,
                        display: "flex",
                        justifyContent: "center",
                        gap: 2,
                    }}
                >
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            backgroundColor: "#003366",
                            "&:hover": {
                                backgroundColor: "#002244",
                            },
                            "&:focus": {
                                boxShadow: "0 0 0 3px rgba(0, 51, 102, 0.3)",
                            },
                            minWidth: "120px",
                            padding: "10px 20px",
                            fontWeight: "bold",
                            borderRadius: "8px",
                        }}
                    >
                        {editMode ? "Update Pet" : "Add Pet"}
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={onClose}
                        sx={{
                            borderColor: "#003366",
                            color: "#003366",
                            "&:hover": {
                                borderColor: "#002244",
                                backgroundColor: "rgba(0, 51, 102, 0.04)",
                            },
                            "&:focus": {
                                borderColor: "#003366",
                                boxShadow: "0 0 0 3px rgba(0, 51, 102, 0.2)",
                            },
                            minWidth: "120px",
                            padding: "10px 20px",
                            borderRadius: "8px",
                        }}
                    >
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Drawer>
    );
};

export default AddPetForm;
export type { PetData };
