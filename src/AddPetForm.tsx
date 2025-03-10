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
    Divider,
    CircularProgress,
    Chip,
    Tooltip
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import PetsIcon from '@mui/icons-material/Pets';
import { UserDetails } from './components/types';

// Extended interface to handle the registered_date property and pet inquiries
interface ExtendedUserDetails extends UserDetails {
    registered_date?: string;
    registeredDate?: string;
    inquiredPets?: {
        pet_id: string;
        pet_name: string;
        inquiry_date: string;
        message?: string;
    }[];
}

interface PetData {
    id: string;
    name: string;
    petType: string;
    price: string;
    breed: string;
    birthYear: string;
    gender: string;
    image: File | null;
    imageUrl?: string;
}

interface AddPetFormProps {
    onSnackbarMessage?: (message: string, severity: 'success' | 'error' | 'info' | 'warning') => void;
}

const API_BASE_URL = 'http://localhost:8080/api/v1/pets';
const USER_API_URL = 'http://localhost:8080/api/v1/users';

const AddPetForm: React.FC<AddPetFormProps> = ({ onSnackbarMessage }) => {
    const [formData, setFormData] = useState<PetData>({
        id: '',
        name: '',
        petType: '',
        price: '',
        breed: '',
        birthYear: '',
        gender: '',
        image: null
    });

    const [pets, setPets] = useState<PetData[]>([]);
    const [users, setUsers] = useState<ExtendedUserDetails[]>([]);
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const [editMode, setEditMode] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch pets and users on component mount
    useEffect(() => {
        fetchPets();
        fetchUsers();
    }, []);

    const fetchPets = async () => {
        try {
            const response = await axios.get(API_BASE_URL);
            setPets(response.data);
        } catch (err) {
            console.error('Error fetching pets:', err);
            showSnackbar('Error fetching pets', 'error');
        }
    };

    const fetchUsers = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get(USER_API_URL);
            setUsers(response.data);
        } catch (err) {
            console.error('Error fetching users:', err);
            setError('Failed to load users. Please try again.');
        } finally {
            setIsLoading(false);
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

    const showSnackbar = (message: string, severity: 'success' | 'error' | 'info' | 'warning') => {
        if (onSnackbarMessage) {
            onSnackbarMessage(message, severity);
        }
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
            formDataToSend.append('gender', formData.gender);
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
        } catch (err) {
            console.error('Error saving pet:', err);
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
        } catch (err) {
            console.error('Error deleting pet:', err);
            showSnackbar('Error deleting pet', 'error');
        }
    };

    const handleUserEdit = (user: ExtendedUserDetails) => {
        // This would typically open a modal or navigate to edit user page
        console.log('Edit user:', user);
        showSnackbar('User edit functionality not implemented in this view', 'info');
    };

    const handleUserDelete = async (user: ExtendedUserDetails) => {
        try {
            await axios.delete(`${USER_API_URL}/${user.user_id}`);
            showSnackbar('User deleted successfully', 'success');
            fetchUsers();
        } catch (err) {
            console.error('Error deleting user:', err);
            showSnackbar('Error deleting user', 'error');
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
            gender: '',
            image: null
        });
        setPreviewUrl('');
        setEditMode(false);
        setEditIndex(null);
    };

    const formatPrice = (price: string) => {
        if (!price) return 'LKR 0/=';
        return `LKR ${price}/=`;
    };

    // Helper function to safely format date
    const formatDate = (dateString?: string) => {
        if (!dateString) return 'N/A';
        try {
            return new Date(dateString).toLocaleDateString();
        } catch {
            return 'Invalid Date';
        }
    };

    const inputStyle = {
        '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
                borderColor: '#003366',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#003366',
                borderWidth: '2px',
            },
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: '#003366',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#003366',
        },
        '& .MuiFilledInput-underline:after': {
            borderBottomColor: '#003366',
        }
    };

    // Theme color for user table
    const themeColor = '#002855';

    // Get pet name by ID (for displaying in inquiry details)
    const getPetNameById = (petId: string): string => {
        const pet = pets.find(p => p.id === petId);
        return pet ? pet.name : 'Unknown Pet';
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
            {/* Enhanced Card with better styling */}
            <Card
                sx={{
                    width: '100%',
                    maxWidth: 500,
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }}
            >
                <CardContent sx={{ p: 3 }}>
                    {/* Form Heading */}
                    <Typography
                        variant="h5"
                        component="h2"
                        gutterBottom
                        align="center"
                        sx={{
                            fontWeight: 'bold',
                            color: '#003366',
                            mb: 3
                        }}
                    >
                        {editMode ? 'Update Pet' : 'Add A New Pet'}
                    </Typography>

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
                                    startIcon={<ImageIcon />}
                                    sx={{
                                        borderColor: '#003366',
                                        color: '#003366',
                                        padding: '10px 0',
                                        '&:hover': {
                                            borderColor: '#002244',
                                            backgroundColor: 'rgba(0, 51, 102, 0.04)'
                                        },
                                        '&:focus': {
                                            borderColor: '#003366',
                                            boxShadow: '0 0 0 3px rgba(0, 51, 102, 0.2)'
                                        }
                                    }}
                                >
                                    {previewUrl ? 'Change Pet Image' : 'Upload Pet Image'}
                                </Button>
                            </label>
                            {previewUrl && (
                                <Box sx={{
                                    mt: 2,
                                    textAlign: 'center',
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '8px',
                                    padding: '10px',
                                    backgroundColor: '#f9f9f9'
                                }}>
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        style={{
                                            maxWidth: '100%',
                                            maxHeight: '200px',
                                            objectFit: 'contain',
                                            borderRadius: '4px'
                                        }}
                                    />
                                </Box>
                            )}
                        </Box>

                        <Divider sx={{ my: 3 }} />

                        {/* Form Buttons */}
                        <Box sx={{
                            mt: 2,
                            display: 'flex',
                            justifyContent: 'center',
                            gap: 2
                        }}>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    backgroundColor: '#003366',
                                    '&:hover': {
                                        backgroundColor: '#002244'
                                    },
                                    '&:focus': {
                                        boxShadow: '0 0 0 3px rgba(0, 51, 102, 0.3)'
                                    },
                                    minWidth: '120px',
                                    padding: '10px 20px',
                                    fontWeight: 'bold',
                                    borderRadius: '8px'
                                }}
                            >
                                {editMode ? 'Update Pet' : 'Add Pet'}
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
                                        },
                                        '&:focus': {
                                            borderColor: '#003366',
                                            boxShadow: '0 0 0 3px rgba(0, 51, 102, 0.2)'
                                        },
                                        minWidth: '120px',
                                        padding: '10px 20px',
                                        borderRadius: '8px'
                                    }}
                                >
                                    Cancel
                                </Button>
                            )}
                        </Box>
                    </Box>
                </CardContent>
            </Card>

            {/* Section Title for Pets Table */}
            <Typography
                variant="h6"
                component="h3"
                sx={{
                    width: '100%',
                    mt: 4,
                    mb: 2,
                    color: '#003366',
                    fontWeight: 'bold',
                    textAlign: 'left'
                }}
            >
                Pets Inventory
            </Typography>

            {/* Enhanced Pets Table */}
            <TableContainer
                component={Paper}
                sx={{
                    width: '100%',
                    maxWidth: '1200px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
            >
                <Table size="medium">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#003366' }}>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Pet Name</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Pet Type</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Price</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Breed</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Birth Year</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Gender</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Image</TableCell>
                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pets.length > 0 ? (
                            pets.map((pet, index) => (
                                <TableRow
                                    key={pet.id}
                                    sx={{
                                        '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' },
                                        '&:hover': { backgroundColor: '#f0f7ff' }
                                    }}
                                >
                                    <TableCell>{pet.id}</TableCell>
                                    <TableCell>{pet.name}</TableCell>
                                    <TableCell>{pet.petType}</TableCell>
                                    <TableCell sx={{ fontWeight: 'medium' }}>{formatPrice(pet.price)}</TableCell>
                                    <TableCell>{pet.breed}</TableCell>
                                    <TableCell>{pet.birthYear}</TableCell>
                                    <TableCell>{pet.gender}</TableCell>
                                    <TableCell>
                                        {pet.imageUrl && (
                                            <img
                                                src={pet.imageUrl}
                                                alt={pet.name}
                                                style={{
                                                    width: '60px',
                                                    height: '60px',
                                                    objectFit: 'cover',
                                                    borderRadius: '8px',
                                                    border: '1px solid #e0e0e0'
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
                                                    },
                                                    '&:focus': {
                                                        boxShadow: '0 0 0 3px rgba(0, 51, 102, 0.3)'
                                                    },
                                                    borderRadius: '6px'
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
                                                    },
                                                    '&:focus': {
                                                        boxShadow: '0 0 0 3px rgba(220, 53, 69, 0.3)'
                                                    },
                                                    borderRadius: '6px'
                                                }}
                                                onClick={() => handleDelete(pet.id)}
                                            >
                                                Delete
                                            </Button>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={9} align="center" sx={{ py: 4 }}>
                                    <Typography variant="body1" color="textSecondary">
                                        No pets found.
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Section Title for Users Table */}
            <Typography
                variant="h6"
                component="h3"
                sx={{
                    width: '100%',
                    mt: 4,
                    mb: 2,
                    color: themeColor,
                    fontWeight: 'bold',
                    textAlign: 'left'
                }}
            >
                Registered Users & Pet Inquiries
            </Typography>

            {/* Users Table with Pet Inquiry Information */}
            <TableContainer component={Paper} sx={{ borderRadius: '8px', boxShadow: 3, width: '100%' }}>
                {isLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Box sx={{ padding: '2rem', textAlign: 'center' }}>
                        <Typography color="error">{error}</Typography>
                        <Button
                            variant="contained"
                            sx={{
                                mt: 2,
                                bgcolor: themeColor,
                                '&:hover': {
                                    bgcolor: '#001c3d',
                                }
                            }}
                            onClick={() => fetchUsers()}
                        >
                            Try Again
                        </Button>
                    </Box>
                ) : (
                    <Table>
                        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', color: themeColor }}>ID</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: themeColor }}>Name</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: themeColor }}>Email</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: themeColor }}>Phone</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: themeColor }}>Address</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: themeColor }}>Registered Date</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: themeColor }}>Inquired Pets</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: themeColor }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.length > 0 ? (
                                users.map((user) => (
                                    <TableRow key={user.user_id} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}>
                                        <TableCell>{user.user_id}</TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.phone}</TableCell>
                                        <TableCell>{user.address}</TableCell>
                                        <TableCell>{formatDate(user.registered_date || user.registeredDate)}</TableCell>
                                        <TableCell>
                                            {user.inquiredPets && user.inquiredPets.length > 0 ? (
                                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                                    {user.inquiredPets.map((inquiry, idx) => (
                                                        <Tooltip
                                                            key={idx}
                                                            title={`Inquiry Date: ${formatDate(inquiry.inquiry_date)}${inquiry.message ? `\nMessage: ${inquiry.message}` : ''}`}
                                                            arrow
                                                        >
                                                            <Chip
                                                                icon={<PetsIcon fontSize="small" />}
                                                                label={`${inquiry.pet_name || getPetNameById(inquiry.pet_id)} (ID: ${inquiry.pet_id})`}
                                                                size="small"
                                                                sx={{
                                                                    bgcolor: '#e3f2fd',
                                                                    border: '1px solid #90caf9',
                                                                    '& .MuiChip-label': {
                                                                        px: 1,
                                                                        fontSize: '0.75rem'
                                                                    }
                                                                }}
                                                            />
                                                        </Tooltip>
                                                    ))}
                                                </Box>
                                            ) : (
                                                <Typography variant="body2" color="text.secondary">
                                                    No inquiries
                                                </Typography>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    marginRight: 1,
                                                    textTransform: 'none',
                                                    borderRadius: '4px',
                                                    bgcolor: themeColor,
                                                    '&:hover': {
                                                        bgcolor: '#001c3d',
                                                    },
                                                }}
                                                onClick={() => handleUserEdit(user)}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                sx={{ textTransform: 'none', borderRadius: '4px' }}
                                                onClick={() => handleUserDelete(user)}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                                        <Typography variant="body1" color="textSecondary">
                                            No users found.
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                )}
            </TableContainer>
        </Box>
    );
};

export default AddPetForm;
