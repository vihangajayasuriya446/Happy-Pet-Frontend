import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    SelectChangeEvent,
    Alert,
    Snackbar
} from '@mui/material';

interface PetData {
    id: string;
    name: string;
    petType: string;
    price: string;
    breed: string;
    birthYear: string;
    gender: string; // Added gender field
    image: File | null;
    imageUrl?: string;
}

const API_BASE_URL = 'http://localhost:8080/api/v1/pets';

const AddPetForm = () => {
    const [formData, setFormData] = useState<PetData>({
        id: '',  // Keep this in the state but don't show it in the form
        name: '',
        petType: '',
        price: '',
        breed: '',
        birthYear: '',
        gender: '', // Initialize gender field
        image: null
    });

    const [pets, setPets] = useState<PetData[]>([]);
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const [editMode, setEditMode] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error'
    });

    // Fetch pets on component mount
    useEffect(() => {
        fetchPets();
    }, []);

    const fetchPets = async () => {
        try {
            const response = await axios.get(API_BASE_URL);
            setPets(response.data);
        } catch (error) {
            console.error('Error fetching pets:', error);
            showSnackbar('Error fetching pets', 'error');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSelectChange = (e: SelectChangeEvent) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFormData({
                ...formData,
                image: file
            });
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const showSnackbar = (message: string, severity: 'success' | 'error') => {
        setSnackbar({
            open: true,
            message,
            severity
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('petType', formData.petType);
            formDataToSend.append('price', formData.price);
            formDataToSend.append('breed', formData.breed);
            formDataToSend.append('birthYear', formData.birthYear);
            formDataToSend.append('gender', formData.gender); // Added gender to form data
            if (formData.image) {
                formDataToSend.append('image', formData.image);
            }

            if (editMode && editIndex !== null) {
                // Update existing pet
                await axios.put(`${API_BASE_URL}/${formData.id}`, formDataToSend, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                showSnackbar('Pet updated successfully', 'success');
            } else {
                // Add new pet
                await axios.post(API_BASE_URL, formDataToSend, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                showSnackbar('Pet added successfully', 'success');
            }

            // Refresh pets list
            fetchPets();

            // Reset form
            resetForm();
        } catch (error) {
            console.error('Error saving pet:', error);
            showSnackbar('Error saving pet', 'error');
        }
    };

    const handleUpdate = async (index: number) => {
        const petToEdit = pets[index];
        setFormData({
            ...petToEdit,
            image: null
        });
        setPreviewUrl(petToEdit.imageUrl || '');
        setEditMode(true);
        setEditIndex(index);
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`${API_BASE_URL}/${id}`);
            showSnackbar('Pet deleted successfully', 'success');
            fetchPets();
        } catch (error) {
            console.error('Error deleting pet:', error);
            showSnackbar('Error deleting pet', 'error');
        }
    };

    const resetForm = () => {
        setFormData({
            id: '',
            name: '',
            petType: '',
            price: '',
            breed: '',
            birthYear: '',
            gender: '', // Reset gender field
            image: null
        });
        setPreviewUrl('');
        setEditMode(false);
        setEditIndex(null);
    };

    return (
        <Box
            sx={{
                width: '100%',
                maxWidth: '1200px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px',
                padding: '30px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                margin: '-30px auto 20px'
            }}
        >
            <Card sx={{ width: '100%', maxWidth: 450 }}>
                <CardContent>
                    <Typography variant="h5" component="h2" gutterBottom align="center">
                        {editMode ? 'Update Pet' : 'Add A New Pet'}
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit}>
                        {/* ID field removed - no longer shown in the form */}

                        <TextField
                            fullWidth
                            margin="normal"
                            label="Pet Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                        <FormControl fullWidth margin="normal" required>
                            <InputLabel>Pet Type</InputLabel>
                            <Select
                                value={formData.petType}
                                label="Pet Type"
                                name="petType"
                                onChange={handleSelectChange}
                            >
                                <MenuItem value="Dog">Dog</MenuItem>
                                <MenuItem value="Cat">Cat</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            fullWidth
                            margin="normal"
                            label="Price"
                            name="price"
                            type="number"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />

                        <TextField
                            fullWidth
                            margin="normal"
                            label="Breed"
                            name="breed"
                            value={formData.breed}
                            onChange={handleChange}
                            required
                        />

                        <TextField
                            fullWidth
                            margin="normal"
                            label="Birth Year"
                            name="birthYear"
                            type="number"
                            value={formData.birthYear}
                            onChange={handleChange}
                            required
                        />

                        {/* Added Gender field */}
                        <FormControl fullWidth margin="normal" required>
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

                        <Box sx={{ mt: 2, mb: 2 }}>
                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="image-upload"
                                type="file"
                                onChange={handleImageChange}
                            />
                            <label htmlFor="image-upload">
                                <Button
                                    variant="outlined"
                                    component="span"
                                    fullWidth
                                    sx={{
                                        borderColor: '#003366',
                                        color: '#003366',
                                        '&:hover': {
                                            borderColor: '#002244',
                                            backgroundColor: 'rgba(0, 51, 102, 0.04)'
                                        }
                                    }}
                                >
                                    Upload Pet Image
                                </Button>
                            </label>
                            {previewUrl && (
                                <Box sx={{ mt: 2, textAlign: 'center' }}>
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        style={{
                                            maxWidth: '100%',
                                            maxHeight: '200px',
                                            objectFit: 'contain'
                                        }}
                                    />
                                </Box>
                            )}
                        </Box>

                        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    backgroundColor: '#003366',
                                    '&:hover': {
                                        backgroundColor: '#002244'
                                    },
                                    minWidth: '100px'
                                }}
                            >
                                {editMode ? 'Update' : 'Add'}
                            </Button>
                            {editMode && (
                                <Button
                                    variant="outlined"
                                    onClick={resetForm}
                                    sx={{
                                        borderColor: '#003366',
                                        color: '#003366',
                                        '&:hover': {
                                            borderColor: '#002244',
                                            backgroundColor: 'rgba(0, 51, 102, 0.04)'
                                        }
                                    }}
                                >
                                    Cancel
                                </Button>
                            )}
                        </Box>
                    </Box>
                </CardContent>
            </Card>

            <TableContainer component={Paper} sx={{ width: '100%', maxWidth: '1200px' }}>
                <Table size="small">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#003366' }}>
                            <TableCell sx={{ color: 'white' }}>ID</TableCell>
                            <TableCell sx={{ color: 'white' }}>Pet Name</TableCell>
                            <TableCell sx={{ color: 'white' }}>Pet Type</TableCell>
                            <TableCell sx={{ color: 'white' }}>Price</TableCell>
                            <TableCell sx={{ color: 'white' }}>Breed</TableCell>
                            <TableCell sx={{ color: 'white' }}>Birth Year</TableCell>
                            <TableCell sx={{ color: 'white' }}>Gender</TableCell> {/* Added Gender column */}
                            <TableCell sx={{ color: 'white' }}>Image</TableCell>
                            <TableCell sx={{ color: 'white' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pets.map((pet, index) => (
                            <TableRow key={pet.id}>
                                <TableCell>{pet.id}</TableCell>
                                <TableCell>{pet.name}</TableCell>
                                <TableCell>{pet.petType}</TableCell>
                                <TableCell>{pet.price}</TableCell>
                                <TableCell>{pet.breed}</TableCell>
                                <TableCell>{pet.birthYear}</TableCell>
                                <TableCell>{pet.gender}</TableCell> {/* Added Gender cell */}
                                <TableCell>
                                    {pet.imageUrl && (
                                        <img
                                            src={pet.imageUrl}
                                            alt={pet.name}
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                                objectFit: 'cover'
                                            }}
                                        />
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            sx={{
                                                backgroundColor: '#003366',
                                                '&:hover': {
                                                    backgroundColor: '#002244'
                                                }
                                            }}
                                            onClick={() => handleUpdate(index)}
                                        >
                                            Update
                                        </Button>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            sx={{
                                                backgroundColor: '#DC3545',
                                                '&:hover': {
                                                    backgroundColor: '#BB2D3B'
                                                }
                                            }}
                                            onClick={() => handleDelete(pet.id)}
                                        >
                                            Delete
                                        </Button>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default AddPetForm;
